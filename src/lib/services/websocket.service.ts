import { webSocketUrl } from "./../endpoints/index";
import { getCookie } from "cookies-next";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { ListingEnquiryMessageReply } from "features/messages/types";

let client: Client | null = null;

const connect = (enquiryId: string, callback: (message: any) => void) => {
  if (client?.active) return;
  client = new Client({
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    webSocketFactory: () => new SockJS(`${webSocketUrl}`),
  });
  client.beforeConnect = () => {
    const token = getCookie("token");
    client!.connectHeaders = {
      Authorization: `Bearer ${token}`,
    };
  };
  client.onConnect = () => {
    console.info("Connected to Websocket server");

    client?.subscribe(`/topic/public.${enquiryId}`, (message) => {
      console.log("parsed message:", JSON.parse(message.body));
      callback(JSON.parse(message.body));
    });
  };
  client.onStompError = (frame) => {
    console.log("stomp error:", frame);
  };
  client.onDisconnect = () => {
    console.log("Disconnected from Websocket server");
  };
  client.activate();
};
const sendMessage = (
  enquiryId: string,
  message: any,
  localMessageId: string,
  callback: (result: ListingEnquiryMessageReply) => void,
  maxRetries = 3,
  retryDelay = 5000,
  retryCount = 0
): void => {
  if (client?.active && client?.connected) {
    try {
      client.publish({
        destination: `/app/chat/${enquiryId}/sendMessage`,
        body: JSON.stringify({ ...message, localMessageId }),
      });
    } catch (error) {
      console.error("Failed to send message:", error);
      if (retryCount < maxRetries) {
        setTimeout(() => {
          sendMessage(
            enquiryId,
            message,
            localMessageId,
            callback,
            maxRetries,
            retryDelay * 2,
            retryCount + 1
          );
        }, retryDelay);
      } else {
        callback(
          createDummyErrorMessage(
            localMessageId,
            "Failed to send message after retries."
          )
        );
      }
    }
  } else {
    callback(
      createDummyErrorMessage(localMessageId, "WebSocket client not connected.")
    );
  }
};

const disconnect = () => {
  if (client) {
    client.deactivate();
    client = null;
    console.log("WebSocket client disconnected.");
  }
};

function createDummyErrorMessage(
  localMessageId: string,
  errorMsg: string
): ListingEnquiryMessageReply {
  return {
    headers: {},
    body: {
      data: {
        id: localMessageId,
        agentId: 0,
        enquirerId: 0,
        content: "",
        createdAt: "",
        senderId: 0,
      },
    },
    message: errorMsg,
    status: "ERROR",
    statusCode: "ERROR",
    statusCodeValue: 500,
    localMessageId: localMessageId,
  };
}

export { connect, sendMessage, disconnect };
