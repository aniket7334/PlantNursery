import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/orders");
      const data = await response.json();
      if (data.success) setOrders(data.orders);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, orderStatus) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderStatus }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setOrders(
          orders.map((o) =>
            o._id === orderId ? { ...o, orderStatus } : o
          )
        );
        if (selectedOrder?._id === orderId) {
          setSelectedOrder({ ...selectedOrder, orderStatus });
        }
        alert("Order status updated!");
      }
    } catch (error) {
      alert("Failed to update status!");
    }
  };

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

  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((o) => o.orderStatus === filterStatus);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950">
      <AdminSidebar />

      <div className="ml-64 flex-1 p-8">
        <h1 className="mb-6 text-3xl font-bold text-gray-800 dark:text-white">
          All Orders
        </h1>

        {/* Filter */}
        <div className="mb-6 flex gap-3 flex-wrap">
          {["all", "placed", "confirmed", "processing", "shipped", "delivered", "cancelled"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition ${
                  filterStatus === status
                    ? "bg-green-700 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-green-100"
                }`}
              >
                {status}
              </button>
            )
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Orders Table */}
          <div className="lg:col-span-2 rounded-xl bg-white dark:bg-gray-800 shadow-md overflow-hidden">
            {loading ? (
              <p className="p-6 text-gray-500">Loading orders...</p>
            ) : filteredOrders.length === 0 ? (
              <p className="p-6 text-gray-500">No orders found!</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr className="text-left text-gray-500 dark:text-gray-400">
                      <th className="px-4 py-3">Customer</th>
                      <th className="px-4 py-3">Items</th>
                      <th className="px-4 py-3">Total</th>
                      <th className="px-4 py-3">Payment</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr
                        key={order._id}
                        onClick={() => setSelectedOrder(order)}
                        className={`border-b dark:border-gray-700 cursor-pointer hover:bg-green-50 dark:hover:bg-gray-700 ${
                          selectedOrder?._id === order._id
                            ? "bg-green-50 dark:bg-gray-700"
                            : ""
                        }`}
                      >
                        <td className="px-4 py-3">
                          <p className="font-semibold text-gray-800 dark:text-white">
                            {order.customer.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                          {order.items.length} items
                        </td>
                        <td className="px-4 py-3 font-semibold text-green-700 dark:text-green-400">
                          ₹{order.totalAmount}
                        </td>
                        <td className="px-4 py-3 capitalize text-gray-600 dark:text-gray-400">
                          {order.paymentMethod}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2 py-1 text-xs font-semibold capitalize ${statusColor(order.orderStatus)}`}>
                            {order.orderStatus}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={order.orderStatus}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) =>
                              updateOrderStatus(order._id, e.target.value)
                            }
                            className="rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-2 py-1 text-xs outline-none"
                          >
                            <option value="placed">Placed</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Order Detail Panel */}
          <div className="rounded-xl bg-white dark:bg-gray-800 shadow-md p-6 h-fit">
            {selectedOrder ? (
              <>
                <h2 className="mb-4 text-lg font-bold text-gray-800 dark:text-white">
                  Order Details
                </h2>

                {/* Customer */}
                <div className="mb-4 rounded-lg bg-gray-50 dark:bg-gray-700 p-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Customer</p>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {selectedOrder.customer.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedOrder.customer.email}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedOrder.customer.phone}
                  </p>
                </div>

                {/* Address */}
                <div className="mb-4 rounded-lg bg-gray-50 dark:bg-gray-700 p-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Delivery Address</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {selectedOrder.deliveryAddress.addressLine}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {selectedOrder.deliveryAddress.city},{" "}
                    {selectedOrder.deliveryAddress.state} -{" "}
                    {selectedOrder.deliveryAddress.pincode}
                  </p>
                </div>

                {/* Items */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Items Ordered</p>
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="mb-2 flex items-center gap-3 rounded-lg bg-gray-50 dark:bg-gray-700 p-3"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800 dark:text-white">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          ₹{item.price} x {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Payment Summary */}
                <div className="rounded-lg bg-green-50 dark:bg-gray-700 p-4">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <span>Subtotal</span>
                    <span>₹{selectedOrder.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <span>Shipping</span>
                    <span>₹{selectedOrder.shippingCharge}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>Tax</span>
                    <span>₹{selectedOrder.tax}</span>
                  </div>
                  <div className="flex justify-between font-bold text-green-700 dark:text-green-400 border-t dark:border-gray-600 pt-2">
                    <span>Total</span>
                    <span>₹{selectedOrder.totalAmount}</span>
                  </div>
                  <p className="mt-2 text-xs capitalize text-gray-500 dark:text-gray-400">
                    Payment: {selectedOrder.paymentMethod} —{" "}
                    <span className={selectedOrder.paymentStatus === "paid" ? "text-green-600" : "text-yellow-600"}>
                      {selectedOrder.paymentStatus}
                    </span>
                  </p>
                </div>
              </>
            ) : (
              <p className="text-center text-gray-400 mt-8">
                Click an order to see details
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;