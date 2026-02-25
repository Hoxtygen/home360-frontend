import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { getCookie } from "cookies-next";
import { webSocketUrl } from "../endpoints";
import {
  EnquiryMessageReplyFormData,
  ListingEnquiryMessageReply,
} from "features/messages/types";

class WebSocketService {
  private readonly client: Client;
  private connectionQueue: Array<() => void> = [];

  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS(webSocketUrl),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.client.onConnect = () => {
      console.info("WebSocket Connected");
      this.connectionQueue.forEach((task) => task());
      this.connectionQueue = [];
    };

    this.client.onDisconnect = () => {
      console.info("WebSocket Disconnected");
    };

    this.client.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    };
  }

  private static instance: WebSocketService;
  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  public connect() {
    if (this.client.active) return;

    const token = getCookie("token");
    this.client.connectHeaders = {
      Authorization: `Bearer ${token}`,
    };

    this.client.activate();
  }

  public disconnect() {
    if (this.client.active) {
      this.client.deactivate();
    }
  }

  public subscribe(topic: string, callback: (msg: any) => void): () => void {
    let subscription: StompSubscription | null = null;

    const doSub = () => {
      if (!this.client.connected) {
        if (!this.connectionQueue.includes(doSub)) {
          this.connectionQueue.push(doSub);
        }
        return;
      }
      try {
        subscription = this.client.subscribe(topic, (message: IMessage) => {
          try {
            if (!message.body) return;
            const body = JSON.parse(message.body);
            callback(body);
          } catch (err) {
            console.error("JSON Parse error", err);
          }
        });
      } catch (error) {
        console.error("Subscription failed", error);

        if (!this.connectionQueue.includes(doSub)) {
          this.connectionQueue.push(doSub);
        }
      }
    };

    if (this.client.connected) {
      doSub();
    } else {
      this.connectionQueue.push(doSub);
      this.connect();
    }

    return () => {
      if (subscription) {
        try {
          subscription.unsubscribe();
        } catch (e) {
          console.error("Unsubscribe error", e);
        }
      } else {
        this.connectionQueue = this.connectionQueue.filter((t) => t !== doSub);
      }
    };
  }

  public sendMessage(
    enquiryId: string,
    message: EnquiryMessageReplyFormData,
    localMessageId: string,
    callback: (_result: ListingEnquiryMessageReply) => void,
    retryCount = 0
  ) {
    if (!this.client.connected) {
      callback(this.createError(localMessageId, "WebSocket not connected"));
      return;
    }

    try {
      this.client.publish({
        destination: `/app/chat/${enquiryId}/sendMessage`,
        body: JSON.stringify({ ...message, localMessageId }),
      });

      callback({
        status: "SUCCESS",
        statusCode: "OK",
        statusCodeValue: 200,
        message: "Sent",
        body: { data: { ...message, id: localMessageId } as any },
        headers: {},
        localMessageId,
      });
    } catch (error) {
      console.error("Send error", error);
      if (retryCount < 3) {
        setTimeout(() => {
          this.sendMessage(
            enquiryId,
            message,
            localMessageId,
            callback,
            retryCount + 1
          );
        }, 5000);
      } else {
        callback(this.createError(localMessageId, "Failed to send message"));
      }
    }
  }

  private createError(
    localId: string,
    msg: string
  ): ListingEnquiryMessageReply {
    return {
      status: "ERROR",
      statusCode: "ERROR",
      statusCodeValue: 500,
      message: msg,
      body: { data: null as any },
      headers: {},
      localMessageId: localId,
    };
  }
}

export const webSocketService = WebSocketService.getInstance();
