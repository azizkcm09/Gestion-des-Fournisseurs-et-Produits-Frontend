import { useEffect, useState } from "react";
import { api } from "../api/axios";

export default function Accueil() {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/produits")
      .then((res) => {
        setProduits(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Chargement...</p>;
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {produits.map((p) => (
        <div key={p.id} className="border rounded shadow p-4">
          <img
            src={p.image}
            alt={p.nom}
            className="w-full h-40 object-cover mb-2"
          />
          <h3 className="font-bold">{p.nom}</h3>
          <p className="text-gray-600">{p.description}</p>
          <p className="text-green-600 font-bold mt-2">{p.prix} €</p>
        </div>
      ))}
    </div>
  );
}
