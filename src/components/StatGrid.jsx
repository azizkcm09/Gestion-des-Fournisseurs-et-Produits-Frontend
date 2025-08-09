import React from "react";
import { Users, FolderOpen, ShoppingCart, AlertCircle } from "lucide-react";
import StatCard from "./StatCard";
export default function StatsGrid() {
  const stats = [
    {
      title: "Total Utilisateurs",
      value: "3",
      subtitle: "+2 ce mois",
      icon: Users,
      color: "blue",
      bgGradient: "from-blue-500 to-blue-600",
      lightBg: "from-blue-50 to-blue-100",
    },
    {
      title: "Catégories",
      value: "3",
      subtitle: "155 produits total",
      icon: FolderOpen,
      color: "green",
      bgGradient: "from-green-500 to-green-600",
      lightBg: "from-green-50 to-green-100",
    },
    {
      title: "Commandes",
      value: "3",
      subtitle: "+12% vs mois dernier",
      icon: ShoppingCart,
      color: "purple",
      bgGradient: "from-purple-500 to-purple-600",
      lightBg: "from-purple-50 to-purple-100",
    },
    {
      title: "Alertes",
      value: "3",
      subtitle: "2 priorité haute",
      icon: AlertCircle,
      color: "orange",
      bgGradient: "from-orange-500 to-orange-600",
      lightBg: "from-orange-50 to-orange-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} stat={stat} index={index} />
      ))}
    </div>
  );
}
