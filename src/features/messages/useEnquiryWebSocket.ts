import {
  EnquiryMessageReplyFormData,
  EnquiryMessageReplyItemProps,
  ListingEnquiryMessageReply,
} from "features/messages/types";
import {
  connect,
  disconnect,
  sendMessage,
} from "lib/services/websocket.service";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseEnquiryWebSocketProps {
  enquiryId: string;
  externalMessages: EnquiryMessageReplyItemProps[];
}

export function useEnquiryWebSocket({
  enquiryId,
  externalMessages,
}: UseEnquiryWebSocketProps) {
  const [messages, setMessages] = useState<EnquiryMessageReplyItemProps[]>(
    externalMessages || []
  );
  const [messageStatuses, setMessageStatuses] = useState<{
    [messageId: string]: { success?: boolean; error?: any };
  }>({});
  const messageCallbacks = useRef(
    new Map<string, (result: ListingEnquiryMessageReply) => void>()
  );

  // Handle incoming WebSocket messages
  const handleMessage = useCallback((message: any) => {
    if (message.localMessageId) {
      const cb = messageCallbacks.current.get(message.localMessageId);
      if (cb) {
        cb(message);
        messageCallbacks.current.delete(message.localMessageId);
      }
    } else {
      const messageData: EnquiryMessageReplyItemProps = {
        id: message.id,
        agentId: message.agentId,
        enquirerId: message.enquirerId,
        content: message.content,
        createdAt: message.createdAt,
        senderId: message.senderId,
      };
      setMessages((prevMessages) => {
        if (prevMessages.find((msg) => msg.id === messageData.id)) {
          return prevMessages;
        }
        return [...prevMessages, messageData];
      });
    }
  }, []);

  useEffect(() => {
    connect(enquiryId, handleMessage);
    return () => {
      disconnect();
    };
  }, [enquiryId, handleMessage]);

  const handleSubmitReply = useCallback(
    (replyRequestData: EnquiryMessageReplyFormData) => {
      const localMessageId = Date.now().toString();
      setMessageStatuses((prevStatuses) => ({
        ...prevStatuses,
        [localMessageId]: {},
      }));
      messageCallbacks.current.set(
        localMessageId,
        (result: ListingEnquiryMessageReply) => {
          setMessageStatuses((prevStatuses) => ({
            ...prevStatuses,
            [localMessageId]: { success: true, error: null },
          }));
          console.log("result:", result);
          const messageData: EnquiryMessageReplyItemProps = {
            id: result.body.data.id,
            agentId: result.body.data.agentId,
            enquirerId: result.body.data.enquirerId,
            content: result.body.data.content,
            createdAt: result.body.data.createdAt,
            senderId: result.body.data.senderId,
          };
          setMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg.id === localMessageId ? messageData : msg
            )
          );
        }
      );
      sendMessage(enquiryId, replyRequestData, localMessageId, (result) => {
        console.log("Result:", result);
        messageCallbacks.current.get(localMessageId)?.(result);
      });
    },
    [enquiryId]
  );

  useEffect(() => {
    // Only update if the external messages are different (by length or ids)
    if (!externalMessages) return;
    setMessages((prev) => {
      // If the arrays are the same by id, do not update
      const prevIds = prev.map((m) => m.id).join(",");
      const extIds = externalMessages.map((m) => m.id).join(",");
      if (prevIds === extIds) return prev;
      return externalMessages;
    });
  }, [externalMessages]);

  return { messages, messageStatuses, handleSubmitReply };
}
