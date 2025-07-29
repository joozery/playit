import { useState, useEffect } from "react";
import LiveTimer from "./LiveTimer";

export default function RealTimeStatus({ user }) {
  const [isPlaying, setIsPlaying] = useState(user.current_status === 'playing');
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    setIsPlaying(user.current_status === 'playing');
  }, [user.current_status]);

  useEffect(() => {
    if (!isPlaying || !user.last_check_in) {
      setElapsedTime(0);
      return;
    }

    const updateElapsedTime = () => {
      const start = new Date(user.last_check_in);
      const now = new Date();
      const diff = now - start;
      setElapsedTime(diff);
    };

    updateElapsedTime();
    const interval = setInterval(updateElapsedTime, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, user.last_check_in]);

  const formatTime = (ms) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getStatusColor = () => {
    if (isPlaying) {
      return {
        bg: 'bg-green-100',
        text: 'text-green-700',
        border: 'border-green-300',
        dot: 'bg-green-500'
      };
    }
    return {
      bg: 'bg-gray-100',
      text: 'text-gray-700',
      border: 'border-gray-300',
      dot: 'bg-gray-500'
    };
  };

  const colors = getStatusColor();

  return (
    <div className="space-y-2">
      {/* สถานะ */}
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
        <div className={`w-2 h-2 rounded-full ${colors.dot} animate-pulse`}></div>
        <span className="text-xs font-medium">
          {isPlaying ? 'กำลังเล่น' : 'ไม่ได้เล่น'}
        </span>
      </div>

      {/* Timer Real-time */}
      {isPlaying && user.last_check_in && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-2">
          <div className="text-center">
            <div className="text-xs text-red-600 font-medium mb-1">เวลาเล่นปัจจุบัน</div>
            <div className="text-sm text-red-700 font-mono font-bold">
              ⏱️ {formatTime(elapsedTime)}
            </div>
          </div>
        </div>
      )}

      {/* สรุปชั่วโมง */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-blue-50 p-2 rounded">
          <div className="text-blue-600 font-medium">ใช้แล้ว</div>
          <div className="text-blue-800 font-bold">{user.total_hours_played || 0} ชม</div>
        </div>
        <div className="bg-green-50 p-2 rounded">
          <div className="text-green-600 font-medium">คงเหลือ</div>
          <div className="text-green-800 font-bold">
            {Math.max(0, (user.package_hours || 0) - (user.total_hours_played || 0))} ชม
          </div>
        </div>
      </div>
    </div>
  );
} 