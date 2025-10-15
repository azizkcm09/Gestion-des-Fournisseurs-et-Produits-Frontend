import React, { useState, useEffect } from "react";
import { Users, FolderOpen, ShoppingCart, Package } from "lucide-react";
import StatCard from "./StatCard";
import { api } from "../api/axios";

export default function StatsGrid() {
  const [stats, setStats] = useState([
    {
      title: "Total Utilisateurs",
      value: "...",
      subtitle: "Chargement...",
      icon: Users,
      color: "blue",
      bgGradient: "from-blue-500 to-blue-600",
      lightBg: "from-blue-50 to-blue-100",
    },
    {
      title: "Produits",
      value: "...",
      subtitle: "Chargement...",
      icon: Package,
      color: "green",
      bgGradient: "from-green-500 to-green-600",
      lightBg: "from-green-50 to-green-100",
    },
    {
      title: "Catégories",
      value: "...",
      subtitle: "Chargement...",
      icon: FolderOpen,
      color: "purple",
      bgGradient: "from-purple-500 to-purple-600",
      lightBg: "from-purple-50 to-purple-100",
    },
    {
      title: "Commandes",
      value: "...",
      subtitle: "Chargement...",
      icon: ShoppingCart,
      color: "orange",
      bgGradient: "from-orange-500 to-orange-600",
      lightBg: "from-orange-50 to-orange-100",
    },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await api.get("/dashboard/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data;

        setStats([
          {
            title: "Total Utilisateurs",
            value: data.users.total.toString(),
            subtitle: `${data.users.clients} clients, ${data.users.fournisseurs} fournisseurs`,
            icon: Users,
            color: "blue",
            bgGradient: "from-blue-500 to-blue-600",
            lightBg: "from-blue-50 to-blue-100",
          },
          {
            title: "Produits",
            value: data.produits.total.toString(),
            subtitle: `${data.produits.enStock} en stock - ${Math.round(
              data.produits.stockValue
            )}€ valeur`,
            icon: Package,
            color: "green",
            bgGradient: "from-green-500 to-green-600",
            lightBg: "from-green-50 to-green-100",
          },
          {
            title: "Catégories",
            value: data.categories.total.toString(),
            subtitle: `${data.produits.total} produits répartis`,
            icon: FolderOpen,
            color: "purple",
            bgGradient: "from-purple-500 to-purple-600",
            lightBg: "from-purple-50 to-purple-100",
          },
          {
            title: "Commandes",
            value: data.commandes.total.toString(),
            subtitle: `${data.commandes.recent} ce mois - ${Math.round(
              data.commandes.revenue
            )}€ CA`,
            icon: ShoppingCart,
            color: "orange",
            bgGradient: "from-orange-500 to-orange-600",
            lightBg: "from-orange-50 to-orange-100",
          },
        ]);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();

    // Refresh stats every 30 seconds for real-time updates
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} stat={stat} index={index} />
      ))}
    </div>
  );
}
