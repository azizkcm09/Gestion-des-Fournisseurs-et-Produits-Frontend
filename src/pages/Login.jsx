import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !mdp) {
      setError("Remplissez tous les champs");
      return;
    }
    try {
      const res = await api.post("/users/login", { email, mdp });
      localStorage.setItem("token", res.data.token);
      navigate("/accueil");
    } catch {
      setError("Email ou mot de passe incorrect");
    }
    0;
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-10 p-6 border rounded"
    >
      <h2 className="text-xl mb-4">Connexion</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-3 p-2 border"
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={mdp}
        onChange={(e) => setMdp(e.target.value)}
        className="w-full mb-3 p-2 border"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        Se connecter
      </button>
    </form>
  );
}
