export default function UserForm({ 
  form, 
  onChange, 
  onSubmit, 
  selectedPackage, 
  onSelectPackage, 
  customHours, 
  onChangeCustomHours,
  isEditing = false 
}) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-lg font-bold text-blue-700 mb-4 text-center">
          {isEditing ? 'แก้ไขผู้ใช้งาน' : 'เพิ่มผู้ใช้งาน'}
        </h2>
  
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="ชื่อ"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={onChange}
            placeholder="อายุ"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={onChange}
            placeholder="เบอร์โทร"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={onChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />

          {/* ชั่วโมงแพคเกจ */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">ชั่วโมงแพคเกจ</label>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((hr) => (
                <button
                  key={hr}
                  type="button"
                  onClick={() => onSelectPackage(hr)}
                  className={`px-3 py-2 rounded-lg font-medium border text-sm transition-all duration-200
                    ${selectedPackage === hr
                      ? "bg-blue-100 text-blue-700 border-blue-500 shadow-md"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
                >
                  {hr} ชม
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="0.5"
                step="0.5"
                placeholder="กรอกชั่วโมงเอง"
                value={customHours}
                onChange={(e) => onChangeCustomHours(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <span className="text-gray-600">ชั่วโมง</span>
              {customHours && (
                <button
                  type="button"
                  onClick={() => onSelectPackage("custom")}
                  className={`px-4 py-2 rounded-lg font-medium border text-sm transition-all duration-200
                    ${selectedPackage === "custom"
                      ? "bg-blue-100 text-blue-700 border-blue-500 shadow-md"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
                >
                  ใช้ชั่วโมงนี้
                </button>
              )}
            </div>
          </div>
  
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            {isEditing ? 'อัปเดต' : 'บันทึก'}
          </button>
        </form>
      </div>
    );
  }
  