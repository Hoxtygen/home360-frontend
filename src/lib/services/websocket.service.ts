import { webSocketUrl } from "./../endpoints/index";
import { getCookie } from "cookies-next";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { ListingEnquiryMessageReply } from "features/messages/types";

let client: Client | null = null;

const connect = (enquiryId: string, callback: (message: any) => void) => {
  const token = getCookie("token");
  client = new Client({
    brokerURL: `${webSocketUrl}`,
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    webSocketFactory: () => new SockJS(`${webSocketUrl}`),
  });
  client.onConnect = () => {
    console.log("Connected to Websocket server");
    client?.subscribe(`/topic/public/${enquiryId}`, (message) => {
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
  if (client && client.connected) {
    try {
      client.publish({
        destination: `/app/chat/${enquiryId}/sendMessage`,
        body: JSON.stringify({ ...message, localMessageId }),
      });
      // Resolve will happen in the websocket message listener.
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
        callback({
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
          }, //create a dummy message.
          message: "Failed to send message after retries.",
          status: "ERROR",
          statusCode: "ERROR",
          statusCodeValue: 500,
          localMessageId: localMessageId,
        }); // Send error to callback
      }
    }
  } else {
    callback({
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
      }, //create a dummy message.
      message: "WebSocket client not connected.",
      status: "ERROR",
      statusCode: "ERROR",
      statusCodeValue: 500,
      localMessageId: localMessageId,
    }); // Send error to callback
  }
};

export { connect, sendMessage };
