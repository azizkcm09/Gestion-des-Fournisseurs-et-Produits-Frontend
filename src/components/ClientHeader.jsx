import { Menu, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ClientHeader({ toggleSidebar }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("adminId");
    navigate("/"); // Redirect to public Accueil page
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Bienvenue {user?.prenom || "Client"}
            </h1>
            <p className="text-sm text-gray-500">
              Gérez vos commandes et votre profil
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* User Info */}
          <div className="hidden md:flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">
                {user?.prenom} {user?.nom}
              </p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-2" />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>
    </header>
  );
}
