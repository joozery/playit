import { useState } from "react";
import toast from "react-hot-toast"; // ✅ import toast
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let packageText = "";

    if (selectedPackage === "custom") {
      if (!customHours || parseInt(customHours) <= 0) {
        toast.error("กรุณากรอกจำนวนชั่วโมงที่ถูกต้อง");
        return;
      }
      packageText = `จัดการเอง ${customHours} ชม`;
    } else {
      packageText = `V.${selectedPackage} ชม`;
    }

    const newUser = {
      id: Date.now(),
      name: form.name,
      age: form.age,
      phone: form.phone,
      time: form.time,
      packageText,
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

    setUsers([newUser, ...users]);
    setForm({ name: "", age: "", phone: "", time: "" });
    setCustomHours("");

    toast.success("🎉 บันทึกผู้ใช้งานสำเร็จ!");
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

        <UserTable users={users} />
      </div>
    </div>
  );
}
