import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import loginIllustration from "../assets/loginpage.png";
import loginIcon from "../assets/iconLoginPage.png"; // replace with your icon
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

      localStorage.setItem("token", token);
      localStorage.setItem(
        "adminId",
        res.data.adminId || res.data.user?.id || ""
      );

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
    <div className="flex h-screen bg-gray-50">
      {/* Left panel */}
      <div className="w-1/2 bg-yellow-500 flex flex-col justify-center items-center text-white p-10">
        <div className="max-w-md text-center">
          {/* Logo */}
          <div className="mb-6">
            <img
              src={loginIcon} // replace with your logo
              alt="Logo"
              className="w-32 h-32 mx-auto"
            />
          </div>
          <h1 className="text-3xl font-bold mb-3">Welcome back</h1>
          <p className="text-lg opacity-90">
            Manage your products efficiently with our intuitive and powerful
            platform.
          </p>
          {/* Illustration */}
          <div className="mt-10">
            <img
              src={loginIllustration} // replace with your illustration
              alt="Illustration"
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-1/2 flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6">Log in</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <label className="block mb-2 text-sm font-medium">Email ID</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <label className="block mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Mot de passe"
              value={mdp}
              onChange={(e) => setMdp(e.target.value)}
              className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <div className="flex justify-between items-center mb-6">
              <label className="flex items-center text-sm">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <a href="#" className="text-sm text-yellow-500 hover:underline">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded transition"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
