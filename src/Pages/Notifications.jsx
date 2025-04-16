import { useEffect, useState } from "react";
import { markNotificationAsRead } from "../api/authAPI";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    const res = await fetch(`${API_URL}/notification`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setNotifications(data || []);
  };

  const handleMarkAsRead = async (id) => {
    await markNotificationAsRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <section className="p-4">
      <h2 className="text-4xl font-bold mb-4">🔔 Notifications</h2>
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`p-4 border rounded mb-4 ${
            n.isRead ? "bg-gray-200" : "bg-white"
          }`}
        >
          <p>{n.message}</p>
          <button
            onClick={() => handleMarkAsRead(n.id)}
            className="mt-2 text-sm bg-green-600 text-white px-3 py-1 rounded"
            disabled={n.isRead}
          >
            {n.isRead ? "Read" : "Mark as Read"}
          </button>
        </div>
      ))}
    </section>
  );
};

export default Notifications;
