import { CONSTANTS, PushAPI } from "@pushprotocol/restapi";
import { ethers } from "ethers";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type IPushProtocolStore = {
  client: PushAPI | null;
  setClient: (client: PushAPI) => void;
  // getClient: () => PushAPI | null;
  initClient: (signer?: ethers.providers.JsonRpcSigner) => Promise<void>;
  historyMessages: {
    address: string;
    content: string;
    timestamp: number;
  }[];
  setHistoryMessages: (
    messages: {
      address: string;
      content: string;
      timestamp: number;
    }[]
  ) => void;
  addHistoryMessage: (message: {
    address: string;
    content: string;
    timestamp: number;
  }) => void;
};

const CHAT_GROUP_ID = process.env.NEXT_PUBLIC_ROOM_ID || "d349d7acb457d93f4686b44edcefe76725dedffd705b71bef819ebeaf00c2e19";

export const usePushProtocolStore = create<IPushProtocolStore>()(
  persist(
    (set, get) => ({
      client: null,
      setClient: (client: PushAPI) => {
        // localStorage.setItem("push-protocol-client", JSON.stringify(client));
        set({
          client,
        });
      },
      // getClient: () => {
      //   if (typeof window === "undefined") return null;
      //   const client = localStorage.getItem("push-protocol-client");
      //   return client ? JSON.parse(client) : null;
      // },
      initClient: async (signer?: ethers.providers.JsonRpcSigner) => {
        const client = await PushAPI.initialize(signer, {
          env: CONSTANTS.ENV.STAGING,
        });
        const stream = await client.initStream(
          [
            CONSTANTS.STREAM.CHAT, // Listen for chat messages
            CONSTANTS.STREAM.NOTIF, // Listen for notifications
            CONSTANTS.STREAM.CONNECT, // Listen for connection events
            CONSTANTS.STREAM.DISCONNECT, // Listen for disconnection events
          ],
          {
            // Filter options:
            filter: {
              // Listen to all channels and chats (default):
              channels: ["*"],
              chats: [CHAT_GROUP_ID],
              // Listen to events with a specific recipient:
              // recipient: '0x...' (replace with recipient wallet address)
            },
            // Connection options:
            connection: {
              retries: 3, // Retry connection 3 times if it fails
            },
            raw: false, // Receive events in structured format
          }
        );

        // Stream connection established:
        stream.on(CONSTANTS.STREAM.CONNECT, async () => {
          console.log("Stream Connected");
        });

        // Chat message received:
        stream.on(CONSTANTS.STREAM.CHAT, (message) => {
          console.log("Encrypted Message Received");
          console.log(message);
          get().addHistoryMessage({
            address: message.from.split(":")[1],
            content: message.message.content,
            timestamp: new Date(Number(message.timestamp)).getTime(),
          });
        });

        // Chat operation received:
        stream.on(CONSTANTS.STREAM.CHAT_OPS, (data) => {
          console.log("Chat operation received.");
          console.log(data);
        });

        // Connect the stream:
        await stream.connect();

        // Stream disconnection:
        stream.on(CONSTANTS.STREAM.DISCONNECT, () => {
          console.log("Stream Disconnected");
        });
        get().setClient(client);
      },
      historyMessages: [],
      addHistoryMessage: (message) =>
        set((state) => ({
          historyMessages: [message, ...state.historyMessages],
        })),
      setHistoryMessages: (messages) => set({ historyMessages: messages }),
    }),
    {
      name: "push-protocol-store",
      storage: createJSONStorage(() => sessionStorage), // Use localStorage
      partialize: (state) =>
        // Exclude the `client` field from persistence
        ({
          historyMessages: state.historyMessages,
        }),
    }
  )
);
