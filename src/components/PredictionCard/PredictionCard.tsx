import { ArrowUp, CircleDot, CircleX, Clock, DicesIcon } from "lucide-react";
import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import { Button } from "@nextui-org/react";
import PredictionInput from "./PredictionInput";
import useCountdown from "@/hooks/useCountdown";

interface PredictionCardProps {
  timeSlot: number;
}

export default function PredictionCard({ timeSlot }: PredictionCardProps) {
  const [isPredictionInputOpen, setIsPredictionInputOpen] = useState(false);
  const { remainingTime, progressPercent, isExpired } = useCountdown(timeSlot);

  return (
    <div
      className={`min-w-[320px] h-[370px] bg-white rounded-2xl shadow-xl ${
        isExpired ? "opacity-50" : ""
      }`}
    >
      {isPredictionInputOpen ? (
        <PredictionInput onClose={() => setIsPredictionInputOpen(false)} />
      ) : (
        <>
          <div className="w-full pt-4 pb-3">
            <div className="px-4 flex justify-between items-center">
              <div
                className={`flex items-center ${
                  isExpired ? "text-gray-500" : "text-primary"
                }`}
              >
                {isExpired ? (
                  <CircleX size={16} className="mr-1" />
                ) : (
                  <CircleDot size={16} className="mr-1" />
                )}
                <p className="text-sm font-bold">
                  {isExpired ? "EXPIRED" : "LIVE"}
                </p>
              </div>
              <div className="flex items-center text-gray-500">
                <Clock size={16} className="mr-1" />
                <p className="text-sm">
                  {isExpired ? "00:00:00" : remainingTime}
                </p>
              </div>
            </div>
          </div>
          <ProgressBar percent={isExpired ? 0 : progressPercent} />
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
          <div className="px-4 space-y-1.5 text-black font-medium mb-5">
            <div className="flex justify-between text-sm">
              <p>Time Slot:</p>
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
          <div className="w-full border-b" />
          <div className="flex justify-center items-center w-full h-[87px] px-5 pb-1">
            <Button
              isDisabled={isExpired}
              fullWidth
              className="bg-black text-white"
              onClick={() => setIsPredictionInputOpen(true)}
            >
              <DicesIcon />
              Place Prediction
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
