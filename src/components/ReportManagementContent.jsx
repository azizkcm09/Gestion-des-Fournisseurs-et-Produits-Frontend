import React, { useState } from "react";
import AddReportButton from "./AddReportButton";
import ReportCard from "./ReportCard";
import NewReportModal from "./NewReportModal";

export default function ReportManagementContent() {
  const [isNewReportModalOpen, setIsNewReportModalOpen] = useState(false);

  const reports = [
    {
      id: 1,
      title: "Rapport des ventes",
      description: "Analyse des performances de vente",
      color: "blue",
      bgGradient: "from-blue-100 to-blue-200",
      buttonColor: "bg-blue-500 hover:bg-blue-600",
    },
    {
      id: 2,
      title: "Rapport d'inventaire",
      description: "État des stocks et produits",
      color: "green",
      bgGradient: "from-green-100 to-green-200",
      buttonColor: "bg-green-500 hover:bg-green-600",
    },
    {
      id: 3,
      title: "Rapport de livraisons",
      description: "Performance des livraisons",
      color: "orange",
      bgGradient: "from-orange-100 to-red-200",
      buttonColor:
        "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600",
    },
  ];

  const handleGenerateReport = (reportData) => {
    console.log("Générer le rapport avec les données:", reportData);
    // Ici, vous intégreriez la logique réelle de génération de rapport (ex: appel API, création PDF)
    alert(
      `Rapport de type ${reportData.reportType} pour la période ${reportData.period} généré !`
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Rapports</h1>
          <p className="text-gray-600">Générez et consultez vos rapports</p>
        </div>
        <AddReportButton onClick={() => setIsNewReportModalOpen(true)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>
      <NewReportModal
        isOpen={isNewReportModalOpen}
        onClose={() => setIsNewReportModalOpen(false)}
        onGenerateReport={handleGenerateReport}
      />
    </div>
  );
}
