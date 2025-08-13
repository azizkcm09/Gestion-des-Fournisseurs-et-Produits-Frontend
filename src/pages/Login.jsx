import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";

// Décode le payload d'un JWT (sans vérification cryptographique)
function parseJwt(token) {
  try {
    const [, payload] = token.split(".");
    const json = atob(
      payload
        .replaceAll("-", "+")
        .replaceAll("_", "/")
        .padEnd(payload.length + ((4 - (payload.length % 4)) % 4), "=")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !mdp) {
      setError("Remplissez tous les champs");
      return;
    }
    try {
      const res = await api.post("/users/login", { email, mdp });
      const token = res.data.token;
      if (!token) throw new Error("Pas de token retourné");

      // Sauvegarde
      localStorage.setItem("token", token);
      localStorage.setItem(
        "adminId",
        res.data.adminId || res.data.user?.id || ""
      );

      // Décodage pour extraire le rôle
      const payload = parseJwt(token);
      const roleRaw =
        payload?.role ||
        payload?.roles ||
        payload?.user?.role ||
        payload?.user?.roles ||
        "";

      const role = String(roleRaw).toUpperCase();

      if (role === "ADMIN") {
        navigate("/admin");
      } else if (role === "FOURNISSEUR" || role === "PROVIDER") {
        navigate("/fournisseur");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-10 p-6 border rounded shadow"
    >
      <h2 className="text-xl font-semibold mb-4">Connexion</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={mdp}
        onChange={(e) => setMdp(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition"
      >
        Se connecter
      </button>
    </form>
  );
}
