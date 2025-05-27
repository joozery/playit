export default function UserForm({ form, onChange, onSubmit }) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-lg font-bold text-blue-700 mb-4 text-center">เพิ่มผู้ใช้งาน</h2>
  
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
  
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            บันทึก
          </button>
        </form>
      </div>
    );
  }
  