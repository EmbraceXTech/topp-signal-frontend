import { CircleUserRound } from "lucide-react";

import { truncateAddress } from "@/utils/string.util";
import { Avatar } from "@nextui-org/react";
import { isWalletAddress } from "@/utils/address.util";

export default function MessageSection({
  name,
  content,
  avatar,
}: {
  name: string;
  content: string;
  avatar?: string;
}) {
  return (
    <div>
      <div className="flex items-center space-x-1">
        {avatar ? (
          <Avatar src={avatar} size="sm" />
        ) : (
          <CircleUserRound color="#737373" size={30} />
        )}
        <div className="text-black font-semibold">
          {isWalletAddress(name) ? truncateAddress(name) : name}
        </div>
      </div>
      <div className="text-[#737373]">{content}</div>
    </div>
  );
}
