import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
    Package,
    Clock,
    Calendar,
    CreditCard,
    IndianRupee,
    Eye,
    XCircle,
    ShoppingBag,
    CheckCircle,
    Truck,
    AlertCircle,
    ArrowRight,
    Filter
} from "lucide-react";

import orderService from "../../services/orderService";

function Orders() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, []);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("ALL");
    const [cancelling, setCancelling] = useState(null);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const data = await orderService.getOrdersByUser(user.userId);
            setOrders(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    const cancelOrder = async (orderId) => {
        const confirm = window.confirm("Are you sure you want to cancel this order?");
        if (!confirm) return;

        try {
            setCancelling(orderId);
            await orderService.cancelOrder(orderId);
            toast.success("Order Cancelled");
            loadOrders();
        } catch (error) {
            console.error(error);
            toast.error("Unable to cancel order");
        } finally {
            setCancelling(null);
        }
    };

    const getStatusConfig = (status) => {
        const statusMap = {
            "PENDING": { label: "Pending", color: "#f59e0b", bg: "#fef3c7", icon: Clock },
            "CONFIRMED": { label: "Confirmed", color: "#3b82f6", bg: "#dbeafe", icon: Package },
            "PREPARING": { label: "Preparing", color: "#8b5cf6", bg: "#ede9fe", icon: Package },
            "OUT_FOR_DELIVERY": { label: "Out for Delivery", color: "#f97316", bg: "#ffedd5", icon: Truck },
            "DELIVERED": { label: "Delivered", color: "#22c55e", bg: "#dcfce7", icon: CheckCircle },
            "CANCELLED": { label: "Cancelled", color: "#ef4444", bg: "#fee2e2", icon: XCircle }
        };
        return statusMap[status] || { label: status, color: "#6b7280", bg: "#f3f4f6", icon: AlertCircle };
    };

    const getFilteredOrders = () => {
        if (filter === "ALL") return orders;
        if (filter === "ACTIVE") {
            return orders.filter(o => !["DELIVERED", "CANCELLED"].includes(o.orderStatus));
        }
        return orders.filter(o => o.orderStatus === filter);
    };

    const filteredOrders = getFilteredOrders();

    const styles = {
        container: {
            backgroundColor: '#f8fafc',
            minHeight: '100vh',
            padding: '32px 16px'
        },
        innerContainer: {
            maxWidth: '1000px',
            margin: '0 auto'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '32px'
        },
        pageTitle: {
            fontSize: '28px',
            fontWeight: '800',
            color: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            margin: 0
        },
        filterContainer: {
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap'
        },
        filterBtn: (isActive) => ({
            padding: '8px 18px',
            borderRadius: '50px',
            border: isActive ? 'none' : '1px solid #e2e8f0',
            backgroundColor: isActive ? '#f97316' : '#ffffff',
            color: isActive ? '#ffffff' : '#475569',
            fontWeight: '600',
            fontSize: '13px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
        }),
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
        emptyContainer: {
            textAlign: 'center',
            padding: '60px 20px'
        },
        emptyIcon: {
            fontSize: '64px',
            marginBottom: '16px',
            opacity: 0.3
        },
        emptyTitle: {
            fontSize: '24px',
            fontWeight: '700',
            color: '#0f172a',
            margin: 0
        },
        emptySub: {
            color: '#94a3b8',
            marginTop: '8px'
        },
        orderCard: {
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
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
        restaurantName: {
            fontSize: '20px',
            fontWeight: '700',
            color: '#0f172a',
            margin: 0
        },
        orderMeta: {
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginTop: '4px',
            flexWrap: 'wrap'
        },
        orderNumber: {
            fontSize: '14px',
            color: '#94a3b8',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
        },
        orderDate: {
            fontSize: '14px',
            color: '#94a3b8',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
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
                fontSize: '13px',
                flexShrink: 0
            };
        },
        orderDetails: {
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: '16px',
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '1px solid #f1f5f9'
        },
        detailItem: {
            display: 'flex',
            flexDirection: 'column',
            gap: '2px'
        },
        detailLabel: {
            fontSize: '12px',
            color: '#94a3b8',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
        },
        detailValue: {
            fontSize: '15px',
            fontWeight: '600',
            color: '#0f172a'
        },
        detailValueOrange: {
            fontSize: '18px',
            fontWeight: '700',
            color: '#f97316'
        },
        orderActions: {
            display: 'flex',
            gap: '12px',
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '1px solid #f1f5f9',
            flexWrap: 'wrap'
        },
        viewBtn: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 24px',
            borderRadius: '12px',
            backgroundColor: '#f97316',
            color: 'white',
            border: 'none',
            fontWeight: '600',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
        },
        cancelBtn: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 24px',
            borderRadius: '12px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            fontWeight: '600',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
        },
        cancelBtnDisabled: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 24px',
            borderRadius: '12px',
            backgroundColor: '#94a3b8',
            color: 'white',
            border: 'none',
            fontWeight: '600',
            fontSize: '14px',
            cursor: 'not-allowed',
            opacity: 0.6
        },
        orderItems: {
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            marginTop: '8px'
        },
        itemTag: {
            fontSize: '13px',
            color: '#64748b',
            backgroundColor: '#f1f5f9',
            padding: '2px 12px',
            borderRadius: '50px'
        },
        reorderBtn: {
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 20px',
            borderRadius: '12px',
            backgroundColor: '#22c55e',
            color: 'white',
            border: 'none',
            fontWeight: '600',
            fontSize: '13px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
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
            <div style={styles.innerContainer}>
                {/* Header */}
                <div style={styles.header}>
                    <h1 style={styles.pageTitle}>
                        <ShoppingBag size={28} color="#f97316" />
                        My Orders
                    </h1>
                    <div style={styles.filterContainer}>
                        <button
                            style={styles.filterBtn(filter === "ALL")}
                            onClick={() => setFilter("ALL")}
                            onMouseEnter={(e) => {
                                if (filter !== "ALL") {
                                    e.currentTarget.style.backgroundColor = '#f1f5f9';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (filter !== "ALL") {
                                    e.currentTarget.style.backgroundColor = '#ffffff';
                                }
                            }}
                        >
                            All
                        </button>
                        <button
                            style={styles.filterBtn(filter === "ACTIVE")}
                            onClick={() => setFilter("ACTIVE")}
                            onMouseEnter={(e) => {
                                if (filter !== "ACTIVE") {
                                    e.currentTarget.style.backgroundColor = '#f1f5f9';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (filter !== "ACTIVE") {
                                    e.currentTarget.style.backgroundColor = '#ffffff';
                                }
                            }}
                        >
                            Active
                        </button>
                        <button
                            style={styles.filterBtn(filter === "DELIVERED")}
                            onClick={() => setFilter("DELIVERED")}
                            onMouseEnter={(e) => {
                                if (filter !== "DELIVERED") {
                                    e.currentTarget.style.backgroundColor = '#f1f5f9';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (filter !== "DELIVERED") {
                                    e.currentTarget.style.backgroundColor = '#ffffff';
                                }
                            }}
                        >
                            Delivered
                        </button>
                        <button
                            style={styles.filterBtn(filter === "CANCELLED")}
                            onClick={() => setFilter("CANCELLED")}
                            onMouseEnter={(e) => {
                                if (filter !== "CANCELLED") {
                                    e.currentTarget.style.backgroundColor = '#f1f5f9';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (filter !== "CANCELLED") {
                                    e.currentTarget.style.backgroundColor = '#ffffff';
                                }
                            }}
                        >
                            Cancelled
                        </button>
                    </div>
                </div>

                {/* Orders List */}
                {filteredOrders.length === 0 ? (
                    <div style={styles.emptyContainer}>
                        <div style={styles.emptyIcon}>📦</div>
                        <h2 style={styles.emptyTitle}>No Orders Found</h2>
                        <p style={styles.emptySub}>
                            {filter === "ALL" 
                                ? "You haven't placed any orders yet." 
                                : `No ${filter.toLowerCase()} orders found.`}
                        </p>
                    </div>
                ) : (
                    <div>
                        {filteredOrders.map((order) => {
                            const statusConfig = getStatusConfig(order.orderStatus);
                            const StatusIcon = statusConfig.icon;
                            const canCancel = !["DELIVERED", "CANCELLED", "OUT_FOR_DELIVERY"].includes(order.orderStatus);
                            const isCancelling = cancelling === order.orderId;

                            return (
                                <div
                                    key={order.orderId}
                                    style={styles.orderCard}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)';
                                        e.currentTarget.style.borderColor = '#fed7aa';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
                                        e.currentTarget.style.borderColor = '#f1f5f9';
                                    }}
                                >
                                    {/* Header */}
                                    <div style={styles.orderHeader}>
                                        <div style={styles.orderLeft}>
                                            <h2 style={styles.restaurantName}>{order.restaurantName}</h2>
                                            <div style={styles.orderMeta}>
                                                <span style={styles.orderNumber}>
                                                    <Package size={14} />
                                                    #{order.orderNumber}
                                                </span>
                                                <span style={styles.orderDate}>
                                                    <Calendar size={14} />
                                                    {new Date(order.orderTime).toLocaleDateString('en-IN', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                                <span style={styles.orderDate}>
                                                    <Clock size={14} />
                                                    {new Date(order.orderTime).toLocaleTimeString('en-IN', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                        <div style={styles.statusBadge(order.orderStatus)}>
                                            <StatusIcon size={14} />
                                            {statusConfig.label}
                                        </div>
                                    </div>

                                    {/* Items Preview */}
                                    <div style={styles.orderItems}>
                                        {order.orderItems && order.orderItems.slice(0, 3).map((item, idx) => (
                                            <span key={idx} style={styles.itemTag}>
                                                {item.menuItemName}
                                            </span>
                                        ))}
                                        {order.orderItems && order.orderItems.length > 3 && (
                                            <span style={styles.itemTag}>
                                                +{order.orderItems.length - 3} more
                                            </span>
                                        )}
                                    </div>

                                    {/* Details */}
                                    <div style={styles.orderDetails}>
                                        <div style={styles.detailItem}>
                                            <span style={styles.detailLabel}>Payment Method</span>
                                            <span style={styles.detailValue}>{order.paymentMethod || 'Cash on Delivery'}</span>
                                        </div>
                                        <div style={styles.detailItem}>
                                            <span style={styles.detailLabel}>Total Amount</span>
                                            <span style={styles.detailValueOrange}>₹{order.finalAmount}</span>
                                        </div>
                                        <div style={styles.detailItem}>
                                            <span style={styles.detailLabel}>Items</span>
                                            <span style={styles.detailValue}>{order.orderItems?.length || 0} items</span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div style={styles.orderActions}>
                                        <button
                                            style={styles.viewBtn}
                                            onClick={() => navigate(`/orders/${order.orderId}`)}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = '#ea580c';
                                                e.currentTarget.style.transform = 'scale(1.02)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = '#f97316';
                                                e.currentTarget.style.transform = 'scale(1)';
                                            }}
                                        >
                                            <Eye size={16} />
                                            View Details
                                        </button>

                                        {/*{order.orderStatus === "DELIVERED" && (
                                           
                                           <button
                                                style={styles.reorderBtn}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = '#16a34a';
                                                    e.currentTarget.style.transform = 'scale(1.02)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = '#22c55e';
                                                    e.currentTarget.style.transform = 'scale(1)';
                                                }}
                                            >
                                                <ArrowRight size={16} />
                                                Reorder
                                            </button> 
                                        )} */}

                                        {canCancel && (
                                            <button
                                                style={isCancelling ? styles.cancelBtnDisabled : styles.cancelBtn}
                                                onClick={() => cancelOrder(order.orderId)}
                                                disabled={isCancelling}
                                                onMouseEnter={(e) => {
                                                    if (!isCancelling) {
                                                        e.currentTarget.style.backgroundColor = '#dc2626';
                                                        e.currentTarget.style.transform = 'scale(1.02)';
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (!isCancelling) {
                                                        e.currentTarget.style.backgroundColor = '#ef4444';
                                                        e.currentTarget.style.transform = 'scale(1)';
                                                    }
                                                }}
                                            >
                                                <XCircle size={16} />
                                                {isCancelling ? 'Cancelling...' : 'Cancel Order'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    @media (min-width: 640px) {
                        .order-details-grid {
                            grid-template-columns: repeat(3, 1fr) !important;
                        }
                    }
                `}
            </style>
        </div>
    );
}

export default Orders;