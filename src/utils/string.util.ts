export const truncateAddress = (address: string) => {
  return address.slice(0, 4) + "..." + address.slice(-4);
};

export const encodeMessage = (address: string, message: string) => {
  return `::${address}:: ${message}`;
}

export const decodeMessage = (message: string) => {
  const [address, content] = message.split("::");
  return { address, content };
};

export const checkMessageFormat = (message: string) => {
  if (typeof message !== "string") return false;
  return message.startsWith("::") && message.includes(":: ");
};
