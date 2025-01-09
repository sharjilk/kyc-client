import LogoutButton from "@/components/LogoutButton";
import { Outlet } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "KPI", path: "/admin/kpi" },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-800 text-white">
        <div className="p-4 text-lg font-bold">Admin Panel</div>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block px-4 py-2 ${
                  location.pathname === item.path
                    ? "bg-gray-700"
                    : "hover:bg-gray-700"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <LogoutButton />
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
