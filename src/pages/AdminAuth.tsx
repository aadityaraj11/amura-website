import { useState } from "react";
import { auth } from "@/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const AdminAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Register new admin
  const registerAdmin = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      alert(`✅ Admin created. UID: ${user.user.uid} 
Now run mark-admin.js to set admin claim.`);
    } catch (err: any) {
      alert("❌ " + err.message);
    }
  };

  // Login existing admin
  const loginAdmin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // ✅ redirect to dashboard after login
      navigate("/dashboard");
    } catch (err: any) {
      alert("❌ " + err.message);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Portal</h1>
      <Input
        type="email"
        placeholder="Admin Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-2"
      />
      <Input
        type="password"
        placeholder="Admin Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4"
      />
      <div className="flex gap-2">
        <Button onClick={registerAdmin}>Register Admin</Button>
        <Button onClick={loginAdmin} variant="secondary">Login Admin</Button>
      </div>
    </div>
  );
};

export default AdminAuth;
