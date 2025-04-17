import React, { useState, useEffect } from 'react';
import { fetchPriceAlerts, deletePriceAlert, getAllUserNotifications, markNotificationAsRead } from '../api/authAPI';
import { Trash2 } from 'lucide-react';

const PriceAlerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchAlerts = async () => {
        setLoading(true);
        try {
            const [alertsData, notificationsData] = await Promise.all([fetchPriceAlerts(), getAllUserNotifications()]);
            setAlerts(alertsData || []);
            setNotifications(notificationsData || []);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (alertId) => {
        setLoading(true);
        try {
            await deletePriceAlert(alertId);
            setAlerts((prev) => prev.filter((alert) => alert.id !== alertId));
        } catch (error) {
            console.error('Error deleting price alert:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (notificationId, alertId) => {
        try {
            await markNotificationAsRead(notificationId);
            setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n)));
        } catch (error) {
            console.error('Failed to mark notification as read:', error);
        }
    };

    useEffect(() => {
        fetchAlerts();
    }, []);

    return (
        <section className="text-center pt-8 min-h-[70vh] px-4">
            <h2 className="text-5xl font-extrabold uppercase text-[#fc372d] mb-4">Pricing Alerts</h2>
            <p className="text-[#464646] font-semibold text-xl mb-8">🔔 Manage your alerts and notifications below.</p>

            {loading ? (
                <p className="text-lg font-semibold">Loading...</p>
            ) : alerts.length === 0 ? (
                <p className="text-gray-500 text-lg font-semibold">You haven’t saved any price alerts yet.</p>
            ) : (
                <div className="flex flex-col gap-8 items-center">
                    {alerts.map((alert) => {
                        const relatedNotifications = notifications.filter((n) => n.priceAlertId === alert.id);

                        return (
                            <div
                                key={alert.id}
                                className="card w-full max-w-7xl bg-white shadow-xl border border-gray-200 p-8 text-left text-base flex flex-col lg:flex-row"
                            >
                                {/* Column 1: Alert Info */}
                                <div className="lg:w-1/3 pr-6 border-r border-gray-200">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-3xl font-bold uppercase text-[#2c2c2c]">
                                            {alert.Product?.name || 'Unknown Product'}
                                        </h3>
                                        {relatedNotifications.length === 0 && (
                                            <button
                                                onClick={() => handleDelete(alert.id)}
                                                className="text-red-600 hover:text-red-800 transition"
                                                title="Delete Alert"
                                            >
                                                <Trash2 size={22} />
                                            </button>
                                        )}
                                    </div>
                                    <ul className="space-y-3 text-[#333] text-lg">
                                        <li>
                                            💶 <strong>Threshold:</strong> {alert.threshold} {alert.currency || '€'}
                                        </li>
                                        <li>
                                            🕒 <strong>Last Notified:</strong>{' '}
                                            {alert.lastNotifiedAt
                                                ? new Date(alert.lastNotifiedAt).toLocaleString()
                                                : 'Never'}
                                        </li>
                                        <li>
                                            💾 <strong>Storage:</strong> {alert.storage_gb} GB
                                        </li>
                                    </ul>
                                </div>

                                {/* Column 2: Notifications */}
                                <div className="lg:w-1/3 px-6 border-r border-gray-200 mt-6 lg:mt-0">
                                    <p className="font-semibold text-lg mb-3">🔔 Notifications:</p>

                                    {relatedNotifications.length > 0 ? (
                                        <ul className="space-y-3">
                                            {relatedNotifications.map((n) => (
                                                <li
                                                    key={n.id}
                                                    className={`p-3 border rounded-md ${
                                                        n.isRead ? 'bg-gray-100' : 'bg-yellow-50'
                                                    } text-base space-y-1`}
                                                >
                                                    <div>
                                                        💰 <strong>{n.price}€</strong> on{' '}
                                                        {new Date(n.createdAt).toLocaleString()}
                                                    </div>
                                                    {!n.isRead ? (
                                                        <button
                                                            className="btn btn-sm btn-outline btn-success mt-1"
                                                            onClick={() => handleMarkAsRead(n.id, alert.id)}
                                                        >
                                                            Mark as Read
                                                        </button>
                                                    ) : (
                                                        <span className="text-green-600 text-sm">✅ Read</span>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500 text-base italic">
                                            No notifications yet for this alert.
                                        </p>
                                    )}
                                </div>

                                {/* Column 3: Enriched Notification Data */}
                                <div className="lg:w-1/3 pl-6 mt-6 lg:mt-0">
                                    <p className="font-semibold text-lg mb-3">📦 Notification Details:</p>

                                    {relatedNotifications.length > 0 ? (
                                        <ul className="space-y-3">
                                            {relatedNotifications.map((n) => (
                                                <li key={n.id} className="border rounded-md p-3 bg-gray-50">
                                                    {n.productImage && (
                                                        <img
                                                            src={n.productImage}
                                                            alt="Product"
                                                            className="w-24 h-24 object-contain rounded mb-2"
                                                        />
                                                    )}
                                                    <div>
                                                        <strong>Store:</strong> {n.storeName || 'Unknown'}
                                                    </div>
                                                    <div>
                                                        <strong>Current Price:</strong>{' '}
                                                        {n.currentPrice ? `${n.currentPrice} €` : 'N/A'}
                                                    </div>
                                                    {n.productLink && (
                                                        <a
                                                            href={n.productLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 text-sm underline mt-1 inline-block"
                                                        >
                                                            View Product ↗
                                                        </a>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-400 italic">No extra data available.</p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
};

export default PriceAlerts;
