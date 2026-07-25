import { useEffect, useState } from "react";
import {
    Package,
    Clock,
    CheckCircle,
    XCircle,
    Truck,
    Utensils,
    User,
    IndianRupee,
    Calendar,
    Filter,
    Search,
    ChevronDown,
    Eye,
    ArrowRight,
    AlertCircle,
    Loader,
    TrendingUp
} from "lucide-react";
import toast from "react-hot-toast";

import ownerOrderService from "../../services/ownerOrderService";

function Orders() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, []);
    const user = JSON.parse(localStorage.getItem("user"));
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [updatingOrderId, setUpdatingOrderId] = useState(null);

    useEffect(() => {
        loadOrders();
    }, []);

    useEffect(() => {
        filterOrders();
    }, [orders, searchTerm, statusFilter]);

    const loadOrders = async () => {
        try {
            setLoading(true);
            const data = await ownerOrderService.getRestaurantOrders(
                user.restaurantId
            );
            setOrders(data);
            setFilteredOrders(data);
        } catch (error) {
            console.error(error);
            toast.error("Unable to load restaurant orders");
        } finally {
            setLoading(false);
        }
    };

    const filterOrders = () => {
        let filtered = [...orders];

        if (statusFilter !== "ALL") {
            filtered = filtered.filter(order => order.orderStatus === statusFilter);
        }

        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(order =>
                order.orderNumber?.toLowerCase().includes(term) ||
                order.userName?.toLowerCase().includes(term) ||
                order.orderId?.toString().includes(term)
            );
        }

        setFilteredOrders(filtered);
    };

    const updateStatus = async (orderId, status) => {
        try {
            setUpdatingOrderId(orderId);
            await ownerOrderService.updateOrderStatus(orderId, status);
            toast.success("Order Updated Successfully");
            loadOrders();
        } catch (error) {
            console.error(error);
            toast.error("Unable to update order");
        } finally {
            setUpdatingOrderId(null);
        }
    };

    const getStatusConfig = (status) => {
        const statusMap = {
            "PLACED": { label: "Placed", color: "#f59e0b", bg: "#fef3c7", icon: Clock },
            "CONFIRMED": { label: "Confirmed", color: "#3b82f6", bg: "#dbeafe", icon: CheckCircle },
            "PREPARING": { label: "Preparing", color: "#8b5cf6", bg: "#ede9fe", icon: Utensils },
            "OUT_FOR_DELIVERY": { label: "Out for Delivery", color: "#f97316", bg: "#ffedd5", icon: Truck },
            "DELIVERED": { label: "Delivered", color: "#22c55e", bg: "#dcfce7", icon: CheckCircle },
            "CANCELLED": { label: "Cancelled", color: "#ef4444", bg: "#fee2e2", icon: XCircle }
        };
        return statusMap[status] || { label: status, color: "#6b7280", bg: "#f3f4f6", icon: AlertCircle };
    };

    const getStatusOptions = () => {
        const statuses = ["ALL", "PLACED", "CONFIRMED", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"];
        return statuses;
    };

    const stats = {
        total: orders.length,
        placed: orders.filter(o => o.orderStatus === "PLACED").length,
        confirmed: orders.filter(o => o.orderStatus === "CONFIRMED").length,
        preparing: orders.filter(o => o.orderStatus === "PREPARING").length,
        delivered: orders.filter(o => o.orderStatus === "DELIVERED").length,
        cancelled: orders.filter(o => o.orderStatus === "CANCELLED").length
    };

    const styles = {
        container: {
            padding: '24px'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '24px'
        },
        headerLeft: {
            display: 'flex',
            flexDirection: 'column'
        },
        title: {
            fontSize: '28px',
            fontWeight: '800',
            color: '#0f172a',
            margin: 0
        },
        subtitle: {
            fontSize: '14px',
            color: '#94a3b8',
            marginTop: '4px'
        },
        statsRow: {
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: '12px',
            marginBottom: '24px'
        },
        statCard: (color, bgColor) => ({
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '14px 18px',
            border: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
        }),
        statIcon: (color, bgColor) => ({
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            backgroundColor: bgColor,
            color: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }),
        statLabel: {
            fontSize: '12px',
            color: '#94a3b8',
            fontWeight: '500'
        },
        statValue: {
            fontSize: '20px',
            fontWeight: '700',
            color: '#0f172a'
        },
        filters: {
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginBottom: '24px'
        },
        searchWrapper: {
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '0 16px',
            border: '1px solid #e2e8f0',
            transition: 'all 0.3s ease',
            flex: 1
        },
        searchInput: {
            flex: 1,
            padding: '12px 12px',
            border: 'none',
            outline: 'none',
            fontSize: '14px',
            backgroundColor: 'transparent',
            color: '#0f172a'
        },
        filterGroup: {
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            alignItems: 'center'
        },
        filterBtn: (active) => ({
            padding: '6px 14px',
            borderRadius: '50px',
            border: active ? 'none' : '1px solid #e2e8f0',
            backgroundColor: active ? '#f97316' : '#ffffff',
            color: active ? '#ffffff' : '#475569',
            fontWeight: active ? '600' : '500',
            fontSize: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
        }),
        orderCard: {
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid #f1f5f9',
            marginBottom: '16px',
            transition: 'all 0.3s ease'
        },
        orderHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '12px'
        },
        orderLeft: {
            flex: 1
        },
        orderNumber: {
            fontSize: '18px',
            fontWeight: '700',
            color: '#0f172a',
            margin: 0
        },
        orderMeta: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            marginTop: '4px'
        },
        orderMetaItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            color: '#64748b'
        },
        orderRight: {
            textAlign: 'right'
        },
        orderAmount: {
            fontSize: '22px',
            fontWeight: '800',
            color: '#f97316'
        },
        orderTime: {
            fontSize: '13px',
            color: '#94a3b8'
        },
        orderBody: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '1px solid #f1f5f9'
        },
        statusBadge: (status) => {
            const config = getStatusConfig(status);
            return {
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 16px',
                borderRadius: '50px',
                backgroundColor: config.bg,
                color: config.color,
                fontWeight: '600',
                fontSize: '13px'
            };
        },
        statusSelect: {
            padding: '8px 16px',
            borderRadius: '10px',
            border: '2px solid #e2e8f0',
            fontSize: '13px',
            fontWeight: '500',
            color: '#0f172a',
            backgroundColor: '#ffffff',
            cursor: 'pointer',
            outline: 'none',
            transition: 'all 0.3s ease',
            minWidth: '160px'
        },
        loadingContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh'
        },
        loadingSpinner: {
            width: '48px',
            height: '48px',
            border: '4px solid #e2e8f0',
            borderTop: '4px solid #f97316',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
        },
        emptyState: {
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #f1f5f9'
        },
        emptyIcon: {
            fontSize: '48px',
            opacity: 0.3,
            marginBottom: '12px'
        },
        emptyTitle: {
            fontSize: '20px',
            fontWeight: '700',
            color: '#0f172a',
            margin: 0
        },
        emptySub: {
            color: '#94a3b8',
            marginTop: '4px'
        },
        updatingIndicator: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            color: '#94a3b8'
        }
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={{ textAlign: 'center' }}>
                    <div style={styles.loadingSpinner}></div>
                    <p style={{ color: '#94a3b8', marginTop: '16px' }}>Loading Orders...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <h1 style={styles.title}>📦 Restaurant Orders</h1>
                    <p style={styles.subtitle}>Manage all your restaurant orders</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '14px', color: '#94a3b8' }}>
                        Total: <strong style={{ color: '#0f172a' }}>{orders.length}</strong>
                    </span>
                </div>
            </div>

            {/* Stats */}
            <div style={styles.statsRow} className="sm:grid-cols-3 lg:grid-cols-6">
                <div style={styles.statCard("#f97316", "#fff7ed")}>
                    <div style={styles.statIcon("#f97316", "#fff7ed")}>
                        <Package size={18} />
                    </div>
                    <div>
                        <div style={styles.statLabel}>Total</div>
                        <div style={styles.statValue}>{stats.total}</div>
                    </div>
                </div>
                <div style={styles.statCard("#f59e0b", "#fef3c7")}>
                    <div style={styles.statIcon("#f59e0b", "#fef3c7")}>
                        <Clock size={18} />
                    </div>
                    <div>
                        <div style={styles.statLabel}>Placed</div>
                        <div style={styles.statValue}>{stats.placed}</div>
                    </div>
                </div>
                <div style={styles.statCard("#3b82f6", "#dbeafe")}>
                    <div style={styles.statIcon("#3b82f6", "#dbeafe")}>
                        <CheckCircle size={18} />
                    </div>
                    <div>
                        <div style={styles.statLabel}>Confirmed</div>
                        <div style={styles.statValue}>{stats.confirmed}</div>
                    </div>
                </div>
                <div style={styles.statCard("#8b5cf6", "#ede9fe")}>
                    <div style={styles.statIcon("#8b5cf6", "#ede9fe")}>
                        <Utensils size={18} />
                    </div>
                    <div>
                        <div style={styles.statLabel}>Preparing</div>
                        <div style={styles.statValue}>{stats.preparing}</div>
                    </div>
                </div>
                <div style={styles.statCard("#22c55e", "#dcfce7")}>
                    <div style={styles.statIcon("#22c55e", "#dcfce7")}>
                        <CheckCircle size={18} />
                    </div>
                    <div>
                        <div style={styles.statLabel}>Delivered</div>
                        <div style={styles.statValue}>{stats.delivered}</div>
                    </div>
                </div>
                <div style={styles.statCard("#ef4444", "#fee2e2")}>
                    <div style={styles.statIcon("#ef4444", "#fee2e2")}>
                        <XCircle size={18} />
                    </div>
                    <div>
                        <div style={styles.statLabel}>Cancelled</div>
                        <div style={styles.statValue}>{stats.cancelled}</div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div style={styles.filters}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <div style={styles.searchWrapper}>
                            <Search size={18} color="#94a3b8" />
                            <input
                                type="text"
                                placeholder="Search by order number or customer..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={styles.searchInput}
                            />
                        </div>
                    </div>
                    <div style={styles.filterGroup}>
                        {getStatusOptions().map((status) => (
                            <button
                                key={status}
                                style={styles.filterBtn(statusFilter === status)}
                                onClick={() => setStatusFilter(status)}
                            >
                                {status === "ALL" ? "All" : status.replace("_", " ")}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
                <div style={styles.emptyState}>
                    <div style={styles.emptyIcon}>📦</div>
                    <h2 style={styles.emptyTitle}>No Orders Found</h2>
                    <p style={styles.emptySub}>
                        {searchTerm || statusFilter !== "ALL" 
                            ? "Try adjusting your filters" 
                            : "Start receiving orders to see them here"}
                    </p>
                </div>
            ) : (
                <div>
                    {filteredOrders.map((order) => {
                        const StatusIcon = getStatusConfig(order.orderStatus).icon;
                        const isUpdating = updatingOrderId === order.orderId;

                        return (
                            <div
                                key={order.orderId}
                                style={styles.orderCard}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)';
                                    e.currentTarget.style.borderColor = '#fed7aa';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.borderColor = '#f1f5f9';
                                }}
                            >
                                <div style={styles.orderHeader}>
                                    <div style={styles.orderLeft}>
                                        <h3 style={styles.orderNumber}>
                                            #{order.orderNumber || order.orderId}
                                        </h3>
                                        <div style={styles.orderMeta}>
                                            <span style={styles.orderMetaItem}>
                                                <User size={14} />
                                                {order.userName || "Customer"}
                                            </span>
                                            <span style={styles.orderMetaItem}>
                                                <Clock size={14} />
                                                {order.paymentMethod || "COD"}
                                            </span>
                                            <span style={styles.orderMetaItem}>
                                                <Package size={14} />
                                                {order.orderItems?.length || 0} items
                                            </span>
                                        </div>
                                    </div>
                                    <div style={styles.orderRight}>
                                        <div style={styles.orderAmount}>₹{order.finalAmount || order.totalAmount}</div>
                                        <div style={styles.orderTime}>
                                            {order.orderTime 
                                                ? new Date(order.orderTime).toLocaleDateString('en-IN', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })
                                                : "N/A"}
                                        </div>
                                    </div>
                                </div>

                                <div style={styles.orderBody}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                                        <select
                                            value={order.orderStatus}
                                            onChange={(e) => updateStatus(order.orderId, e.target.value)}
                                            disabled={isUpdating}
                                            style={styles.statusSelect}
                                            onFocus={(e) => {
                                                e.currentTarget.style.borderColor = '#f97316';
                                                e.currentTarget.style.boxShadow = '0 0 0 4px rgba(249,115,22,0.1)';
                                            }}
                                            onBlur={(e) => {
                                                e.currentTarget.style.borderColor = '#e2e8f0';
                                                e.currentTarget.style.boxShadow = 'none';
                                            }}
                                        >
                                            <option value="PLACED">Placed</option>
                                            <option value="CONFIRMED">Confirmed</option>
                                            <option value="PREPARING">Preparing</option>
                                            <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                                            <option value="DELIVERED">Delivered</option>
                                            <option value="CANCELLED">Cancelled</option>
                                        </select>
                                        {isUpdating && (
                                            <span style={styles.updatingIndicator}>
                                                <Loader size={14} className="animate-spin" />
                                                Updating...
                                            </span>
                                        )}
                                    </div>
                                    <div style={styles.statusBadge(order.orderStatus)}>
                                        <StatusIcon size={14} />
                                        {getStatusConfig(order.orderStatus).label}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    @media (min-width: 640px) {
                        .stats-row {
                            grid-template-columns: repeat(3, 1fr) !important;
                        }
                    }
                    @media (min-width: 1024px) {
                        .stats-row {
                            grid-template-columns: repeat(6, 1fr) !important;
                        }
                    }
                    .animate-spin {
                        animation: spin 0.8s linear infinite;
                    }
                `}
            </style>
        </div>
    );
}

export default Orders;