import React from "react";

export default function ReportCard({ report }) {
  const colorMap = {
    red: "text-red-800",
    blue: "text-blue-800",
    green: "text-green-800",
    yellow: "text-yellow-800",
    purple: "text-purple-800",
  };

  const buttonColorMap = {
    red: "bg-red-500 hover:bg-red-600",
    blue: "bg-blue-500 hover:bg-blue-600",
    green: "bg-green-500 hover:bg-green-600",
    yellow: "bg-yellow-500 hover:bg-yellow-600",
    purple: "bg-purple-500 hover:bg-purple-600",
  };

  const bgGradientMap = {
    red: "bg-gradient-to-br from-red-50 to-red-100",
    blue: "bg-gradient-to-br from-blue-50 to-blue-100",
    green: "bg-gradient-to-br from-green-50 to-green-100",
    yellow: "bg-gradient-to-br from-yellow-50 to-yellow-100",
    purple: "bg-gradient-to-br from-purple-50 to-purple-100",
  };

  return (
    <div
      className={`rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col ${
        bgGradientMap[report.color] || ""
      }`}
    >
      <h3
        className={`text-xl font-semibold ${
          colorMap[report.color] || "text-gray-800"
        } mb-2`}
      >
        {report.typeRapport}
      </h3>

      <p className="text-gray-600 text-sm mb-4">{report.periode}</p>

      {report.contenuPDF && (
        <a
          href={report.contenuPDF}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-auto px-4 py-2 rounded-lg text-white font-medium ${
            buttonColorMap[report.color] || "bg-gray-500 hover:bg-gray-600"
          } transition-all duration-300 text-center`}
        >
          Voir PDF
        </a>
      )}
    </div>
  );
}
