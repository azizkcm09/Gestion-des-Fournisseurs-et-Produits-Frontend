import React from "react";
import { Download } from "lucide-react";

export default function AddReportButton() {
  return (
    <button className="flex items-center px-4 py-2 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
      <Download className="w-5 h-5 mr-2" />
      <span>Nouveau rapport</span>
    </button>
  );
}
