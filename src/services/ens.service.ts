import { isWalletAddress } from "@/utils/address.util";
import { ethers } from "ethers";

export const getEnsName = async (address: string) => {
  if (!isWalletAddress(address) || !address || address === "") {
    return null;
  }
  const provider = new ethers.JsonRpcProvider(
    "https://eth-sepolia.public.blastapi.io"
  );
  return await provider.lookupAddress(address);
};

export const getEnsAvatar = async (ensName: string) => {
  if (!ensName || ensName === "") {
    return null;
  }
  const provider = new ethers.JsonRpcProvider(
    "https://eth-sepolia.public.blastapi.io"
  );
  const ensAvatar = await provider.getAvatar(ensName);

  return ensAvatar;
};

