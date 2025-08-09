import React from "react";
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  ShoppingCart,
  Truck,
  FileText,
  AlertCircle,
  X,
} from "lucide-react";
import NavItem from "./NavItem";
export default function Sidebar({
  isOpen,
  activeNav,
  setActiveNav,
  toggleSidebar,
}) {
  const menuItems = [
    {
      id: "dashboard",
      label: "Tableau de bord",
      icon: LayoutDashboard,
      path: "/admin",
    },
    { id: "users", label: "Utilisateurs", icon: Users, path: "/users" },
    { id: "categories", label: "Catégories", icon: FolderOpen },
    { id: "orders", label: "Commandes", icon: ShoppingCart },
    { id: "deliveries", label: "Livraisons", icon: Truck },
    { id: "reports", label: "Rapports", icon: FileText },
    { id: "alerts", label: "Alertes", icon: AlertCircle },
  ];

  return (
    <aside
      className={`
      ${isOpen ? "w-64" : "w-0 lg:w-20"} 
      bg-white shadow-xl transition-all duration-300 ease-in-out
      border-r border-gray-200 flex flex-col relative
    `}
    >
      {/* Mobile Close Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <X className="w-5 h-5 text-gray-600" />
      </button>

      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          {isOpen && (
            <div className="animate-fadeIn">
              <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
              <p className="text-xs text-gray-500">Gestion & Produits</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p
          className={`text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 ${
            !isOpen && "hidden"
          }`}
        >
          Navigation
        </p>
        {menuItems.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            isActive={activeNav === item.id}
            isOpen={isOpen}
            onClick={() => setActiveNav(item.id)}
            path={item.path}
          />
        ))}
      </nav>
    </aside>
  );
}
