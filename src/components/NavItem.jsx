import React from "react";

export default function NavItem({ item, isActive, isOpen, onClick }) {
  const Icon = item.icon;

  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg
        transition-all duration-200 group relative
        ${
          isActive
            ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-sm"
            : "hover:bg-gray-50 text-gray-600 hover:text-gray-900"
        }
      `}
    >
      <Icon
        className={`w-5 h-5 ${
          isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
        }`}
      />
      {isOpen && (
        <span className="font-medium text-sm animate-fadeIn">{item.label}</span>
      )}
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full" />
      )}
    </button>
  );
}
