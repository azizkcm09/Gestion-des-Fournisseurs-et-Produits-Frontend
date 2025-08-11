import React, { useState } from "react";

export default function UserSearchFilter({ onSearchChange, onFilterChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ role: "", statut: "" });

  const roles = ["", "ADMIN", "CLIENT", "FOURNISSEUR"];
  const statuts = ["", "ACTIF", "INACTIF"];

  const handleSearchInputChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    onSearchChange(val);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="flex flex-wrap items-center gap-4 py-4">
      <input
        type="text"
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={handleSearchInputChange}
        className="border rounded px-3 py-2 flex-grow max-w-xs"
      />

      <select
        name="role"
        value={filters.role}
        onChange={handleFilterChange}
        className="border rounded px-3 py-2"
      >
        {roles.map((roleOption) => (
          <option key={roleOption} value={roleOption}>
            {roleOption === "" ? "Tous les rôles" : roleOption}
          </option>
        ))}
      </select>

      <select
        name="statut"
        value={filters.statut}
        onChange={handleFilterChange}
        className="border rounded px-3 py-2"
      >
        {statuts.map((statutOption) => (
          <option key={statutOption} value={statutOption}>
            {statutOption === "" ? "Tous les statuts" : statutOption}
          </option>
        ))}
      </select>
    </div>
  );
}
