import PredictionTable from "@/components/Prediction/PredictionTable";
import React from "react";

export default function PredictionView() {
  return (
    <div className="w-full h-full flex justify-start items-start p-10 flex-col">
      <p className="text-2xl font-bold mb-4">Current Prediction</p>
      <PredictionTable isWrapper={true} />
    </div>
  );
}
