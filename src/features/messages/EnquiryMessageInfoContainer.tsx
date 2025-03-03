import React, { useEffect, useState } from "react";
import {
  EnquiryMessageInfoContainerProps,
  EnquiryMessageReplyFormData,
  EnquiryMessageReplyItemProps,
  ListingEnquiryMessageReply,
} from "./types";
import EnquiryMessageInfo from "./EnquiryMessageInfo";
import EnquiryMessageReplies from "./EnquiryMessageReplies";
import EnquiryMessageReplyForm from "./EnquiryMessageReplyForm";
import { connect, sendMessage } from "lib/services/websocket.service";

export default function EnquiryMessageInfoContainer({
  enquiryData,
  enquiryId,
}: EnquiryMessageInfoContainerProps) {
  const [messages, setMessages] = useState<EnquiryMessageReplyItemProps[]>(
    enquiryData.replies || []
  );

  const [messageStatuses, setMessageStatuses] = useState<{
    [messageId: string]: { success?: boolean; error?: any };
  }>({});

  const messageCallbacks = new Map<
    string,
    (result: ListingEnquiryMessageReply) => void
  >();

  const replyInitialValues: EnquiryMessageReplyFormData = {
    content: "",
    enquirerId: enquiryData.userId!,
    agentId: enquiryData.agentId,
    enquiryId: enquiryId,
  };

  useEffect(() => {
    connect(enquiryId, (message: ListingEnquiryMessageReply) => {
      if (message.localMessageId) {
        messageCallbacks.get(message.localMessageId);
        messageCallbacks.delete(message.localMessageId);
      } else {
        const messageData: EnquiryMessageReplyItemProps = {
          id: message.body.data.id,
          agentId: message.body.data.agentId,
          enquirerId: message.body.data.enquirerId,
          content: message.body.data.content,
          createdAt: message.body.data.createdAt,
          senderId: message.body.data.senderId,
        };
        setMessages((prevMessages) => {
          if (prevMessages.find((msg) => msg.id === messageData.id)) {
            return prevMessages;
          }
          return [...prevMessages, messageData];
        });
      }
    });
  }, [enquiryId]);

  async function handleSubmitReply(
    replyRequestData: EnquiryMessageReplyFormData
  ) {
    const localMessageId = Date.now().toString();
    setMessageStatuses((prevStatuses) => ({
      ...prevStatuses,
      [localMessageId]: {},
    }));

    messageCallbacks.set(
      localMessageId,
      (result: ListingEnquiryMessageReply) => {
        setMessageStatuses((prevStatuses) => ({
          ...prevStatuses,
          [localMessageId]: { success: true, error: null },
        }));

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
      messageCallbacks.get(localMessageId)?.(result);
    });
  }

  useEffect(() => {
    if (enquiryData) {
      setMessages(enquiryData.replies || []);
    }
  }, [enquiryData]);

  return (
    <div className="pb-20">
      <EnquiryMessageInfo enquiryData={enquiryData} />
      {enquiryData && enquiryData.userId && (
        <>
          <div className="mb-10">
            <EnquiryMessageReplies replies={messages} />
          </div>
          <EnquiryMessageReplyForm
            replyInitialValues={replyInitialValues}
            handleSubmitReply={handleSubmitReply}
            messageStatuses={messageStatuses}
          />
        </>
      )}
    </div>
  );
}
