import { useEffect, useState } from "react";
import { FiSearch, FiPlay, FiSquare } from "react-icons/fi"; // ✅ เพิ่มไอคอน
import RealTimeStatus from "./RealTimeStatus";

export default function UserTable({ users, onEdit, onDelete, onTimeLog }) {
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users || []);

  useEffect(() => {
    if (!search) return setFilteredUsers(users);
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [search, users]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-gray-800">รายชื่อผู้ใช้งานแพ็กเกจ</h2>
        <div className="relative w-full sm:w-64">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="ค้นหาชื่อ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3">ชื่อ</th>
              <th className="px-4 py-3">อายุ</th>
              <th className="px-4 py-3">เวลาเริ่ม</th>
              <th className="px-4 py-3">เบอร์โทร</th>
              <th className="px-4 py-3">แพ็กเกจ</th>
              <th className="px-4 py-3">สถานะ</th>
              <th className="px-4 py-3">บันทึกเมื่อ</th>
              <th className="px-4 py-3">หมดอายุ</th>
              <th className="px-4 py-3 text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border-t hover:bg-blue-50 transition-colors">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.age}</td>
                  <td className="px-4 py-2">{user.time}</td>
                  <td className="px-4 py-2">{user.phone}</td>
                  <td className="px-4 py-2">{user.packageText}</td>
                  <td className="px-4 py-2">
                    <RealTimeStatus user={user} />
                  </td>

                  <td className="px-4 py-2">{user.submissionDate}</td>
                  <td className="px-4 py-2">{user.expireDate}</td>
                  <td className="px-4 py-2 text-center flex gap-2 justify-center">
                    <button
                      onClick={() => onTimeLog(user, 'start')}
                      disabled={user.current_status === 'playing'}
                      className={`text-sm flex items-center gap-1 px-3 py-1 rounded-lg font-medium transition-colors ${
                        user.current_status === 'playing'
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                      title="เริ่มเวลา"
                    >
                      <FiPlay className="w-3 h-3" />
                      Start
                    </button>
                    <button
                      onClick={() => onTimeLog(user, 'stop')}
                      disabled={user.current_status === 'idle'}
                      className={`text-sm flex items-center gap-1 px-3 py-1 rounded-lg font-medium transition-colors ${
                        user.current_status === 'idle'
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                      title="หยุดเวลา"
                    >
                      <FiSquare className="w-3 h-3" />
                      Stop
                    </button>
                    <button
                      onClick={() => onEdit(user)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      แก้ไข
                    </button>
                    <button
                      onClick={() => onDelete(user.id)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-gray-500 py-8 font-medium">
                  ไม่มีข้อมูลผู้ใช้งาน
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
