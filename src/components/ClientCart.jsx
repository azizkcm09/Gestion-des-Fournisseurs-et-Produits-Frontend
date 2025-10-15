import { useCart } from "../contexts/CartContext";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

export default function ClientCart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } =
    useCart();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Votre panier est vide!");
      return;
    }

    // Here you would implement the actual checkout logic
    alert(`Commande de ${getCartTotal().toFixed(2)}€ créée avec succès!`);
    clearCart();
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <ShoppingBag className="w-24 h-24 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Votre panier est vide
        </h2>
        <p className="text-gray-600">
          Ajoutez des produits pour commencer vos achats
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Mon Panier</h2>
          <p className="text-gray-600">{cartItems.length} article(s)</p>
        </div>
        <button
          onClick={clearCart}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Vider le panier
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.idProduit}
              className="bg-white rounded-lg shadow-md p-4 flex gap-4"
            >
              {/* Image */}
              <img
                src={
                  item.imageURL.startsWith("http")
                    ? item.imageURL
                    : `http://localhost:4000${item.imageURL}`
                }
                alt={item.nom}
                className="w-24 h-24 object-cover rounded bg-gray-200"
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect fill='%23f3f4f6' width='100' height='100'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='12' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EImage%3C/text%3E%3C/svg%3E";
                }}
              />

              {/* Details */}
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800">{item.nom}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  {item.categorie?.nomCategorie}
                </p>
                <p className="text-green-600 font-bold text-xl">
                  {item.prix} € x {item.quantity} ={" "}
                  {(item.prix * item.quantity).toFixed(2)} €
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex flex-col justify-between items-end">
                <button
                  onClick={() => removeFromCart(item.idProduit)}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  <Trash2 className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.idProduit, item.quantity - 1)
                    }
                    className="bg-gray-200 hover:bg-gray-300 p-2 rounded"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold text-lg w-8 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.idProduit,
                        Math.min(item.quantity + 1, item.quantiteStock)
                      )
                    }
                    disabled={item.quantity >= item.quantiteStock}
                    className={`p-2 rounded ${
                      item.quantity >= item.quantiteStock
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Résumé</h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Sous-total</span>
                <span className="font-semibold">
                  {getCartTotal().toFixed(2)} €
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Livraison</span>
                <span className="font-semibold text-green-600">Gratuite</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold text-green-600">
                  {getCartTotal().toFixed(2)} €
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Valider la commande
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
