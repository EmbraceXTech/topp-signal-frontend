import React from "react";
import { Button } from "@nextui-org/react";
import { truncateAddress } from "@/utils/string.util";
import { LogOutIcon } from "lucide-react";
import { useAuth } from "@/contexts/auth";

export default function CustomConnectWalletBtn() {
  const { isLoggedIn, logout, loginWithBitkubNext, authLoading, userInfo } =
    useAuth();

  return (
    <>
      {authLoading ? (
        <Button isLoading />
      ) : isLoggedIn ? (
        <div className="flex">
          <div className="select-none text-sm px-3 py-2.5 pl-4 rounded-md bg-gray-100 z-20 rounded-l-xl">
            {truncateAddress(userInfo?.walletAddress || "")}
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
