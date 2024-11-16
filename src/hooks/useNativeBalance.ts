import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/contexts/auth";
import { sdk } from "@/libs/bitkub-sdk";

export const useNativeBalance = () => {
  const { isLoggedIn } = useAuth();
  const [balance, setBalance] = useState<string | null>("0");

  const getBalance = useCallback(async () => {
    try {
      const balance = await sdk.getBalanceNative();
      setBalance(balance.balance.toString());
    } catch (error) {
      console.error(error);
      setBalance("0");
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    getBalance();
  }, [isLoggedIn, getBalance]);

  return { balance, refetch: getBalance };
};
