import { useEffect, useState } from "react";
import { api } from "../api/axios";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Attacher le token si tu n'as pas déjà un interceptor dans api
  const authHeaders = () => {
    const token = localStorage.getItem("token");
    return token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {};
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/users", {
        headers: {
          ...authHeaders(),
        },
      });
      setUsers(res.data);
    } catch (e) {
      console.error(e);
      setError(
        e.response?.data?.error || "Impossible de récupérer les utilisateurs"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const startEdit = (user) => {
    setEditingId(user.id);
    setEditValues({ name: user.nom || "", email: user.email || "" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({ name: "", email: "" });
  };

  const saveEdit = async (id) => {
    try {
      await api.put(
        `/admin/users/${id}`,
        { name: editValues.name, email: editValues.email },
        {
          headers: {
            ...authHeaders(),
          },
        }
      );
      await fetchUsers();
      cancelEdit();
    } catch (e) {
      console.error(e);
      alert(
        e.response?.data?.error ||
          "Erreur lors de la mise à jour de l’utilisateur"
      );
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Supprimer cet utilisateur ?")) return;
    try {
      await api.delete(`/admin/users/${id}`, {
        headers: {
          ...authHeaders(),
        },
      });
      await fetchUsers();
    } catch (e) {
      console.error(e);
      alert(
        e.response?.data?.error ||
          "Erreur lors de la suppression de l'utilisateur"
      );
    }
  };

  if (loading)
    return (
      <div className="text-center p-4">Chargement des utilisateurs...</div>
    );
  if (error)
    return <div className="text-center p-4 text-red-600">Erreur : {error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Admin - Gestion des utilisateurs
      </h2>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nom</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2">{u.id}</td>
                <td className="px-4 py-2">
                  {editingId === u.id ? (
                    <input
                      className="border rounded px-2 py-1 w-full"
                      value={editValues.name}
                      onChange={(e) =>
                        setEditValues((v) => ({ ...v, name: e.target.value }))
                      }
                    />
                  ) : (
                    u.nom
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingId === u.id ? (
                    <input
                      className="border rounded px-2 py-1 w-full"
                      value={editValues.email}
                      onChange={(e) =>
                        setEditValues((v) => ({ ...v, email: e.target.value }))
                      }
                    />
                  ) : (
                    u.email
                  )}
                </td>
                <td className="px-4 py-2 flex flex-wrap gap-2">
                  {editingId === u.id ? (
                    <>
                      <button
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                        onClick={() => saveEdit(u.id)}
                      >
                        Sauvegarder
                      </button>
                      <button
                        className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                        onClick={cancelEdit}
                      >
                        Annuler
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        onClick={() => startEdit(u)}
                      >
                        Modifier
                      </button>
                      <button
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        onClick={() => deleteUser(u.id)}
                      >
                        Supprimer
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  Aucun utilisateur trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
