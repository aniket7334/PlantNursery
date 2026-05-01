import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import {
  FaShoppingBag,
  FaRupeeSign,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarDay,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchRecentOrders();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/orders/stats/summary"
      );
      const data = await response.json();
      if (data.success) setStats(data.stats);
    } catch (error) {
      console.error("Stats error:", error);
    }
  };

  const fetchRecentOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/orders");
      const data = await response.json();
      if (data.success) setRecentOrders(data.orders.slice(0, 5));
    } catch (error) {
      console.error("Orders error:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = stats
    ? [
        {
          label: "Total Orders",
          value: stats.totalOrders,
          icon: <FaShoppingBag className="text-2xl" />,
          bg: "bg-blue-600",
        },
        {
          label: "Total Revenue",
          value: `₹${stats.totalRevenue.toFixed(2)}`,
          icon: <FaRupeeSign className="text-2xl" />,
          bg: "bg-green-600",
        },
        {
          label: "Pending Orders",
          value: stats.pendingOrders,
          icon: <FaClock className="text-2xl" />,
          bg: "bg-yellow-600",
        },
        {
          label: "Delivered",
          value: stats.deliveredOrders,
          icon: <FaCheckCircle className="text-2xl" />,
          bg: "bg-teal-600",
        },
        {
          label: "Cancelled",
          value: stats.cancelledOrders,
          icon: <FaTimesCircle className="text-2xl" />,
          bg: "bg-red-600",
        },
        {
          label: "Today's Orders",
          value: stats.todayOrders,
          icon: <FaCalendarDay className="text-2xl" />,
          bg: "bg-purple-600",
        },
      ]
    : [];

  const chartData = [
    { name: "Total", value: stats?.totalOrders || 0 },
    { name: "Pending", value: stats?.pendingOrders || 0 },
    { name: "Delivered", value: stats?.deliveredOrders || 0 },
    { name: "Cancelled", value: stats?.cancelledOrders || 0 },
    { name: "Today", value: stats?.todayOrders || 0 },
  ];

  const statusColor = (status) => {
    switch (status) {
      case "placed": return "bg-blue-100 text-blue-700";
      case "confirmed": return "bg-yellow-100 text-yellow-700";
      case "processing": return "bg-orange-100 text-orange-700";
      case "shipped": return "bg-purple-100 text-purple-700";
      case "delivered": return "bg-green-100 text-green-700";
      case "cancelled": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950">
      <AdminSidebar />

      <div className="ml-64 flex-1 p-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-800 dark:text-white">
          Dashboard Overview
        </h1>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <>
            {/* Stat Cards */}
            <div className="mb-8 grid grid-cols-2 gap-6 lg:grid-cols-3">
              {statCards.map((card) => (
                <div
                  key={card.label}
                  className={`${card.bg} rounded-xl p-6 text-white shadow-md`}
                >
                  <div className="mb-3">{card.icon}</div>
                  <p className="text-3xl font-bold">{card.value}</p>
                  <p className="mt-1 text-sm opacity-90">{card.label}</p>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="mb-8 rounded-xl bg-white dark:bg-gray-800 p-6 shadow-md">
              <h2 className="mb-6 text-xl font-bold text-gray-800 dark:text-white">
                Orders Overview
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#16a34a" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Orders */}
            <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-md">
              <h2 className="mb-6 text-xl font-bold text-gray-800 dark:text-white">
                Recent Orders
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b dark:border-gray-600 text-left text-gray-500 dark:text-gray-400">
                      <th className="pb-3 pr-4">Customer</th>
                      <th className="pb-3 pr-4">Items</th>
                      <th className="pb-3 pr-4">Total</th>
                      <th className="pb-3 pr-4">Payment</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr
                        key={order._id}
                        className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="py-3 pr-4">
                          <p className="font-semibold text-gray-800 dark:text-white">
                            {order.customer.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {order.customer.phone}
                          </p>
                        </td>
                        <td className="py-3 pr-4 text-gray-600 dark:text-gray-400">
                          {order.items.length} items
                        </td>
                        <td className="py-3 pr-4 font-semibold text-green-700 dark:text-green-400">
                          ₹{order.totalAmount}
                        </td>
                        <td className="py-3 pr-4 capitalize text-gray-600 dark:text-gray-400">
                          {order.paymentMethod}
                        </td>
                        <td className="py-3">
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusColor(order.orderStatus)}`}>
                            {order.orderStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;