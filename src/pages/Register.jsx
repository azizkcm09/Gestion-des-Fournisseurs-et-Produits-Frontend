import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";
// If your illustration is in src/assets:
import registerIllustration from "../assets/loginpage.png"; // replace with actual file
import logo from "../assets/iconLoginPage.png"; // replace with your logo

export default function Register() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nom || !prenom || !email || !mdp) {
      setError("Please fill in all fields");
      return;
    }
    if (mdp.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    try {
      await api.post("/users/register", { nom, prenom, email, mdp });
      navigate("/login");
    } catch {
      setError("Registration error");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left panel */}
      <div className="w-1/2 bg-yellow-500 flex flex-col justify-center items-center text-white p-10">
        <div className="max-w-md text-center">
          {/* Logo */}
          <div className="mb-6">
            <img src={logo} alt="Logo" className="w-32 h-32 mx-auto" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Join us today</h1>
          <p className="text-lg opacity-90">
            Create your account and start managing your products with ease.
          </p>
          {/* Illustration */}
          <div className="mt-10">
            <img
              src={registerIllustration}
              alt="Illustration"
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-1/2 flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6">Register</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <label className="block mb-2 text-sm font-medium">Last Name</label>
            <input
              type="text"
              placeholder="Nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />

            <label className="block mb-2 text-sm font-medium">First Name</label>
            <input
              type="text"
              placeholder="Prénom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />

            <label className="block mb-2 text-sm font-medium">Email</label>
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
              className="w-full mb-6 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded transition"
            >
              Sign up
            </button>
          </form>
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-yellow-500 hover:underline font-medium"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
