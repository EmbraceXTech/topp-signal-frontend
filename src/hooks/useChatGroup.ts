import { sdk } from "@/libs/bitkub-sdk";
import { usePushProtocolStore } from "@/stores/pushProtocolStore";
import { PushAPI } from "@pushprotocol/restapi";
import { useCallback, useEffect } from "react";

declare global {
  interface Window {
    ethereum?: never;
  }
}

// TODO: Change to env variable
const CHAT_GROUP_ID =
  "50d6c4d68f7f63d97a8adfe0e0b1bd6e04d65ef5925e37d13a479d2a083a4d1b";

export const useChatGroup = (_client?: PushAPI) => {
  const {
    client: clientStore,
    // getClient,
    setHistoryMessages,
    addHistoryMessage,
    initClient,
  } = usePushProtocolStore();
  const client = _client || clientStore;

  const sendChat = async (message: string) => {
    if (!client) return;

    const res = await client.chat.send(CHAT_GROUP_ID, {
      content: message,
      type: "Text",
    });

    const address = res.fromDID.split(":")[1];

    addHistoryMessage({
      address,
      content: message,
      timestamp: new Date().getTime(),
    });

    return res;
  };

  const initHistoryMessages = useCallback(async () => {
    if (!client) return;
    const history = await client.chat.history(CHAT_GROUP_ID, { limit: 10 });
    setHistoryMessages(
      history.map((h) => ({
        address: h.fromDID.split(":")[1],
        content: h.messageContent,
        timestamp: new Date(h.timestamp).getTime(),
      }))
    );
  }, [client, setHistoryMessages]);

  useEffect(() => {
    if (!client) return;
    initHistoryMessages();
  }, [client, initClient, initHistoryMessages]);

  return { client, sendChat };
};
