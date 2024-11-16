import { initializeSDK, Network } from "@bitkub-chain/sdk.js";

const clientID = process.env.NEXT_PUBLIC_BITKUB_NEXT_CLIENT_ID || "";
const projectID = process.env.NEXT_PUBLIC_BITKUB_NEXT_PROJECT_ID || "";
const network = Network.BKC_TESTNET;
const initOpts = {
  loginRedirectPath: "/oauth/callback",
};

export const sdk = initializeSDK(clientID, projectID, network, initOpts);
