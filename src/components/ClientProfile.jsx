import { useState, useEffect } from "react";
import { User, Mail, MapPin, Save } from "lucide-react";

export default function ClientProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    nom: "",
    prenom: "",
    email: "",
    adresse: "",
  });
  const [originalData, setOriginalData] = useState({});

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setUserData(parsedUser);
        setOriginalData(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleSave = () => {
    // Here you would make an API call to update the user profile
    localStorage.setItem("user", JSON.stringify(userData));
    setOriginalData(userData);
    setIsEditing(false);
    alert("Profil mis à jour avec succès!");
  };

  const handleCancel = () => {
    setUserData(originalData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Mon Profil</h2>
        <p className="text-gray-600">Gérez vos informations personnelles</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              {userData.prenom} {userData.nom}
            </h3>
            <p className="text-gray-600">{userData.email}</p>
          </div>
        </div>

        {/* Profile Form */}
        <div className="space-y-4">
          {/* Name */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prénom
              </label>
              <input
                type="text"
                value={userData.prenom || ""}
                onChange={(e) =>
                  setUserData({ ...userData, prenom: e.target.value })
                }
                disabled={!isEditing}
                className={`w-full px-4 py-2 border rounded-lg ${
                  isEditing
                    ? "border-blue-500 focus:ring-2 focus:ring-blue-500"
                    : "bg-gray-100 border-gray-300"
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom
              </label>
              <input
                type="text"
                value={userData.nom || ""}
                onChange={(e) =>
                  setUserData({ ...userData, nom: e.target.value })
                }
                disabled={!isEditing}
                className={`w-full px-4 py-2 border rounded-lg ${
                  isEditing
                    ? "border-blue-500 focus:ring-2 focus:ring-blue-500"
                    : "bg-gray-100 border-gray-300"
                }`}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-1" />
              Email
            </label>
            <input
              type="email"
              value={userData.email || ""}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg ${
                isEditing
                  ? "border-blue-500 focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-100 border-gray-300"
              }`}
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              Adresse
            </label>
            <textarea
              value={userData.adresse || ""}
              onChange={(e) =>
                setUserData({ ...userData, adresse: e.target.value })
              }
              disabled={!isEditing}
              rows="3"
              className={`w-full px-4 py-2 border rounded-lg ${
                isEditing
                  ? "border-blue-500 focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-100 border-gray-300"
              }`}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Modifier le profil
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Enregistrer
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg font-semibold transition-colors"
                >
                  Annuler
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
