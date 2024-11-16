import { Modal, ModalContent, Card } from "@nextui-org/react";
import React from "react";

type PrizeDistributionModalProps = {
  isOpen: boolean;
  onOpenChange: () => void;
};

export default function PrizeDistributionModal({
  isOpen,
  onOpenChange,
}: PrizeDistributionModalProps) {
  return (
    <Modal
      size="4xl"
      className="h-[500px]"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent className="p-0">
        <div className="h-full w-full flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Prize Distribution</h2>
          <p className="mb-8">
            ToppSignal offers a really simple prize with everything included.
          </p>
          <div className="flex justify-center space-x-5">
            {/* Proximity Prize */}
            <div className="w-full">
              <Card
                isHoverable
                className="w-[200px] h-[300px] flex flex-col justify-center items-center"
              >
                <div className="text-center p-4">
                  <div className="text-4xl mb-2">👑</div>
                  <h3 className="text-xl font-semibold">Proximity Prize</h3>
                  <p>Up to 3 winners</p>
                  <p className="text-green-500 text-lg mt-2">Total Prize</p>
                  <h2 className="text-2xl font-bold">0.3 KUB</h2>
                </div>
              </Card>
            </div>
            {/* Exact Prize */}
            <div className="w-full">
              <Card
                isHoverable
                className="w-[200px] h-[300px] flex flex-col justify-center items-center"
              >
                <div className="text-center p-4">
                  <div className="text-4xl mb-2">👑</div>
                  <h3 className="text-xl font-semibold">Exact Prize</h3>
                  <p>1 winner</p>
                  <p className="text-green-500 text-lg mt-2">Total Prize</p>
                  <h2 className="text-2xl font-bold">1 KUB</h2>
                  <p className="text-red-500 text-sm">BONUS 20%</p>
                </div>
              </Card>
            </div>
            {/* Fortune Prize */}
            <div className="w-full">
              <Card
                isHoverable
                className="w-[200px] h-[300px] flex flex-col justify-center items-center"
              >
                <div className="text-center p-4">
                  <div className="text-4xl mb-2">👑</div>
                  <h3 className="text-xl font-semibold">Fortune Prize</h3>
                  <p>Up to 3 winners</p>
                  <p className="text-green-500 text-lg mt-2">Total Prize</p>
                  <h2 className="text-2xl font-bold">0.3 KUB</h2>
                </div>
              </Card>
            </div>
          </div>
          {/* <p className="mt-8 text-gray-500">🕒 Settlement in 0h : 23m : 49s</p> */}
        </div>
      </ModalContent>
    </Modal>
  );
}
