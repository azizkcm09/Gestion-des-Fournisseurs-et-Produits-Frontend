import React from "react";

export default function ReportCard({ report }) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col ${report.bgGradient}`}
    >
      <h3 className={`text-xl font-semibold text-${report.color}-800 mb-2`}>
        {report.title}
      </h3>
      <p className="text-gray-600 text-sm mb-4">{report.description}</p>
      <button
        className={`mt-auto px-4 py-2 rounded-lg text-white font-medium ${report.buttonColor} transition-all duration-300`}
      >
        Générer
      </button>
    </div>
  );
}
