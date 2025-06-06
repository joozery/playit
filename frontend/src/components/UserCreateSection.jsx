export default function UserCreateSection({
    form,
    onChange,
    onSubmit,
    selectedPackage,
    onSelectPackage,
    customHours,
    onChangeCustomHours,
  }) {
    return (
      <form
        onSubmit={onSubmit}
        className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 space-y-6"
      >
        {/* Input Fields in 1 row (4 columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">ชื่อ</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="กรอกชื่อ"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">อายุ</label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={onChange}
              placeholder="เช่น 25"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">เบอร์โทร</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={onChange}
              placeholder="08xxxxxxxx"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">เวลาเริ่ม</label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={onChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
  
        {/* Package Selector */}
        <div className="text-center">
          <h3 className="text-md font-semibold text-blue-600 mb-3">เลือกแพ็กเกจ</h3>
          <div className="flex justify-center gap-4 flex-wrap">
            {[1, 5, 10, 20].map((hr) => (
              <button
                key={hr}
                type="button"
                onClick={() => onSelectPackage(hr)}
                className={`min-w-[100px] px-4 py-2 rounded-xl font-medium border text-sm transition-all duration-200
                  ${selectedPackage === hr
                    ? "bg-blue-100 text-blue-700 border-blue-500 shadow-md"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
              >
                {hr} ชั่วโมง
              </button>
            ))}
  
            {/* ✅ ปุ่ม "จัดการเวลาเอง" */}
            <button
              type="button"
              onClick={() => onSelectPackage("custom")}
              className={`min-w-[140px] px-4 py-2 rounded-xl font-medium border text-sm transition-all duration-200
                ${selectedPackage === "custom"
                  ? "bg-blue-100 text-blue-700 border-blue-500 shadow-md"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
            >
              จัดการเวลาเอง
            </button>
          </div>
  
          {/* ✅ กรอกจำนวนชั่วโมงเอง */}
          {selectedPackage === "custom" && (
            <div className="mt-4">
              <input
                type="number"
                min="1"
                placeholder="กรอกจำนวนชั่วโมง"
                value={customHours}
                onChange={(e) => onChangeCustomHours(e.target.value)}
                className="w-48 mx-auto border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}
        </div>
  
        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white text-lg rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            เริ่มกิจกรรม
          </button>
        </div>
      </form>
    );
  }
  