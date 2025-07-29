import { useState, useEffect } from "react";
import { FiClock, FiPlay, FiSquare, FiHistory } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";

export default function TimeLogSection({ user, onStatusChange }) {
  const [timeLogs, setTimeLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const fetchTimeLogs = async () => {
    try {
      const res = await axios.get(
        `https://playitnow-app-8b4f356f8fd4.herokuapp.com/api/time-logs/${user.id}`
      );
      setTimeLogs(res.data);
    } catch (error) {
      console.error("Error fetching time logs:", error);
    }
  };

  useEffect(() => {
    if (user.id) {
      fetchTimeLogs();
    }
  }, [user.id]);

  const handleTimeLog = async (action) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://playitnow-app-8b4f356f8fd4.herokuapp.com/api/time-logs",
        {
          user_id: user.id,
          action: action
        }
      );

      const actionText = action === 'check_in' ? 'เข้าเล่น' : 'ออกจากเกม';
      toast.success(`✅ บันทึกเวลา${actionText}เรียบร้อย`);
      
      // อัปเดตสถานะในตารางหลัก
      if (onStatusChange) {
        onStatusChange(user.id, res.data.status);
      }
      
      // รีเฟรชประวัติเวลา
      fetchTimeLogs();
    } catch (error) {
      toast.error("❌ ไม่สามารถบันทึกเวลาได้");
      console.error("Error logging time:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString('th-TH', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateSessionDuration = (checkInTime, checkOutTime) => {
    const start = new Date(checkInTime);
    const end = new Date(checkOutTime);
    const diffMs = end - start;
    const diffMins = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMins / 60);
    const minutes = diffMins % 60;
    return `${hours}ชม ${minutes}นาที`;
  };

  const getCurrentSession = () => {
    if (timeLogs.length === 0) return null;
    
    const lastLog = timeLogs[0];
    if (lastLog.action === 'check_in') {
      const startTime = new Date(lastLog.timestamp);
      const now = new Date();
      const diffMs = now - startTime;
      const diffMins = Math.floor(diffMs / 60000);
      const hours = Math.floor(diffMins / 60);
      const minutes = diffMins % 60;
      return `${hours}ชม ${minutes}นาที`;
    }
    return null;
  };

  const currentSession = getCurrentSession();

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <FiClock className="text-blue-600" />
          บันทึกเวลาเข้าออก
        </h3>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
        >
          <FiHistory />
          {showHistory ? 'ซ่อนประวัติ' : 'ดูประวัติ'}
        </button>
      </div>

      {/* สถานะปัจจุบัน */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">สถานะปัจจุบัน:</span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            user.current_status === 'playing' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-gray-100 text-gray-700'
          }`}>
            {user.current_status === 'playing' ? 'กำลังเล่น' : 'ไม่ได้เล่น'}
          </span>
        </div>
        
        {user.current_status === 'playing' && currentSession && (
          <div className="mt-2 text-sm text-gray-600">
            เวลาเล่นปัจจุบัน: <span className="font-medium text-blue-600">{currentSession}</span>
          </div>
        )}
      </div>

      {/* ปุ่มบันทึกเวลา */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => handleTimeLog('check_in')}
          disabled={isLoading || user.current_status === 'playing'}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-colors ${
            user.current_status === 'playing'
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          <FiPlay />
          เข้าเล่น
        </button>
        
        <button
          onClick={() => handleTimeLog('check_out')}
          disabled={isLoading || user.current_status === 'idle'}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-colors ${
            user.current_status === 'idle'
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          <FiSquare />
          ออกจากเกม
        </button>
      </div>

      {/* สรุปการใช้งาน */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="text-sm text-blue-600">ชั่วโมงที่ใช้แล้ว</div>
          <div className="text-lg font-semibold text-blue-800">
            {user.total_hours_played || 0} ชม
          </div>
        </div>
        <div className="bg-orange-50 p-3 rounded-lg">
          <div className="text-sm text-orange-600">ชั่วโมงทั้งหมด</div>
          <div className="text-lg font-semibold text-orange-800">
            {user.package_hours} ชม
          </div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="text-sm text-green-600">ชั่วโมงคงเหลือ</div>
          <div className="text-lg font-semibold text-green-800">
            {Math.max(0, (user.package_hours || 0) - (user.total_hours_played || 0))} ชม
          </div>
        </div>
      </div>

      {/* ประวัติการใช้งาน */}
      {showHistory && (
        <div className="border-t pt-4">
          <h4 className="text-md font-medium text-gray-700 mb-3">ประวัติการใช้งาน</h4>
          <div className="max-h-60 overflow-y-auto">
            {timeLogs.length > 0 ? (
              <div className="space-y-2">
                {timeLogs.map((log, index) => {
                  const nextLog = timeLogs[index + 1];
                  const isCheckOut = log.action === 'check_out';
                  const hasNextCheckIn = nextLog && nextLog.action === 'check_in';
                  
                  return (
                    <div key={log.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          log.action === 'check_in' ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                        <div>
                          <div className="text-sm font-medium">
                            {log.action === 'check_in' ? 'เข้าเล่น' : 'ออกจากเกม'}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatTime(log.timestamp)}
                          </div>
                        </div>
                      </div>
                      
                      {isCheckOut && hasNextCheckIn && (
                        <div className="text-xs text-blue-600 font-medium">
                          {calculateSessionDuration(nextLog.timestamp, log.timestamp)}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-4">
                ยังไม่มีประวัติการใช้งาน
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 