import { useState, useEffect } from "react";
import { useNavigate, Routes, Route, Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { 
  LayoutDashboard, 
  Car, 
  DollarSign, 
  Users, 
  Shield, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { AdminOverview } from "./admin/AdminOverview";
import { DispatchVehicles } from "./admin/DispatchVehicles";
import { RevenueReporting } from "./admin/RevenueReporting";
import { CRMModule } from "./admin/CRMModule";
import { SafetyModule } from "./admin/SafetyModule";

export function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminUsername, setAdminUsername] = useState("");

  useEffect(() => {
    // Check authentication
    const isAuth = localStorage.getItem("adminAuth");
    const username = localStorage.getItem("adminUsername");
    
    if (!isAuth) {
      navigate("/admin/login");
      return;
    }
    
    setAdminUsername(username || "Admin");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("adminUsername");
    navigate("/admin/login");
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/admin/dashboard" },
    { icon: Car, label: "Dispatch & Vehicles", path: "/admin/dashboard/dispatch" },
    { icon: DollarSign, label: "Revenue Reports", path: "/admin/dashboard/revenue" },
    { icon: Users, label: "CRM", path: "/admin/dashboard/crm" },
    { icon: Shield, label: "Safety Module", path: "/admin/dashboard/safety" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside 
        className={`bg-slate-900 text-white transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-0 lg:w-20"
        } overflow-hidden`}
      >
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-blue-400" />
              <span className="font-bold text-xl">Admin Portal</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-slate-800 lg:hidden"
          >
            {sidebarOpen ? <X /> : <Menu />}
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? "bg-blue-600 text-white" 
                    : "text-gray-300 hover:bg-slate-800"
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className={`bg-slate-800 rounded-lg p-3 mb-3 ${!sidebarOpen && "hidden"}`}>
            <p className="text-sm text-gray-400">Logged in as</p>
            <p className="font-semibold">{adminUsername}</p>
          </div>
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-slate-800"
          >
            <LogOut className="h-5 w-5 mr-3" />
            {sidebarOpen && <span>Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                <Menu />
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:block text-right">
                <p className="text-sm text-gray-500">Welcome back,</p>
                <p className="font-semibold">{adminUsername}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          <Routes>
            <Route index element={<AdminOverview />} />
            <Route path="dispatch" element={<DispatchVehicles />} />
            <Route path="revenue" element={<RevenueReporting />} />
            <Route path="crm" element={<CRMModule />} />
            <Route path="safety" element={<SafetyModule />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
