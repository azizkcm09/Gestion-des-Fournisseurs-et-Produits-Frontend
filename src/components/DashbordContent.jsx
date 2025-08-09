import React from "react";
import StatsGrid from "./StatGrid";
import RecentOrders from "./RecentOrders";
import RecentAlerts from "./RecentAlertes";
export default function DashboardContent() {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Stats Grid */}
      <StatsGrid />

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <RecentOrders />

        {/* Recent Alerts */}
        <RecentAlerts />
      </div>
    </div>
  );
}
