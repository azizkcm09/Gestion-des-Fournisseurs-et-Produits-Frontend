import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function UserTable({ users, onEdit, onDelete }) {
  // Badge color mappings
  const roleColors = {
    ADMIN: "bg-blue-100 text-blue-700 border border-blue-300",
    CLIENT: "bg-blue-100 text-blue-700 border border-blue-300",
    FOURNISSEUR: "bg-blue-100 text-blue-700 border border-blue-300",
    LIVREUR: "bg-blue-100 text-blue-700 border border-blue-300",
  };

  const statutColors = {
    ACTIF: "bg-green-100 text-green-700 border border-green-300",
    INACTIF: "bg-gray-100 text-gray-500 border border-gray-300",
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-50 text-gray-700 font-semibold text-sm">
          <tr>
            <th className="px-6 py-4 text-left">Nom</th>
            <th className="px-6 py-4 text-left">Prénom</th>
            <th className="px-6 py-4 text-left">Email</th>
            <th className="px-6 py-4 text-left">Rôle</th>
            <th className="px-6 py-4 text-left">Statut</th>
            <th className="px-6 py-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {users.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-500">
                Aucun utilisateur trouvé.
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr
                key={user.id}
                className={`${
                  index === 0 ? "bg-blue-50" : ""
                } hover:bg-blue-50 transition-colors`}
              >
                <td className="px-6 py-4 font-semibold">{user.nom}</td>
                <td className="px-6 py-4 font-semibold">{user.prenom}</td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      roleColors[user.role] || ""
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      statutColors[user.statut] || ""
                    }`}
                  >
                    {user.statut}
                  </span>
                </td>
                <td className="px-6 py-4 flex items-center gap-3">
                  <button
                    aria-label="Edit user"
                    onClick={() => onEdit(user)}
                    className="text-gray-600 hover:text-blue-600"
                    title="Modifier"
                  >
                    <FaEdit />
                  </button>
                  <button
                    aria-label="Delete user"
                    onClick={() => onDelete(user)}
                    className="text-gray-600 hover:text-red-600"
                    title="Supprimer"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
