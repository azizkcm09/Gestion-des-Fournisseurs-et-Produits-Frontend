import React, { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

export default function UserSearchFilter({ onSearchChange, onFilterChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [filterRole, setFilterRole] = useState("");
  const [filterStatut, setFilterStatut] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearchChange(e.target.value);
  };

  const handleFilterApply = () => {
    onFilterChange({ role: filterRole, statut: filterStatut });
    setShowFilterOptions(false);
  };

  const handleFilterClear = () => {
    setFilterRole("");
    setFilterStatut("");
    onFilterChange({ role: "", statut: "" });
    setShowFilterOptions(false);
  };

  return (
    <div className="flex items-center space-x-4 relative">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher un utilisateur..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <button
        onClick={() => setShowFilterOptions(!showFilterOptions)}
        className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <SlidersHorizontal className="w-5 h-5 mr-2" />
        <span>Filtrer</span>
      </button>

      {showFilterOptions && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-10 border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-3">
            Options de filtre
          </h3>
          <div className="space-y-3">
            <div>
              <label
                htmlFor="filterRole"
                className="block text-sm font-medium text-gray-700"
              >
                Rôle
              </label>
              <select
                id="filterRole"
                name="filterRole"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Tous</option>
                <option value="ADMIN">ADMIN</option>
                <option value="CLIENT">CLIENT</option>
                <option value="FOURNISSEUR">FOURNISSEUR</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="filterStatut"
                className="block text-sm font-medium text-gray-700"
              >
                Statut
              </label>
              <select
                id="filterStatut"
                name="filterStatut"
                value={filterStatut}
                onChange={(e) => setFilterStatut(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Tous</option>
                <option value="Actif">Actif</option>
                <option value="Inactif">Inactif</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={handleFilterClear}
              className="px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Effacer
            </button>
            <button
              onClick={handleFilterApply}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Appliquer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
