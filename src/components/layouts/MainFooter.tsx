import React, { useState } from "react";
import PredictionTab from "../Prediction/PredictionTab";
import HistoryTab from "../History/HistoryTab";

export default function MainFooter() {
  const tabs = ["Prediction", "History"];
  const [activeTab, setActiveTab] = useState("Prediction");

  return (
    <div className="bg-white w-full h-[500px] relative">
      <div className="absolute -top-10 left-10 flex">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-2xl rounded-b-none font-medium w-[140px] ${
              activeTab === tab ? "bg-white z-10" : "bg-gray-200 z-0"
            } ${i !== 0 ? "-ml-[15px]" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="px-10 py-5">
        {activeTab === "Prediction" ? <PredictionTab /> : <HistoryTab />}
      </div>
    </div>
  );
}
