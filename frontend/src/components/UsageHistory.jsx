export default function UsageHistory({ sessions }) {
    if (!sessions || sessions.length === 0) {
      return <p className="text-center text-gray-500">ยังไม่มีประวัติการใช้งาน</p>;
    }
  
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left bg-white rounded-xl shadow">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-2 text-center">เวลาเริ่ม</th>
              <th className="px-4 py-2 text-center">เวลาสิ้นสุด</th>
              <th className="px-4 py-2 text-center">ใช้เวลา (นาที)</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((s) => (
              <tr key={s.id} className="border-t text-center">
                <td className="px-4 py-2">{formatDatetime(s.start_time)}</td>
                <td className="px-4 py-2">{formatDatetime(s.end_time)}</td>
                <td className="px-4 py-2">{s.duration_minutes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  function formatDatetime(dateStr) {
    const date = new Date(dateStr);
    const thYear = date.getFullYear() + 543;
    const formatted =
      date.toLocaleDateString("th-TH", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }) +
      " " +
      date.toLocaleTimeString("th-TH", {
        hour: "2-digit",
        minute: "2-digit",
      });
    return formatted.replace(`${date.getFullYear()}`, `${thYear}`);
  }
  