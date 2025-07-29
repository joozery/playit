import { useState, useEffect } from "react";

export default function LiveTimer({ startTime, isPlaying }) {
  const [currentTime, setCurrentTime] = useState("00:00:00");

  useEffect(() => {
    if (!isPlaying || !startTime) {
      setCurrentTime("00:00:00");
      return;
    }

    const updateTimer = () => {
      const start = new Date(startTime);
      const now = new Date();
      const diff = now - start;
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setCurrentTime(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    };

    // อัปเดตทันที
    updateTimer();
    
    // อัปเดตทุกวินาที
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [startTime, isPlaying]);

  if (!isPlaying) {
    return null;
  }

  return (
    <div className="text-sm text-red-600 font-mono font-bold">
      ⏱️ {currentTime}
    </div>
  );
} 