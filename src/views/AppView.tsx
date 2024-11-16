import PredictionCard from "@/components/PredictionCard/PredictionCard";
import React from "react";

export default function AppView() {
  const timeZone = Math.abs(new Date().getTimezoneOffset() / 60);
  const timeFrame = 15; // minutes
  const timeOffset = 4; // hours
  const timeSlotCount = 5;

  const startTime =
    Math.round(
      (Date.now() - (2.5 + timeOffset) * 60 * 60 * 1000) /
        (timeFrame * 60 * 1000)
    ) *
    timeFrame *
    60 *
    1000;

  const timeSlotsData = Array.from({ length: timeSlotCount }, (_, index) => ({
    timeSlot:
      startTime - index * timeFrame * 60 * 1000 + timeZone * 60 * 60 * 1000,
  })).reverse();

  const endTime = timeSlotsData[timeSlotsData.length - 1].timeSlot;

  return (
    <div className="w-full h-[500px] flex justify-center pt-10 space-x-10 overflow-x-scroll px-10">
      {timeSlotsData.map((item) => (
        <PredictionCard key={item.timeSlot} timeSlot={item.timeSlot} />
      ))}
    </div>
  );
}
