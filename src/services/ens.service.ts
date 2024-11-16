import { ethers } from "ethers";

export const getEnsName = async (address: string) => {
  const provider = new ethers.JsonRpcProvider(
    "https://eth-sepolia.public.blastapi.io"
  );
  return await provider.lookupAddress(address);
};

export const getEnsAvatar = async (ensName: string) => {
  const provider = new ethers.JsonRpcProvider(
    "https://eth-sepolia.public.blastapi.io"
  );
  const ensAvatar = await provider.getAvatar(ensName);

  return ensAvatar;
};

