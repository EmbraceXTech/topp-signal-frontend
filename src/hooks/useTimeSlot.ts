import axios from "axios";
import { useEffect, useState, useCallback } from "react";

export const useTimeSlot = () => {
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

  const [latestPrice, setLatestPrice] = useState({
    price: 0,
    averagePrice: 0,
  });

  const [timeSlotsData, setTimeSlotsData] = useState<
    {
      timeSlot: number;
      price: number;
      averagePrice: number;
    }[]
  >(
    Array.from({ length: timeSlotCount }, (_, index) => ({
      timeSlot:
        startTime - index * timeFrame * 60 * 1000 + timeZone * 60 * 60 * 1000,
      price: 0,
      averagePrice: 0,
    })).reverse()
  );

  const endTime = timeSlotsData[timeSlotsData.length - 1].timeSlot;

  const fetchKUBPrice = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `https://api.bitkub.com/tradingview/history?symbol=KUB_THB&resolution=15&from=${
          startTime / 1000
        }&to=${endTime / 1000}`
      );
      setTimeSlotsData((prevTimeSlotsData) =>
        prevTimeSlotsData.map((item, index) => {
          const p = data.t.find((t: number) => t === item.timeSlot / 1000);
          if (p) {
            setLatestPrice({
              price: data.c[index],
              averagePrice: data.o[index],
            });
          }
          return {
            timeSlot: item.timeSlot,
            price: p ? data.c[index] : 0,
            averagePrice: p ? data.o[index] : 0,
          };
        })
      );
    } catch (error) {
      console.error(error);
    }
  }, [startTime, endTime]);

  useEffect(() => {
    fetchKUBPrice();
  }, [fetchKUBPrice]);

  return { timeSlotsData, endTime, fetchKUBPrice, latestPrice };
};
