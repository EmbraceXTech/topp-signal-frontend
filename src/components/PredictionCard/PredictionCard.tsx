import { CircleDot, Clock } from "lucide-react";
import React from "react";
import ProgressBar from "./ProgressBar";

export default function PredictionCard() {
  return (
    <div className="w-[320px] h-[370px] bg-white rounded-2xl shadow-xl">
      <div className="w-full pt-3 pb-2">
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
    </div>
  );
}
