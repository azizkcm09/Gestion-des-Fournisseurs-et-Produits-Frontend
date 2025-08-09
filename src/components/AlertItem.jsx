import React from "react";
export default function AlertItem({ alert }) {
  const Icon = alert.icon;
  const priorityColors = {
    high: "bg-red-500 text-white",
    medium: "bg-yellow-500 text-white",
    low: "bg-gray-400 text-white",
  };

  return (
    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
      <div className="p-2 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
        <Icon className="w-4 h-4 text-gray-600" />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-gray-800 text-sm">{alert.type}</p>
        <p className="text-sm text-gray-600">{alert.message}</p>
      </div>
      <span
        className={`
        px-2 py-1 rounded-full text-xs font-medium
        ${priorityColors[alert.priority]}
      `}
      >
        {alert.priority === "high"
          ? "High"
          : alert.priority === "medium"
          ? "Medium"
          : "Low"}
      </span>
    </div>
  );
}
