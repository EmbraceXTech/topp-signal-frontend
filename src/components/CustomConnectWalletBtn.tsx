import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { truncateAddress } from "@/utils/string.util";
import { LogOutIcon } from "lucide-react";
import { useAuth } from "@/contexts/auth";
import { getEnsAvatar, getEnsName } from "@/services/ens.service";

export default function CustomConnectWalletBtn() {
  const { isLoggedIn, logout, loginWithBitkubNext, authLoading, userInfo } =
    useAuth();

  const [ensName, setEnsName] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const _ensName = await getEnsName(userInfo?.walletAddress || "");
      const _avatar = await getEnsAvatar(_ensName || "");
      setEnsName(_ensName);
      setAvatar(_avatar);
    };
    fetch();
  }, [userInfo?.walletAddress]);

  return (
    <>
      {authLoading ? (
        <Button isLoading />
      ) : isLoggedIn ? (
        <div className="flex">
          <div className="select-none text-sm px-3 py-2.5 pl-4 rounded-md bg-gray-100 z-20 rounded-l-xl">
            {ensName ?? truncateAddress(userInfo?.walletAddress || "")}
          </div>

          <Button
            className="-ml-2.5 z-10"
            isIconOnly
            color="primary"
            variant="flat"
            onClick={() => logout()}
          >
            <LogOutIcon size={16} className="text-red-400 ml-2.5" />
          </Button>
        </div>
      ) : (
        <Button color="primary" onClick={loginWithBitkubNext}>
          Connect Wallet
        </Button>
      )}
    </>
  );
}
