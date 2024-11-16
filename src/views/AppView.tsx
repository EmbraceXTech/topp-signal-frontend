import PredictionCard from "@/components/PredictionCard/PredictionCard";
import { useTimeSlot } from "@/hooks/useTimeSlot";
import React from "react";

export default function AppView() {
  const { timeSlotsData, latestPrice } = useTimeSlot();

  return (
    <div className="w-full h-[500px] flex justify-center pt-10 space-x-10 overflow-x-scroll px-10 pl-[850px]">
      {timeSlotsData.map((item, index) => {
        const change =
          index === 0
            ? 0
            : item.price === 0
            ? 0
            : item.price - (timeSlotsData[index - 1]?.price || 0);

        return (
          <PredictionCard
            key={item.timeSlot}
            timeSlot={item.timeSlot}
            price={item.price || latestPrice.price}
            averagePrice={item.averagePrice || latestPrice.averagePrice}
            priceChange={change}
          />
        );
      })}
    </div>
  );
}
