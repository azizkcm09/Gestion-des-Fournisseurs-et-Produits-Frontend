import React from "react";

export default function AddUserButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
    >
      Ajouter un utilisateur
    </button>
  );
}
