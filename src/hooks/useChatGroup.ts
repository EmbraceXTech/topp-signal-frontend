import { usePushProtocolStore } from "@/stores/pushProtocolStore";
import { PushAPI } from "@pushprotocol/restapi";
import { useCallback, useEffect } from "react";

// TODO: Change to env variable
const CHAT_GROUP_ID =
  "d349d7acb457d93f4686b44edcefe76725dedffd705b71bef819ebeaf00c2e19";

export const useChatGroup = (_client?: PushAPI) => {
  const {
    client: clientStore,
    // getClient,
    setHistoryMessages,
    addHistoryMessage,
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
  }, [client, initHistoryMessages]);

  return { client, sendChat };
};
