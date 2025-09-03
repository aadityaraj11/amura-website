import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Register from "./pages/Register";
import Certificates from "./pages/Certificates";
import Achievements from "./pages/Achievements";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AdminAuth from "./pages/AdminAuth";
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const queryClient = new QueryClient();

/** 🔒 Protect Admin Routes */
const ProtectedAdmin = ({ children }: { children: JSX.Element }) => {
  const [user, loading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkClaim = async () => {
      if (user) {
        const token = await user.getIdTokenResult(true);
        if (token.claims.admin) setIsAdmin(true);
      }
    };
    checkClaim();
  }, [user]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!user) return <Navigate to="/admin" replace />;
  if (!isAdmin) return <p className="text-center mt-10 text-red-500">❌ Not authorized</p>;

  return children;
};

const App = () => {
  const [isDark, setIsDark] = useState(false);

  // Theme preference
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(saved ? saved === "dark" : prefersDark);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors w-full">
            <Navbar isDark={isDark} toggleTheme={toggleTheme} />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/register" element={<Register />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />

              {/* Admin Auth & Dashboard */}
              <Route path="/admin" element={<AdminAuth />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedAdmin>
                    <Dashboard />
                  </ProtectedAdmin>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
