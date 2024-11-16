import { useState } from "react";

import { Button, Input } from "@nextui-org/react";
import { useChatGroup } from "@/hooks/useChatGroup";
import { usePushProtocolStore } from "@/stores/pushProtocolStore";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { sendChat } = useChatGroup();
  const { historyMessages } = usePushProtocolStore();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    console.log("submit");
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get("message") as string;
    try {
      await sendChat(message);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between">
      {/* chat history */}
      <div>Chat History</div>
      {historyMessages.map((h, k) => (
        <div key={k}>
          <div>{h.address}</div>
          <div>{h.content}</div>
          <div>{new Date(h.timestamp).toLocaleString()}</div>
        </div>
      ))}
      {/* chat input */}
      <form onSubmit={onSubmit} className="flex space-x-1">
        <Input
          name="message"
          type="text"
          placeholder="Type your message..."
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && message.length > 0) {
              e.currentTarget.form?.requestSubmit();
            }
          }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit" disabled={message.length === 0 || isLoading}>
          {isLoading ? "Sending..." : "Send"}
        </Button>
      </form>
    </div>
  );
}
