import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import OrderItem from "./OrderItem";
import { api } from "../api/axios";

export default function RecentOrders() {
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await api.get("/commandes", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Get the 5 most recent orders
        const orders = response.data
          .sort((a, b) => new Date(b.dateCommande) - new Date(a.dateCommande))
          .slice(0, 5)
          .map((order) => ({
            id: order.numeroCommande,
            client: `${order.client?.prenom || ""} ${
              order.client?.nom || "Client"
            }`,
            status: getStatusLabel(order.statutCommande),
            statusColor: getStatusColor(order.statutCommande),
            amount: order.totalCommande,
            date: new Date(order.dateCommande).toLocaleDateString("fr-FR"),
          }));

        setRecentOrders(orders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();

    // Refresh every 30 seconds for real-time updates
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusLabel = (status) => {
    const labels = {
      EN_ATTENTE: "En attente",
      CONFIRMEE: "Confirmée",
      EN_PREPARATION: "En préparation",
      EXPEDIEE: "Expédiée",
      LIVREE: "Livrée",
      ANNULEE: "Annulée",
    };
    return labels[status] || status;
  };

  const getStatusColor = (status) => {
    const colors = {
      EN_ATTENTE: "yellow",
      CONFIRMEE: "blue",
      EN_PREPARATION: "purple",
      EXPEDIEE: "indigo",
      LIVREE: "green",
      ANNULEE: "red",
    };
    return colors[status] || "gray";
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Commandes récentes
        </h2>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
      <div className="space-y-4">
        {recentOrders.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            Aucune commande récente
          </p>
        ) : (
          recentOrders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))
        )}
      </div>
    </div>
  );
}
