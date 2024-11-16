import {
  ArrowDown,
  ArrowUp,
  CircleDot,
  CircleX,
  Clock,
  DicesIcon,
} from "lucide-react";
import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import { Button } from "@nextui-org/react";
import PredictionInput from "./PredictionInput";
import useCountdown from "@/hooks/useCountdown";

interface PredictionCardProps {
  timeSlot: number;
  price: number;
  priceChange: number;
  averagePrice: number;
}

export default function PredictionCard({
  timeSlot,
  price,
  priceChange,
  averagePrice,
}: PredictionCardProps) {
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
              <p className="font-bold text-green-400 text-2xl">
                ฿{price.toFixed(4)}
              </p>
              {priceChange !== 0 && (
                <div
                  className={`flex items-center rounded-full px-2 py-1 text-white ${
                    priceChange > 0 ? "bg-green-400" : "bg-red-400"
                  }`}
                >
                  {priceChange > 0 ? (
                    <ArrowUp size={18} />
                  ) : (
                    <ArrowDown size={18} />
                  )}
                  <p className="text-sm ml-0.5">฿{priceChange.toFixed(4)}</p>
                </div>
              )}
            </div>
          </div>
          <div className="px-4 space-y-1.5 text-black font-medium mb-5">
            <div className="flex justify-between text-sm">
              <p>Time Slot:</p>
              <p>{new Date(timeSlot).toLocaleTimeString()}</p>
            </div>
            <div className="flex justify-between text-sm">
              <p>Average Price:</p>
              <p>฿{averagePrice.toFixed(4)}</p>
            </div>
            <div className="flex justify-between font-bold">
              <p>Prize Pool:</p>
              <p>0 KUB</p>
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
