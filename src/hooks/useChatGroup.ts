import { sdk } from "@/libs/bitkub-sdk";
import { getEnsAvatar, getEnsName } from "@/services/ens.service";
import { usePushProtocolStore } from "@/stores/pushProtocolStore";
import {
  checkMessageFormat,
  decodeMessage,
  encodeMessage,
} from "@/utils/string.util";
import { PushAPI } from "@pushprotocol/restapi";
import { useCallback, useEffect } from "react";

declare global {
  interface Window {
    ethereum?: never;
  }
}

// TODO: Change to env variable
const CHAT_GROUP_ID =
  "d349d7acb457d93f4686b44edcefe76725dedffd705b71bef819ebeaf00c2e19";

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

    console.log("CHAT_GROUP_ID", message, CHAT_GROUP_ID);

    const address = await sdk.getUserWalletAddress();

    const res = await client.chat.send(CHAT_GROUP_ID, {
      content: encodeMessage(address, message),
      type: "Text",
    });

    const ensName = await getEnsName(address);
    console.log("ensName", ensName);
    addHistoryMessage({
      address,
      content: message,
      timestamp: new Date().getTime(),
      ensName: ensName || undefined,
    });

    return res;
  };

  const initHistoryMessages = useCallback(async () => {
    if (!client) {
      await initClient();
    }

    const history =
      (await client?.chat.history(CHAT_GROUP_ID, { limit: 10 })) || [];
    console.log("history", history);
    const historyFormat = history
      .map((h) => {
        if (checkMessageFormat(h?.messageContent)) {
          console.log(h?.messageContent);
          console.log(decodeMessage(h?.messageContent));
          return {
            address: decodeMessage(h?.messageContent).address,
            content: decodeMessage(h?.messageContent).content,
            timestamp: new Date(h?.timestamp).getTime(),
          };
        } else if (h?.fromDID && h?.messageContent && h?.timestamp) {
          return {
            address: h.fromDID.split(":")[1],
            content: h?.messageContent,
            timestamp: new Date(h?.timestamp).getTime(),
          };
        }
        // Return undefined if no conditions are met
      })
      .filter(
        (msg): msg is { address: string; content: string; timestamp: number } =>
          msg !== undefined
      ); // Filter out undefined values

    // TODO: if address is empty string then remove it

    const addressUnique = [
      ...new Set(historyFormat.map((addr) => addr.address)),
    ];
    console.log("addressUnique", addressUnique);

    const ensNamePromise = addressUnique.map(async (addr, index) => {
      await new Promise((resolve) => setTimeout(resolve, index * 1000));
      try {
        if (!addr || addr.length === 0) {
          return {
            addr,
            ensName: null,
            avatar: undefined,
          };
        }
        const ensName = await getEnsName(addr);
        const avatar = ensName ? await getEnsAvatar(ensName) : undefined;
        return {
          addr,
          ensName,
          avatar,
        };
      } catch (error) {
        console.error("error", error);
        return {
          addr,
          ensName: null,
          avatar: undefined,
        };
      }
    });

    const ensNameList = await Promise.all(ensNamePromise);

    console.log("ensNameList", ensNameList);

    const historyWithEnsName = historyFormat.map((h) => {
      const match = ensNameList.find((e) => e.addr === h.address);
      const ensName = match?.ensName;
      const avatar = match?.avatar;
      return {
        ...h,
        ensName: ensName || undefined,
        avatar: avatar || undefined,
      };
    });

    console.log("historyWithEnsName", historyWithEnsName);

    setHistoryMessages(historyWithEnsName);
  }, [client, initClient, setHistoryMessages]);

  useEffect(() => {
    initHistoryMessages();
  }, [client, initClient, initHistoryMessages]);

  return { client, sendChat };
};
