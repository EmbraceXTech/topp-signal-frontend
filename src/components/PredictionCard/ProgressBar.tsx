import React from "react";

interface ProgressBarProps {
  percent: number;
}

export default function ProgressBar({ percent }: ProgressBarProps) {
  return (
    <div className="w-full h-[8px] bg-gray-200">
      <div
        className="h-full bg-primary rounded-r"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
}
