import { useEffect } from "react";
import { sdk } from "@/libs/bitkub-sdk";
import { Spinner } from "@nextui-org/react";

export default function Page() {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) {
      exchange(code);
    }
  }, []);

  const exchange = async (code: string) => {
    await sdk.exchangeAuthorizationCode(code);
    window.close();
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Spinner />
    </div>
  );
}
