export default function CardProduit({ produit, onClick }) {
  // Handle image error
  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent infinite loop
    e.target.src =
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect fill='%23f3f4f6' width='300' height='200'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='18' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EImage non disponible%3C/text%3E%3C/svg%3E";
  };

  // Get stock status color
  const getStockColor = () => {
    if (produit.quantiteStock === 0) return "text-red-600";
    if (produit.quantiteStock < 10) return "text-orange-600";
    return "text-green-600";
  };

  return (
    <div
      onClick={() => onClick(produit)}
      className="border rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden bg-white transform hover:-translate-y-1"
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
          onError={handleImageError}
        />
        {/* Stock badge */}
        {produit.quantiteStock === 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
            Rupture de stock
          </div>
        )}
        {/* Category badge */}
        {produit.categorie && (
          <div className="absolute bottom-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">
            {produit.categorie.nomCategorie}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-1">
          {produit.nom}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {produit.description}
        </p>

        {/* Price and Stock */}
        <div className="flex justify-between items-center mb-2">
          <p className="text-green-600 font-bold text-xl">{produit.prix} €</p>
          <p className={`text-sm ${getStockColor()}`}>
            {produit.quantiteStock > 0
              ? `${produit.quantiteStock} en stock`
              : "Indisponible"}
          </p>
        </div>

        {/* View Details Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors duration-200">
          Voir les détails
        </button>
      </div>
    </div>
  );
}
