import { useEffect, useState } from "react";
import { api } from "../api/axios";

export default function FournisseurPage() {
  const [rapports, setRapports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const authHeaders = () => {
    const token = localStorage.getItem("token");
    return token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {};
  };

  const fetchRapports = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/rapports", {
        headers: {
          ...authHeaders(),
        },
      });
      setRapports(res.data);
    } catch (e) {
      console.error(e);
      setError(
        e.response?.data?.error || "Erreur lors de la récupération des rapports"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRapports();
  }, []);

  if (loading)
    return <div className="p-6 text-center">Chargement des rapports...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Rapports</h1>
      {rapports.length === 0 ? (
        <p className="text-gray-500">Aucun rapport disponible.</p>
      ) : (
        <ul className="space-y-3">
          {rapports.map((r) => (
            <li
              key={r.idRapport}
              className="border rounded shadow p-4 flex flex-col md:flex-row justify-between"
            >
              <div className="flex-1">
                <p className="font-medium">{r.typeRapport || "Sans type"}</p>
                {r.dateGeneration && (
                  <p className="text-sm text-gray-500">
                    Généré le :{" "}
                    {new Date(r.dateGeneration).toLocaleDateString()}
                  </p>
                )}
                {r.periode && <p className="text-sm">Période : {r.periode}</p>}
                <p className="mt-1 text-sm">
                  Par : {r.admin?.prenom} {r.admin?.nom} ({r.admin?.email})
                </p>
              </div>
              {r.contenuPDF && (
                <div className="mt-2 md:mt-0 md:ml-4 flex items-center">
                  <a
                    href={r.contenuPDF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Voir / Télécharger
                  </a>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
