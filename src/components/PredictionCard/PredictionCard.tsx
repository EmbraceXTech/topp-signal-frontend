import { ArrowUp, CircleDot, Clock, DicesIcon } from "lucide-react";
import React from "react";
import ProgressBar from "./ProgressBar";
import { Button } from "@nextui-org/react";

export default function PredictionCard() {
  return (
    <div className="w-[320px] h-[370px] bg-white rounded-2xl shadow-xl">
      <div className="w-full pt-4 pb-3">
        <div className="px-4 flex justify-between items-center">
          <div className="flex items-center text-primary">
            <CircleDot size={16} className="mr-1" />
            <p className="text-sm font-bold">LIVE</p>
          </div>
          <div className="flex items-center text-gray-500">
            <Clock size={16} className="mr-1" />
            <p className="text-sm">01:27:49</p>
          </div>
        </div>
      </div>
      <ProgressBar percent={50} />
      <div className="w-[285px] mx-auto my-[30px] bg-[#FAFAFA] rounded-xl p-3">
        <p className="text-xs">LAST PRICE</p>
        <div className="flex w-full items-center justify-between">
          <p className="font-bold text-green-400 text-2xl">$2.4400</p>
          <div className="flex items-center bg-green-400 rounded-full px-2 py-1 text-white">
            <ArrowUp size={18} />
            <p className="text-sm ml-0.5">$0.1635</p>
          </div>
        </div>
      </div>
      <div className="px-4 space-y-2 text-black font-medium">
        <div className="flex justify-between text-sm">
          <p>TimeSlot:</p>
          <p>1:00</p>
        </div>
        <div className="flex justify-between text-sm">
          <p>Average Price:</p>
          <p>$2.4400</p>
        </div>
        <div className="flex justify-between font-bold">
          <p>Prize Pool:</p>
          <p>1.08 KUB</p>
        </div>
      </div>
      <div className="w-full border-b mt-3" />
      <div className="flex justify-center items-center w-full h-[87px] px-5">
        <Button fullWidth className="bg-black text-white">
          <DicesIcon />
          Place Prediction
        </Button>
      </div>
    </div>
  );
}
