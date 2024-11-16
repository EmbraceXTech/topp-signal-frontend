import Chat from "@/components/Chat";
import { usePushProtocolStore } from "@/stores/pushProtocolStore";
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    ethereum?: never;
  }
}

export default function Test() {
  const [_signer, setSigner] = useState<ethers.BrowserProvider>();
  const { initClient } = usePushProtocolStore();

  const connectWallet = async () => {
    // Connect to wallet using Web3Provider (MetaMask, etc.)
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []); // Request account access
    const signer = await provider.getSigner();
    setSigner(signer);
    await initClient(signer);
  };

  const sendChat = async () => {
    try {
      if (!_signer) return;

      console.log("Signer Address:", await _signer.getAddress());

      // Initialize Push Protocol User
      const userAlice = await PushAPI.initialize(_signer, {
        env: CONSTANTS.ENV.STAGING,
      });

      // Specify recipient address
      const toWalletAddress = "0xaF6111116D69B1c323277a9Ad72c1389a3D30c44"; // Replace with actual address

      // Send a chat message
      const aliceMessagesBob = await userAlice.chat.send(toWalletAddress, {
        content: "Hello Bob!",
        type: "Text",
      });
      console.log(aliceMessagesBob);
    } catch (error) {
      console.error("Error sending chat message:", error);
    }
  };

  const joinChat = async () => {
    if (!_signer) return;

    console.log("Signer Address:", await _signer.getAddress());

    // Initialize Push Protocol User
    const userAlice = await PushAPI.initialize(_signer, {
      env: CONSTANTS.ENV.STAGING,
    });
    const joinGroup = await userAlice.chat.group.join(
      "d349d7acb457d93f4686b44edcefe76725dedffd705b71bef819ebeaf00c2e19"
    );
    console.log(joinGroup);
    await userAlice.chat.send(
      "d349d7acb457d93f4686b44edcefe76725dedffd705b71bef819ebeaf00c2e19",
      {
        content: "Hello Alice!",
        type: "Text",
      }
    );
  };

  useEffect(() => {
    async function getEnsName() {
      const provider = new ethers.JsonRpcProvider("https://eth-sepolia.public.blastapi.io");
      const ensName = await provider.lookupAddress("0xE3876f1D0D0DbC782d7844FdE8675c75628E36a2");
      console.log(ensName);
    }
    getEnsName();
  }, []);
  return (
    <div>
      <div className="flex gap-4">
        <button onClick={joinChat}>Join Chat</button>
        <button onClick={sendChat}>Send Chat</button>
        <button onClick={connectWallet}>Connect Wallet</button>
      </div>
      <div className="min-h-96">
        <Chat />
      </div>
    </div>
  );
}
