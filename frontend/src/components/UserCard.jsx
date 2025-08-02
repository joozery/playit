import { FiPlay, FiSquare, FiEdit, FiTrash2, FiPhone, FiClock, FiUser, FiCalendar } from "react-icons/fi";
import RealTimeStatus from "./RealTimeStatus";

export default function UserCard({ user, onEdit, onDelete, onTimeLog }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <FiUser className="text-blue-600 text-lg" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">{user.name}</h3>
            <p className="text-sm text-gray-500">อายุ {user.age} ปี</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-blue-600">{user.packageText}</div>
          <div className="text-xs text-gray-500">แพ็กเกจ</div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <FiPhone className="text-gray-400" />
        <span>{user.phone}</span>
      </div>

      {/* Time Info */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <FiClock className="text-gray-400" />
        <span>เวลาเริ่ม: {user.time}</span>
      </div>

      {/* Real-time Status */}
      <div className="border-t pt-3">
        <RealTimeStatus user={user} />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 pt-3 border-t">
        <button
          onClick={() => onTimeLog(user, 'start')}
          disabled={user.current_status === 'playing'}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
            user.current_status === 'playing'
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
          title="เริ่มเวลา"
        >
          <FiPlay className="w-4 h-4" />
          <span className="hidden sm:inline">Start</span>
        </button>
        
        <button
          onClick={() => onTimeLog(user, 'stop')}
          disabled={user.current_status === 'idle'}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
            user.current_status === 'idle'
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
          title="หยุดเวลา"
        >
          <FiSquare className="w-4 h-4" />
          <span className="hidden sm:inline">Stop</span>
        </button>
        
        <button
          onClick={() => onEdit(user)}
          className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-medium text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
          title="แก้ไข"
        >
          <FiEdit className="w-4 h-4" />
          <span className="hidden sm:inline">แก้ไข</span>
        </button>
        
        <button
          onClick={() => onDelete(user.id)}
          className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-medium text-sm bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
          title="ลบ"
        >
          <FiTrash2 className="w-4 h-4" />
          <span className="hidden sm:inline">ลบ</span>
        </button>
      </div>

      {/* Date Info */}
      <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
        <div className="flex items-center gap-1">
          <FiCalendar className="text-gray-400" />
          <span>บันทึก: {user.submissionDate}</span>
        </div>
        <div className="flex items-center gap-1">
          <FiCalendar className="text-gray-400" />
          <span>หมดอายุ: {user.expireDate}</span>
        </div>
      </div>
    </div>
  );
} 