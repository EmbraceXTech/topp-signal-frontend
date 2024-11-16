import { Button, Input } from "@nextui-org/react";
import { ArrowLeft, DicesIcon } from "lucide-react";
import React from "react";

export default function PredictionInput({ onClose }: { onClose: () => void }) {
  return (
    <div className="w-full h-full">
      <div className="flex items-center px-4 pt-4 relative">
        <ArrowLeft
          size={18}
          onClick={onClose}
          className="cursor-pointer hover:opacity-80"
        />
        <p className="font-medium absolute left-1/2 -translate-x-1/2">
          Place a Prediction
        </p>
      </div>
      <div className="w-full border-b mt-3" />
      <div className="w-full h-[235px] p-4">
        <div className="flex items-center space-x-3">
          <Input
            required
            type="number"
            label="Price"
            placeholder="Enter your price"
          />
          <Button className="h-[55px]" color="primary" variant="flat">
            <DicesIcon className="text-primary" />
          </Button>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs px-1 mt-5">
            <p>Balance:</p>
            <p>50.12 KUB</p>
          </div>
          <Input
            required
            type="number"
            label="Ticket"
            placeholder="Enter your ticket amount"
          />
        </div>
      </div>
      <div className="w-full border-b" />
      <div className="flex justify-center items-center w-full h-[87px] px-5">
        <Button fullWidth className="bg-black text-white">
          <DicesIcon />
          Place Prediction (0.1 KUB)
        </Button>
      </div>
    </div>
  );
}
