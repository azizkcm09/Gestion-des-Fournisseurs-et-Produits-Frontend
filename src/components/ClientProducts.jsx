import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { useCart } from "../contexts/CartContext";
import { ShoppingCart, Eye } from "lucide-react";
import ProductModal from "./ProductModal";

export default function ClientProducts() {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    api
      .get("/produits")
      .then((res) => {
        setProduits(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (produit, quantity = 1) => {
    addToCart(produit, quantity);
    alert(`${produit.nom} ajouté au panier!`);
  };

  const handleViewDetails = (produit) => {
    setSelectedProduct(produit);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Tous les produits</h2>
        <p className="text-gray-600">
          Parcourez notre catalogue et ajoutez au panier
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {produits.map((produit) => (
          <div
            key={produit.idProduit}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={
                  produit.imageURL.startsWith("http")
                    ? produit.imageURL
                    : `http://localhost:4000${produit.imageURL}`
                }
                alt={produit.nom}
                className="w-full h-48 object-cover bg-gray-200"
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect fill='%23f3f4f6' width='300' height='200'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='18' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EImage non disponible%3C/text%3E%3C/svg%3E";
                }}
              />
              {produit.categorie && (
                <div className="absolute bottom-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">
                  {produit.categorie.nomCategorie}
                </div>
              )}
              {produit.quantiteStock === 0 && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                  Rupture
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2 text-gray-800 truncate">
                {produit.nom}
              </h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {produit.description}
              </p>

              <div className="flex justify-between items-center mb-3">
                <p className="text-green-600 font-bold text-xl">
                  {produit.prix} €
                </p>
                <p className="text-sm text-gray-600">
                  {produit.quantiteStock > 0
                    ? `${produit.quantiteStock} dispo`
                    : "Indisponible"}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleViewDetails(produit)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-md transition-colors flex items-center justify-center gap-1"
                >
                  <Eye className="w-4 h-4" />
                  Détails
                </button>
                <button
                  onClick={() => handleAddToCart(produit)}
                  disabled={produit.quantiteStock === 0}
                  className={`flex-1 py-2 rounded-md transition-colors flex items-center justify-center gap-1 ${
                    produit.quantiteStock === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          produit={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
          isLoggedIn={true}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}
