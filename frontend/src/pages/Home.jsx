import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import UserTable from "../components/UserTable";
import UserCreateSection from "../components/UserCreateSection";

export default function Home() {
  const [selectedPackage, setSelectedPackage] = useState(1);
  const [customHours, setCustomHours] = useState("");
  const [form, setForm] = useState({
    name: "",
    age: "",
    phone: "",
    time: "",
  });

  const [users, setUsers] = useState([]);

  // ✅ โหลดผู้ใช้งาน
  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "https://server-playitnow-f6febaec63f7.herokuapp.com/api/users"
      );

      const mappedUsers = res.data.map((user) => ({
        id: user.id,
        name: user.name,
        age: user.age,
        phone: user.phone,
        time: user.start_time,
        packageText: `${user.package_type} ${user.package_hours} ชม`,
        submissionDate: new Date(user.submission_date).toLocaleDateString(),
        expireDate: new Date(user.expire_date).toLocaleDateString(),
      }));

      setUsers(mappedUsers);
    } catch (error) {
      toast.error("❌ ไม่สามารถโหลดรายชื่อผู้ใช้งานได้");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ ลบผู้ใช้งาน
  const handleDelete = async (id) => {
    const confirm = window.confirm("คุณต้องการลบผู้ใช้งานนี้หรือไม่?");
    if (!confirm) return;

    try {
      await axios.delete(
        `https://server-playitnow-f6febaec63f7.herokuapp.com/api/users/${id}`
      );
      toast.success("🗑️ ลบผู้ใช้งานเรียบร้อย");
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      toast.error("❌ ไม่สามารถลบผู้ใช้งานได้");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const package_type =
      selectedPackage === "custom" ? "จัดการเอง" : `V.${selectedPackage} ชม`;
    const package_hours =
      selectedPackage === "custom"
        ? parseFloat(customHours)
        : selectedPackage;

    if (selectedPackage === "custom" && (!customHours || package_hours <= 0)) {
      toast.error("กรุณากรอกจำนวนชั่วโมงที่ถูกต้อง");
      return;
    }

    try {
      const res = await axios.post(
        "https://server-playitnow-f6febaec63f7.herokuapp.com/api/users",
        {
          name: form.name,
          age: form.age,
          phone: form.phone,
          time: form.time,
          package_type,
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
        packageText: `${package_type} ${package_hours} ชม`,
        submissionDate: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        expireDate: new Date(Date.now() + 30 * 86400000).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
      };

      setUsers((prev) => [newUser, ...prev]);
      setForm({ name: "", age: "", phone: "", time: "" });
      setCustomHours("");
    } catch (err) {
      toast.error("❌ เกิดข้อผิดพลาดในการส่งข้อมูล");
      console.error(err);
    }
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

        <UserTable users={users} onDelete={handleDelete} />
      </div>
    </div>
  );
}
