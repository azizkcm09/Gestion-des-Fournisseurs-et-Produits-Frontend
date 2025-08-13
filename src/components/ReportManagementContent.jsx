import React, { useState, useEffect } from "react";
import { api } from "../api/axios";
import ReportCard from "./ReportCard";
import NewReportModal from "./NewReportModal";

export default function ReportManagementContent() {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch reports
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await api.get("/rapports", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReports(res.data);
      } catch (err) {
        console.error("Error fetching reports:", err);
        setError("Erreur lors du chargement des rapports");
      }
    };
    fetchReports();
  }, []);

  // Create new report
  const handleGenerateReport = async (reportData) => {
    try {
      const token = localStorage.getItem("token");
      const adminId = localStorage.getItem("adminId");

      if (!token || !adminId) {
        setError("Authentification requise. Veuillez vous connecter.");
        setIsModalOpen(false);
        return;
      }

      // Add adminId
      const finalPayload = { ...reportData, adminId };

      const res = await api.post("/rapports", finalPayload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Add the new report with color back for display
      setReports((prev) => [{ ...res.data, color: reportData.color }, ...prev]);
      setIsModalOpen(false);
      setError(null);
    } catch (err) {
      console.error("Error creating report:", err);
      setError("Erreur lors de la création du rapport");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des rapports</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          Nouveau rapport
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reports.map((report) => (
          <ReportCard key={report.idRapport} report={report} />
        ))}
      </div>

      <NewReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGenerateReport={handleGenerateReport}
      />
    </div>
  );
}
