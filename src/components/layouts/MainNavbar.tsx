import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import CustomConnectWalletBtn from "../CustomConnectWalletBtn";

export default function MainNavbar() {
  const router = useRouter();

  const menuItems = [
    {
      label: "Leaderboard",
      path: "/leaderboard",
    },
    {
      label: "Prediction",
      path: "/prediction",
    },
  ];

  return (
    <div className="bg-white w-full flex items-center justify-between py-[20px] px-10 border-b shadow-sm h-[70px]">
      <div className="flex items-center">
        <p
          className="font-bold text-2xl cursor-pointer"
          onClick={() => router.push("/")}
        >
          {/* <span className="text-primary">Topp</span>
          <span className="font-normal">Signal</span> */}
          <Image src="/logo.svg" alt="logo" width={150} height={150} />
        </p>
        <div className="flex items-center ml-[40px] space-x-5 text-md">
          {menuItems.map((item) => (
            <p
              onClick={() => router.push(item.path)}
              key={item.path}
              className={`cursor-pointer hover:opacity-80 ${
                router.pathname === item.path ? "font-bold" : "font-normal"
              }`}
            >
              {item.label}
            </p>
          ))}
        </div>
      </div>
      <CustomConnectWalletBtn />
    </div>
  );
}
