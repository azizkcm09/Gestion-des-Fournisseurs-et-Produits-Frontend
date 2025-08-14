import React from "react";
import { Menu, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header({ toggleSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Supprime le token d'authentification
    localStorage.removeItem("adminId"); // Supprime l'ID de l'administrateur
    navigate("/login"); // Redirige vers la page de connexion
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
              Tableau de bord
            </h1>
            <p className="text-sm text-gray-500">
              Vue d'ensemble de votre système de gestion
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
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
