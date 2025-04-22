import { useState, useEffect } from "react";
import {
  Home,
  ChartArea,
  Goal,
  Bell,
  WandSparkles,
  Mail,
  User,
  Menu,
  ChevronLeft,
} from "lucide-react";



const navItems = [
  { name: "Home", icon: <Home />, link: "#" },
  { name: "Analytics", icon: <ChartArea />, link: "#" },
  { name: "Goals", icon: <Goal />, link: "#" },
  { name: "Notifications", icon: <Bell />, link: "#" },
  { name: "Recommend", icon: <WandSparkles />, link: '/book' },
];


export default function Navbar() {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);

  // Simulate fetching user from auth
  useEffect(() => {
    const fetchedUser = {
      name: "Aanya Roy",
      handle: "aanya_reads",
      avatar: "", // or a URL like "https://example.com/avatar.jpg"
    };

    setUser(fetchedUser);
  }, []);

  return (
    <div
      className={`h-screen ${
        collapsed ? "w-20" : "w-64"
      } p-4 border-r border-gray-200 flex flex-col justify-between bg-[#FCF5EA] transition-all duration-300`}
    >
      <div>
        {/* Toggle Button */}
        <button
          className="mb-4 p-2 hover:bg-gray-100 rounded-full"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>

        {/* Logo and App Name */}
        <div
          className={`mb-6 px-3 flex items-center ${
            collapsed ? "justify-center" : "space-x-3"
          }`}
        >
          <img src="./logo/logo.png" className="w-8 h-8" alt="Logo" />
          {!collapsed && (
            <p style={{ fontFamily: "Virgil" }} className="text-xl">
              ShelfScape
            </p>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="space-y-4">
          {navItems.map((item) => (
            <a
              href={item.link}
              key={item.name}
              className={`flex items-center ${
                collapsed ? "justify-center" : "space-x-4"
              } text-lg text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-full transition`}
            >
              {item.icon}
              {!collapsed && <span>{item.name}</span>}
            </a>
          ))}
        </nav>
      </div>

      {/* Profile Section */}
      {user && (
        <div
          className={`flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-full transition cursor-pointer ${
            collapsed ? "justify-center" : ""
          }`}
        >
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-300 text-white flex items-center justify-center font-bold rounded-full">
              {user.name.charAt(0)}
            </div>
          )}
          {!collapsed && (
            <div className="text-sm">
              <div className="font-semibold">{user.name}</div>
              <div className="text-gray-500">@{user.handle}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
