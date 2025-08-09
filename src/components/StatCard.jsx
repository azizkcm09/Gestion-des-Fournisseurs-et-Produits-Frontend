import React from "react";
import { TrendingUp } from "lucide-react";

export default function StatCard({ stat, index }) {
  const Icon = stat.icon;

  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`p-3 rounded-xl bg-gradient-to-br ${stat.lightBg} group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className={`w-6 h-6 text-${stat.color}-600`} />
        </div>
        <TrendingUp className="w-4 h-4 text-green-500 animate-pulse" />
      </div>
      <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
      <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
      <p className="text-xs text-gray-500">{stat.subtitle}</p>
    </div>
  );
}
