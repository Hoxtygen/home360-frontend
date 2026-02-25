import {
  EnquiryMessageReplyFormData,
  EnquiryMessageReplyItemProps,
  RealTimeMessage,
} from "features/messages/types";
import { webSocketService } from "lib/services/websocket.service";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseEnquiryWebSocketProps {
  enquiryId: string;
  externalMessages: EnquiryMessageReplyItemProps[];
  agentId?: number;
  enquirerId?: number;
}

type MessageStatus = {
  success?: boolean;
  error?: any;
};

export function useEnquiryWebSocket({
  enquiryId,
  externalMessages,
  agentId = 0,
  enquirerId = 0,
}: UseEnquiryWebSocketProps) {
  const [messages, setMessages] = useState<EnquiryMessageReplyItemProps[]>(
    externalMessages || []
  );
  const [messageStatuses, setMessageStatuses] = useState<
    Record<string, MessageStatus>
  >({});

  const pendingRequests = useRef(new Map<string, (res: any) => void>());

  useEffect(() => {
    if (!externalMessages) return;
    setMessages((current) => syncWithExternal(current, externalMessages));
  }, [externalMessages]);

  const onMessageReceived = useCallback(
    (message: RealTimeMessage & { localMessageId?: string }) => {
      const { localMessageId } = message;

      if (localMessageId && pendingRequests.current.has(localMessageId)) {
        pendingRequests.current.get(localMessageId)!(message);
        pendingRequests.current.delete(localMessageId);
      }

      setMessages((current) =>
        mergeIncomingMessage(
          current,
          message,
          agentId,
          enquirerId,
          (tempId) => {
            setMessageStatuses((prev) => ({
              ...prev,
              [tempId]: { success: true },
            }));
          }
        )
      );
    },
    [agentId, enquirerId]
  );

  useEffect(() => {
    const unsubscribe = webSocketService.subscribe(
      `/topic/public.${enquiryId}`,
      onMessageReceived
    );
    return unsubscribe;
  }, [enquiryId, onMessageReceived]);

  const handleSubmitReply = useCallback(
    (formData: EnquiryMessageReplyFormData) => {
      const optimisticMsg = createOptimisticMessage(formData);
      const tempId = optimisticMsg.id;

      // Optimistic UI Update
      setMessages((prev) => [...prev, optimisticMsg]);
      setMessageStatuses((prev) => ({ ...prev, [tempId]: { success: false } }));

      pendingRequests.current.set(tempId, (result: any) => {
        if (result.status === "ERROR") {
          setMessageStatuses((prev) => ({
            ...prev,
            [tempId]: { success: false, error: result.message },
          }));
        }
      });

      webSocketService.sendMessage(enquiryId, formData, tempId, (result) => {
        if (result.status === "ERROR") {
          pendingRequests.current.get(tempId)?.(result);
        }
      });
    },
    [enquiryId]
  );

  return { messages, messageStatuses, handleSubmitReply };
}

const isOptimistic = (id: string) => id.startsWith("temp-");

function createOptimisticMessage(
  data: EnquiryMessageReplyFormData
): EnquiryMessageReplyItemProps {
  return {
    id: `temp-${Date.now()}`,
    agentId: data.agentId,
    enquirerId: data.enquirerId,
    content: data.content,
    createdAt: new Date().toISOString(),
    senderId: data.senderId ?? data.agentId,
  };
}

/**
 * Merges external messages with local state, preserving pending optimistic messages
 * that haven't been confirmed yet.
 */
function syncWithExternal(
  currentMessages: EnquiryMessageReplyItemProps[],
  externalMessages: EnquiryMessageReplyItemProps[]
): EnquiryMessageReplyItemProps[] {
  const pendingOptimistic = currentMessages.filter((m) => isOptimistic(m.id));
  const stillPending = pendingOptimistic.filter((pending) => {
    const isConfirmed = externalMessages.some(
      (ext) =>
        ext.content === pending.content && ext.senderId === pending.senderId
    );
    return !isConfirmed;
  });

  const newIds = [...externalMessages, ...stillPending]
    .map((m) => m.id)
    .join(",");
  const currentIds = currentMessages.map((m) => m.id).join(",");

  if (newIds === currentIds) return currentMessages;

  return [...externalMessages, ...stillPending];
}

/**
 * Merges a single incoming real-time message into the list.
 * Handles deduplication and optimistic replacement.
 */
function mergeIncomingMessage(
  currentMessages: EnquiryMessageReplyItemProps[],
  incoming: RealTimeMessage,
  agentId: number,
  enquirerId: number,
  onOptimisticMatch?: (tempId: string) => void
): EnquiryMessageReplyItemProps[] {
  if (currentMessages.some((msg) => msg.id === incoming.id)) {
    return currentMessages;
  }

  const newMessage: EnquiryMessageReplyItemProps = {
    id: incoming.id,
    agentId: agentId,
    enquirerId: enquirerId,
    content: incoming.content,
    createdAt: incoming.createdAt,
    senderId: incoming.senderId,
  };

  const optimisticIndex = currentMessages.findIndex(
    (msg) =>
      isOptimistic(msg.id) &&
      msg.content === newMessage.content &&
      msg.senderId === newMessage.senderId
  );

  if (optimisticIndex !== -1) {
    const optimisticId = currentMessages[optimisticIndex].id;
    if (onOptimisticMatch) onOptimisticMatch(optimisticId);

    const next = [...currentMessages];
    next[optimisticIndex] = newMessage;
    return next;
  }

  return [...currentMessages, newMessage];
}
