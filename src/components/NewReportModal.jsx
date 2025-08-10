import React, { useState } from "react";
import { X, FileText, ChevronDown, Download } from "lucide-react";

export default function NewReportModal({ isOpen, onClose, onGenerateReport }) {
  const [reportType, setReportType] = useState("");
  const [period, setPeriod] = useState("");
  const [pdfContent, setPdfContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerateReport({ reportType, period, pdfContent });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-auto animate-fadeInUp">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <FileText className="w-6 h-6 mr-2 text-purple-600" />
            Nouveau rapport
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Créez un nouveau rapport personnalisé
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="reportType"
              className="block text-sm font-medium text-gray-700"
            >
              Type de Rapport
            </label>
            <div className="relative mt-1">
              <select
                id="reportType"
                name="reportType"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                required
              >
                <option value="">Sélectionner un type</option>
                <option value="ventes">Rapport des ventes</option>
                <option value="inventaire">Rapport d'inventaire</option>
                <option value="livraisons">Rapport de livraisons</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="period"
              className="block text-sm font-medium text-gray-700"
            >
              Période
            </label>
            <div className="relative mt-1">
              <select
                id="period"
                name="period"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                required
              >
                <option value="">Sélectionner une période</option>
                <option value="jour">Aujourd'hui</option>
                <option value="semaine">Cette semaine</option>
                <option value="mois">Ce mois</option>
                <option value="annee">Cette année</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="pdfContent"
              className="block text-sm font-medium text-gray-700"
            >
              Contenu PDF
            </label>
            <textarea
              id="pdfContent"
              name="pdfContent"
              value={pdfContent}
              onChange={(e) => setPdfContent(e.target.value)}
              rows="4"
              placeholder="Décrivez le contenu souhaité pour le rapport..."
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            ></textarea>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-500 text-white rounded-md shadow-md hover:bg-purple-600 transition-colors flex items-center"
            >
              <Download className="w-5 h-5 mr-2" />
              Générer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
