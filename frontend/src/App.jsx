import Home from "./pages/Home";
import { Toaster } from "react-hot-toast"; // ✅ เพิ่ม Toaster

export default function App() {
  return (
    <>
      <Home />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
