import { useState, useEffect } from "react";

function useCountdown(timeSlot: number) {
  const [remainingTime, setRemainingTime] = useState("00:00:00");
  const [progressPercent, setProgressPercent] = useState(0);
  const isExpired = timeSlot <= Date.now();

  useEffect(() => {
    if (isExpired) return;

    const totalDuration = timeSlot - Date.now();
    const startTime = Date.now();

    const interval = setInterval(() => {
      const now = Date.now();
      const distance = timeSlot - now;

      if (distance <= 0) {
        clearInterval(interval);
        setRemainingTime("00:00:00");
        setProgressPercent(100);
      } else {
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setRemainingTime(
          `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );

        const elapsedTime = now - startTime;
        const percent = (elapsedTime / totalDuration) * 100;
        setProgressPercent(percent);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeSlot, isExpired]);

  return { remainingTime, progressPercent, isExpired };
}

export default useCountdown;
