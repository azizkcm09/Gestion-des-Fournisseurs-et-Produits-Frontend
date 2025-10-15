import { useState } from "react";

export default function ProductModal({
  produit,
  isOpen,
  onClose,
  isLoggedIn,
  onLoginRedirect,
}) {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !produit) return null;

  const handlePurchase = () => {
    if (!isLoggedIn) {
      onLoginRedirect();
      return;
    }
    // Here you would implement the actual purchase logic
    alert(`Commande de ${quantity} ${produit.nom}(s) créée !`);
    onClose();
  };

  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent infinite loop
    e.target.src =
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='400' viewBox='0 0 500 400'%3E%3Crect fill='%23f3f4f6' width='500' height='400'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='24' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EImage non disponible%3C/text%3E%3C/svg%3E";
  };

  const isOutOfStock = produit.quantiteStock === 0;
  const maxQuantity = Math.min(produit.quantiteStock, 10);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">{produit.nom}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Image */}
            <div>
              <img
                src={
                  produit.imageURL.startsWith("http")
                    ? produit.imageURL
                    : `http://localhost:4000${produit.imageURL}`
                }
                alt={produit.nom}
                className="w-full rounded-lg bg-gray-200"
                onError={handleImageError}
              />
            </div>

            {/* Details */}
            <div>
              {/* Category */}
              {produit.categorie && (
                <div className="mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {produit.categorie.nomCategorie}
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="mb-4">
                <p className="text-3xl font-bold text-green-600">
                  {produit.prix} €
                </p>
              </div>

              {/* Description */}
              <div className="mb-4">
                <h3 className="font-semibold text-lg mb-2">Description</h3>
                <p className="text-gray-700">{produit.description}</p>
              </div>

              {/* Stock */}
              <div className="mb-4">
                <h3 className="font-semibold text-lg mb-2">Disponibilité</h3>
                <p
                  className={`font-semibold ${
                    isOutOfStock
                      ? "text-red-600"
                      : produit.quantiteStock < 10
                      ? "text-orange-600"
                      : "text-green-600"
                  }`}
                >
                  {isOutOfStock
                    ? "Rupture de stock"
                    : `${produit.quantiteStock} en stock`}
                </p>
              </div>

              {/* Type */}
              <div className="mb-4">
                <h3 className="font-semibold text-lg mb-2">Type de produit</h3>
                <p className="text-gray-700">{produit.typeProduit}</p>
              </div>

              {/* Supplier */}
              {produit.fournisseur && (
                <div className="mb-4">
                  <h3 className="font-semibold text-lg mb-2">Fournisseur</h3>
                  <p className="text-gray-700">
                    {produit.fournisseur.prenom} {produit.fournisseur.nom}
                  </p>
                </div>
              )}

              {/* Quantity Selector */}
              {!isOutOfStock && (
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-2">Quantité</h3>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
                    >
                      -
                    </button>
                    <span className="text-xl font-semibold">{quantity}</span>
                    <button
                      onClick={() =>
                        setQuantity(Math.min(maxQuantity, quantity + 1))
                      }
                      className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Purchase Button */}
              {isOutOfStock ? (
                <button
                  disabled
                  className="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold cursor-not-allowed"
                >
                  Produit indisponible
                </button>
              ) : !isLoggedIn ? (
                <div>
                  <button
                    onClick={handlePurchase}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    Connectez-vous pour commander
                  </button>
                  <p className="text-sm text-gray-600 text-center mt-2">
                    Vous devez être connecté pour passer une commande
                  </p>
                </div>
              ) : (
                <div>
                  <button
                    onClick={handlePurchase}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    Commander maintenant ({quantity * produit.prix} €)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
