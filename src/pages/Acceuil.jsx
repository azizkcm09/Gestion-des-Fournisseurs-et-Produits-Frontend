import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import CardProduit from "../components/CardProduit";
import ProductModal from "../components/ProductModal";

export default function Accueil() {
  const navigate = useNavigate();
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Fetch products
  useEffect(() => {
    api
      .get("/produits")
      .then((res) => {
        setProduits(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Erreur lors du chargement des produits");
        setLoading(false);
      });
  }, []);

  // Handle product card click
  const handleProductClick = (produit) => {
    setSelectedProduct(produit);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Handle login redirect
  const handleLoginRedirect = () => {
    handleCloseModal();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Chargement des produits...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Bienvenue sur notre marketplace
          </h1>
          <p className="text-xl md:text-2xl mb-6">
            Découvrez nos produits de qualité
          </p>
          {!isLoggedIn && (
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate("/login")}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Se connecter
              </button>
              <button
                onClick={() => navigate("/register")}
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                S'inscrire
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Nos Produits ({produits.length})
          </h2>
          <p className="text-gray-600">
            Cliquez sur un produit pour voir les détails
            {!isLoggedIn && " (Connectez-vous pour commander)"}
          </p>
        </div>

        {produits.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Aucun produit disponible pour le moment
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {produits.map((produit) => (
              <CardProduit
                key={produit.idProduit}
                produit={produit}
                onClick={handleProductClick}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal
        produit={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isLoggedIn={isLoggedIn}
        onLoginRedirect={handleLoginRedirect}
      />
    </div>
  );
}
