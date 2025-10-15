import { useState } from "react";
import ClientSidebar from "../components/ClientSidebar";
import ClientHeader from "../components/ClientHeader";
import ClientProducts from "../components/ClientProducts";
import ClientCart from "../components/ClientCart";
import ClientProfile from "../components/ClientProfile";
import ClientOrders from "../components/ClientOrders";

export default function ClientDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState("products");

  const renderContent = () => {
    switch (activeView) {
      case "products":
        return <ClientProducts />;
      case "cart":
        return <ClientCart />;
      case "orders":
        return <ClientOrders />;
      case "profile":
        return <ClientProfile />;
      default:
        return <ClientProducts />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <ClientSidebar
        isOpen={isSidebarOpen}
        activeView={activeView}
        setActiveView={setActiveView}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <ClientHeader toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
