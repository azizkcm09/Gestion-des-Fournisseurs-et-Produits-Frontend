import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function UserTable({ users, onEdit, onDelete }) {
  return (
    <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2 border-b">Nom</th>
          <th className="px-4 py-2 border-b">Prénom</th>
          <th className="px-4 py-2 border-b">Email</th>
          <th className="px-4 py-2 border-b">Rôle</th>
          <th className="px-4 py-2 border-b">Statut</th>
          <th className="px-4 py-2 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 ? (
          <tr>
            <td colSpan="6" className="text-center py-4 text-gray-500">
              Aucun utilisateur trouvé.
            </td>
          </tr>
        ) : (
          users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="border-b px-4 py-2">{user.nom}</td>
              <td className="border-b px-4 py-2">{user.prenom}</td>
              <td className="border-b px-4 py-2">{user.email}</td>
              <td className="border-b px-4 py-2">{user.role}</td>
              <td className="border-b px-4 py-2">{user.statut}</td>
              <td className="border-b px-4 py-2 space-x-3">
                <button
                  aria-label="Edit user"
                  onClick={() => onEdit(user)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Modifier"
                >
                  <FaEdit />
                </button>
                <button
                  aria-label="Delete user"
                  onClick={() => onDelete(user)}
                  className="text-red-600 hover:text-red-800"
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
  );
}
