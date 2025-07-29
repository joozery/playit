import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import UserTable from "../components/UserTable";
import UserCreateSection from "../components/UserCreateSection";
import UserForm from "../components/UserForm";

export default function Home() {
  const [selectedPackage, setSelectedPackage] = useState(1);
  const [customHours, setCustomHours] = useState("");
  const [form, setForm] = useState({
    name: "",
    age: "",
    phone: "",
    time: "",
  });
  const [editingUser, setEditingUser] = useState(null);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "https://playitnow-app-8b4f356f8fd4.herokuapp.com/api/users"
      );

      const mappedUsers = res.data.map((user) => ({
        id: user.id,
        name: user.name,
        age: user.age,
        phone: user.phone,
        time: user.start_time,
        packageText: `${user.package_hours} ชม`,
        submissionDate: new Date(user.submission_date).toLocaleDateString(),
        expireDate: new Date(user.expire_date).toLocaleDateString(),
        current_status: user.current_status || 'idle',
        total_hours_played: user.total_hours_played || 0,
        package_hours: user.package_hours,
        last_check_in: user.last_check_in,
      }));

      setUsers(mappedUsers);
    } catch (error) {
      toast.error("❌ ไม่สามารถโหลดรายชื่อผู้ใช้งานได้");
    }
  };

  useEffect(() => {
    fetchUsers();
    
    // อัปเดตข้อมูลทุก 30 วินาที
    const interval = setInterval(() => {
      fetchUsers();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("คุณต้องการลบผู้ใช้งานนี้หรือไม่?");
    if (!confirm) return;

    try {
      await axios.delete(
        `https://playitnow-app-8b4f356f8fd4.herokuapp.com/api/users/${id}`
      );
      toast.success("🗑️ ลบผู้ใช้งานเรียบร้อย");
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      toast.error("❌ ไม่สามารถลบผู้ใช้งานได้");
    }
  };

  const handleEdit = (user) => {
    setForm({
      name: user.name,
      age: user.age,
      phone: user.phone,
      time: user.time,
    });
    setEditingUser(user);
    setSelectedPackage(user.package_hours);
    setCustomHours("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const package_hours =
      selectedPackage === "custom"
        ? parseFloat(customHours)
        : selectedPackage;

    if (selectedPackage === "custom" && (!customHours || package_hours <= 0)) {
      toast.error("กรุณากรอกจำนวนชั่วโมงที่ถูกต้อง");
      return;
    }

    if (package_hours > 10) {
      toast.error("ชั่วโมงเล่นไม่สามารถเกิน 10 ชั่วโมงได้");
      return;
    }

    try {
      if (editingUser) {
        await axios.put(
          `https://playitnow-app-8b4f356f8fd4.herokuapp.com/api/users/${editingUser.id}`,
          {
            name: form.name,
            age: form.age,
            phone: form.phone,
            time: form.time,
            package_hours,
          }
        );
        toast.success("✏️ แก้ไขข้อมูลสำเร็จ");
        setEditingUser(null);
        setForm({ name: "", age: "", phone: "", time: "" });
        setSelectedPackage(1);
        setCustomHours("");
        fetchUsers();
      } else {
        const res = await axios.post(
          "https://playitnow-app-8b4f356f8fd4.herokuapp.com/api/users",
          {
            name: form.name,
            age: form.age,
            phone: form.phone,
            time: form.time,
            package_hours,
          }
        );

        toast.success("✅ บันทึกผู้ใช้งานสำเร็จ");

        const newUser = {
          id: res.data.id,
          name: form.name,
          age: form.age,
          phone: form.phone,
          time: form.time,
          packageText: `${package_hours} ชม`,
          submissionDate: new Date().toLocaleDateString("en-US"),
          expireDate: new Date(Date.now() + 30 * 86400000).toLocaleDateString("en-US"),
          current_status: 'idle',
          total_hours_played: 0,
          package_hours: package_hours,
        };

        setUsers((prev) => [newUser, ...prev]);
      }

      setForm({ name: "", age: "", phone: "", time: "" });
      setCustomHours("");
    } catch (err) {
      toast.error("❌ เกิดข้อผิดพลาดในการส่งข้อมูล");
      console.error(err);
    }
  };

  const handleTimeLog = async (user, action) => {
    try {
      const res = await axios.post(
        "https://playitnow-app-8b4f356f8fd4.herokuapp.com/api/time-logs",
        {
          user_id: user.id,
          action: action === 'start' ? 'check_in' : 'check_out'
        }
      );

      const actionText = action === 'start' ? 'เริ่มเวลา' : 'หยุดเวลา';
      toast.success(`✅ ${actionText}เรียบร้อย`);
      
      // อัปเดตสถานะในตารางหลัก
      handleStatusChange(user.id, res.data.status);
      
      // รีเฟรชข้อมูลเพื่ออัปเดตชั่วโมงที่ใช้แล้ว
      fetchUsers();
    } catch (error) {
      toast.error("❌ ไม่สามารถบันทึกเวลาได้");
      console.error("Error logging time:", error);
    }
  };

  const handleStatusChange = (userId, newStatus) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, current_status: newStatus }
        : user
    ));
  };



  return (
    <div className="min-h-screen bg-[url('/bg.jpg')] bg-cover bg-center py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <UserCreateSection
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          selectedPackage={selectedPackage}
          onSelectPackage={setSelectedPackage}
          customHours={customHours}
          onChangeCustomHours={setCustomHours}
        />

        <UserTable 
          users={users} 
          onDelete={handleDelete} 
          onEdit={handleEdit} 
          onTimeLog={handleTimeLog}
        />

        {/* Modal สำหรับแก้ไขผู้ใช้ */}
        {editingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    แก้ไขผู้ใช้งาน
                  </h2>
                  <button
                    onClick={() => {
                      setEditingUser(null);
                      setForm({ name: "", age: "", phone: "", time: "" });
                      setSelectedPackage(1);
                      setCustomHours("");
                    }}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
                <UserForm
                  form={form}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                  selectedPackage={selectedPackage}
                  onSelectPackage={setSelectedPackage}
                  customHours={customHours}
                  onChangeCustomHours={setCustomHours}
                  isEditing={true}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
