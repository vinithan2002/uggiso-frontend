import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
    ArrowLeft,
    Clock,
    MapPin,
    Calendar,
    CreditCard,
    Receipt,
    Package,
    Truck,
    CheckCircle,
    XCircle,
    AlertCircle,
    ShoppingBag,
    IndianRupee
} from "lucide-react";

import orderService from "../../services/orderService";

function OrderDetails() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, []);
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cancelling, setCancelling] = useState(false);

    useEffect(() => {
        loadOrder();
    }, []);

    const loadOrder = async () => {
        try {
            const response = await orderService.getOrderById(orderId);
            setOrder(response);
        } catch (error) {
            console.error(error);
            toast.error("Unable to load order");
        } finally {
            setLoading(false);
        }
    };

    const cancelOrder = async () => {
        const confirm = window.confirm("Are you sure you want to cancel this order?");
        if (!confirm) return;

        try {
            setCancelling(true);
            await orderService.cancelOrder(order.orderId);
            toast.success("Order Cancelled");
            navigate("/orders");
        } catch (error) {
            console.error(error);
            toast.error("Unable to cancel order");
        } finally {
            setCancelling(false);
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

    const styles = {
        container: {
            backgroundColor: '#f8fafc',
            minHeight: '100vh',
            padding: '32px 16px'
        },
        innerContainer: {
            maxWidth: '900px',
            margin: '0 auto'
        },
        backBtn: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#475569',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            padding: '8px 16px',
            borderRadius: '10px',
            transition: 'all 0.3s ease',
            marginBottom: '20px'
        },
        card: {
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            border: '1px solid #f1f5f9'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '24px'
        },
        headerLeft: {
            flex: 1
        },
        restaurantName: {
            fontSize: '28px',
            fontWeight: '800',
            color: '#0f172a',
            margin: 0
        },
        orderNumber: {
            color: '#94a3b8',
            fontSize: '14px',
            marginTop: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        statusBadge: (status) => {
            const config = getStatusConfig(status);
            return {
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 20px',
                borderRadius: '50px',
                backgroundColor: config.bg,
                color: config.color,
                fontWeight: '700',
                fontSize: '14px',
                flexShrink: 0
            };
        },
        infoGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: '24px',
            margin: '24px 0',
            padding: '20px 0',
            borderTop: '1px solid #f1f5f9',
            borderBottom: '1px solid #f1f5f9'
        },
        infoItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
        },
        infoIcon: {
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            backgroundColor: '#f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748b',
            flexShrink: 0
        },
        infoContent: {
            flex: 1
        },
        infoLabel: {
            fontSize: '12px',
            color: '#94a3b8',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            margin: 0
        },
        infoValue: {
            fontSize: '15px',
            fontWeight: '600',
            color: '#0f172a',
            margin: 0
        },
        sectionTitle: {
            fontSize: '18px',
            fontWeight: '700',
            color: '#0f172a',
            margin: '24px 0 16px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        itemsList: {
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
        },
        itemRow: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 16px',
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            transition: 'background-color 0.3s ease'
        },
        itemLeft: {
            display: 'flex',
            flexDirection: 'column',
            gap: '2px'
        },
        itemName: {
            fontSize: '15px',
            fontWeight: '600',
            color: '#0f172a',
            margin: 0
        },
        itemMeta: {
            fontSize: '13px',
            color: '#94a3b8',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
        },
        itemRight: {
            textAlign: 'right'
        },
        itemPrice: {
            fontSize: '14px',
            color: '#64748b'
        },
        itemSubtotal: {
            fontSize: '16px',
            fontWeight: '700',
            color: '#0f172a'
        },
        amountGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: '8px',
            marginTop: '16px',
            padding: '16px',
            backgroundColor: '#f8fafc',
            borderRadius: '12px'
        },
        amountRow: {
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '14px',
            color: '#475569'
        },
        amountRowTotal: {
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '18px',
            fontWeight: '700',
            color: '#0f172a',
            paddingTop: '12px',
            borderTop: '2px solid #e2e8f0',
            marginTop: '4px'
        },
        cancelBtn: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '24px',
            padding: '14px 28px',
            borderRadius: '12px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            fontWeight: '600',
            fontSize: '15px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
        },
        cancelBtnDisabled: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '24px',
            padding: '14px 28px',
            borderRadius: '12px',
            backgroundColor: '#94a3b8',
            color: 'white',
            border: 'none',
            fontWeight: '600',
            fontSize: '15px',
            cursor: 'not-allowed',
            opacity: 0.6
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
        statusTimeline: {
            display: 'flex',
            alignItems: 'center',
            gap: '0',
            margin: '24px 0',
            padding: '16px 0',
            overflowX: 'auto'
        },
        timelineStep: (isActive, isCompleted) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
            minWidth: '80px',
            position: 'relative'
        }),
        timelineDot: (isActive, isCompleted) => ({
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: isActive ? '#f97316' : isCompleted ? '#22c55e' : '#e2e8f0',
            border: `3px solid ${isActive ? '#f97316' : isCompleted ? '#22c55e' : '#e2e8f0'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            transition: 'all 0.3s ease',
            zIndex: 2
        }),
        timelineLine: (isCompleted) => ({
            flex: 1,
            height: '3px',
            backgroundColor: isCompleted ? '#22c55e' : '#e2e8f0',
            margin: '0 -4px',
            zIndex: 1
        }),
        timelineLabel: {
            fontSize: '11px',
            fontWeight: '600',
            color: '#94a3b8',
            marginTop: '8px',
            textAlign: 'center'
        }
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={{ textAlign: 'center' }}>
                    <div style={styles.loadingSpinner}></div>
                    <p style={{ color: '#94a3b8', marginTop: '16px' }}>Loading Order Details...</p>
                </div>
            </div>
        );
    }

    if (!order) return null;

    const statusConfig = getStatusConfig(order.orderStatus);
    const StatusIcon = statusConfig.icon;
    const canCancel = !["DELIVERED", "CANCELLED", "OUT_FOR_DELIVERY"].includes(order.orderStatus);

    // Status timeline steps
    const statusSteps = ["PENDING", "CONFIRMED", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED"];
    const currentStepIndex = statusSteps.indexOf(order.orderStatus);
    const isOrderCancelled = order.orderStatus === "CANCELLED";

    return (
        <div style={styles.container}>
            <div style={styles.innerContainer}>
                <button
                    onClick={() => navigate(-1)}
                    style={styles.backBtn}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f1f5f9';
                        e.currentTarget.style.color = '#0f172a';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#475569';
                    }}
                >
                    <ArrowLeft size={18} />
                    Back to Orders
                </button>

                <div style={styles.card}>
                    {/* Header */}
                    <div style={styles.header}>
                        <div style={styles.headerLeft}>
                            <h1 style={styles.restaurantName}>{order.restaurantName}</h1>
                            <p style={styles.orderNumber}>
                                <Receipt size={14} />
                                Order # {order.orderNumber}
                            </p>
                        </div>
                        <div style={styles.statusBadge(order.orderStatus)}>
                            <StatusIcon size={16} />
                            {statusConfig.label}
                        </div>
                    </div>

                    {/* Status Timeline */}
                    {!isOrderCancelled && (
                        <div style={styles.statusTimeline}>
                            {statusSteps.map((step, index) => {
                                const isActive = index === currentStepIndex;
                                const isCompleted = index < currentStepIndex;
                                const stepConfig = getStatusConfig(step);
                                const StepIcon = stepConfig.icon;
                                return (
                                    <div key={step} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                        <div style={styles.timelineStep(isActive, isCompleted)}>
                                            <div style={styles.timelineDot(isActive, isCompleted)}>
                                                {isCompleted || isActive ? (
                                                    <StepIcon size={14} color={isActive ? '#ffffff' : '#ffffff'} />
                                                ) : (
                                                    <span style={{ color: '#94a3b8', fontSize: '12px' }}>{index + 1}</span>
                                                )}
                                            </div>
                                            <span style={styles.timelineLabel}>{stepConfig.label}</span>
                                        </div>
                                        {index < statusSteps.length - 1 && (
                                            <div style={styles.timelineLine(index < currentStepIndex)}></div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Info Grid */}
                    <div style={styles.infoGrid}>
                        <div style={styles.infoItem}>
                            <div style={styles.infoIcon}>
                                <Calendar size={18} />
                            </div>
                            <div style={styles.infoContent}>
                                <p style={styles.infoLabel}>Order Date</p>
                                <p style={styles.infoValue}>
                                    {new Date(order.orderTime).toLocaleDateString('en-IN', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>
                        </div>
                        <div style={styles.infoItem}>
                            <div style={styles.infoIcon}>
                                <CreditCard size={18} />
                            </div>
                            <div style={styles.infoContent}>
                                <p style={styles.infoLabel}>Payment Method</p>
                                <p style={styles.infoValue}>{order.paymentMethod || 'Cash on Delivery'}</p>
                            </div>
                        </div>
                        {order.deliveryAddress && (
                            <div style={styles.infoItem}>
                                <div style={styles.infoIcon}>
                                    <MapPin size={18} />
                                </div>
                                <div style={styles.infoContent}>
                                    <p style={styles.infoLabel}>Delivery Address</p>
                                    <p style={styles.infoValue}>{order.deliveryAddress}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Items */}
                    <h3 style={styles.sectionTitle}>
                        <ShoppingBag size={20} color="#f97316" />
                        Ordered Items
                    </h3>
                    <div style={styles.itemsList}>
                        {order.orderItems.map((item, index) => (
                            <div
                                key={item.orderItemId || index}
                                style={styles.itemRow}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                            >
                                <div style={styles.itemLeft}>
                                    <span style={styles.itemName}>{item.menuItemName}</span>
                                    <span style={styles.itemMeta}>
                                        <span>Qty: {item.quantity}</span>
                                        {item.veg ? <span>🟢 Veg</span> : <span>🔴 Non-Veg</span>}
                                    </span>
                                </div>
                                <div style={styles.itemRight}>
                                    <div style={styles.itemPrice}>₹{item.price} × {item.quantity}</div>
                                    <div style={styles.itemSubtotal}>₹{item.subTotal}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Amount Summary */}
                    <h3 style={styles.sectionTitle}>
                        <IndianRupee size={20} color="#f97316" />
                        Amount Summary
                    </h3>
                    <div style={styles.amountGrid}>
                        <div style={styles.amountRow}>
                            <span>Subtotal</span>
                            <span>₹{order.totalAmount}</span>
                        </div>
                        <div style={styles.amountRow}>
                            <span>Delivery Fee</span>
                            <span>₹{order.deliveryCharge || 0}</span>
                        </div>
                        <div style={styles.amountRow}>
                            <span>GST</span>
                            <span>₹{order.gst || 0}</span>
                        </div>
                        {order.discount > 0 && (
                            <div style={styles.amountRow}>
                                <span>Discount</span>
                                <span style={{ color: '#22c55e' }}>-₹{order.discount}</span>
                            </div>
                        )}
                        <div style={styles.amountRowTotal}>
                            <span>Total</span>
                            <span>₹{order.finalAmount}</span>
                        </div>
                    </div>

                    {/* Cancel Button */}
                    {canCancel && !isOrderCancelled && (
                        <button
                            onClick={cancelOrder}
                            disabled={cancelling}
                            style={cancelling ? styles.cancelBtnDisabled : styles.cancelBtn}
                            onMouseEnter={(e) => {
                                if (!cancelling) {
                                    e.currentTarget.style.backgroundColor = '#dc2626';
                                    e.currentTarget.style.transform = 'scale(1.02)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!cancelling) {
                                    e.currentTarget.style.backgroundColor = '#ef4444';
                                    e.currentTarget.style.transform = 'scale(1)';
                                }
                            }}
                        >
                            {cancelling ? 'Cancelling...' : (
                                <>
                                    <XCircle size={18} />
                                    Cancel Order
                                </>
                            )}
                        </button>
                    )}

                    {isOrderCancelled && (
                        <div style={{ 
                            marginTop: '24px',
                            padding: '14px 20px',
                            backgroundColor: '#fee2e2',
                            borderRadius: '12px',
                            color: '#dc2626',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontWeight: '500'
                        }}>
                            <XCircle size={18} />
                            This order has been cancelled
                        </div>
                    )}
                </div>
            </div>

            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    @media (min-width: 640px) {
                        .info-grid {
                            grid-template-columns: repeat(2, 1fr) !important;
                        }
                    }
                `}
            </style>
        </div>
    );
}

export default OrderDetails;