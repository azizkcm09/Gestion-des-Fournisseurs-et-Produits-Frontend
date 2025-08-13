import React, { useState } from "react";
import { X } from "lucide-react";

export default function NewReportModal({ isOpen, onClose, onGenerateReport }) {
  const [reportType, setReportType] = useState("");
  const [period, setPeriod] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [color, setColor] = useState("blue");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reportType || !period || !pdfUrl) return;

    onGenerateReport({
      typeRapport: reportType,
      periode: period,
      contenuPDF: pdfUrl, // Matches backend field name
      color, // frontend only
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Nouveau rapport</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Type de rapport
            </label>
            <input
              type="text"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Ex: Ventes Mensuelles"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Période</label>
            <input
              type="text"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Ex: Juillet 2025"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Lien du PDF
            </label>
            <input
              type="url"
              value={pdfUrl}
              onChange={(e) => setPdfUrl(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="https://exemple.com/rapport.pdf"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Couleur</label>
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="blue">Bleu</option>
              <option value="green">Vert</option>
              <option value="red">Rouge</option>
              <option value="purple">Violet</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Générer
          </button>
        </form>
      </div>
    </div>
  );
}
