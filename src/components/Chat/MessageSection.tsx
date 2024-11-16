import { CircleUserRound } from "lucide-react";

import { truncateAddress } from "@/utils/truncrate";
import { Avatar } from "@nextui-org/react";

export default function MessageSection({
  address,
  content,
}: {
  address: string;
  content: string;
}) {
  const avatar = undefined;
  return (
    <div className="flex items-center space-x-1">
      {avatar ? <Avatar /> : <CircleUserRound color="#737373" />}
      <div className="text-black font-semibold">{truncateAddress(address)}</div>
      <div className="text-[#737373]">{content}</div>
    </div>
  );
}
