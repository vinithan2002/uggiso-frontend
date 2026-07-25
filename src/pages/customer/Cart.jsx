import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ShoppingCart,
    ArrowLeft,
    Plus,
    Minus,
    Trash2,
    Clock,
    Bike,
    Tag,
    CreditCard,
    ShieldCheck,
    Heart
} from "lucide-react";

import cartService from "../../services/cartService";
import toast from "react-hot-toast";

function Cart() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, []);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tax] = useState(0.05);
    const subtotal = cart?.totalAmount || 0;
    const deliveryFee = subtotal >= 299 ? 0 : 40;
    const taxAmount = subtotal * tax;
    const total = subtotal + deliveryFee + taxAmount;

    useEffect(() => {
        if (user) {
            loadCart();
        }
    }, []);

    const loadCart = async () => {
        try {
            setLoading(true);
            const response = await cartService.getCart(user.userId);
            setCart(response);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load cart");
        } finally {
            setLoading(false);
        }
    };

    const increaseQuantity = async (item) => {
        try {
            await cartService.updateCartItem(
                item.cartItemId,
                { quantity: item.quantity + 1 }
            );
            loadCart();
        } catch (error) {
            console.error(error);
        }
    };

    const decreaseQuantity = async (item) => {
        try {
            if (item.quantity === 1) {
                await cartService.removeItem(item.cartItemId);
            } else {
                await cartService.updateCartItem(
                    item.cartItemId,
                    { quantity: item.quantity - 1 }
                );
            }
            loadCart();
        } catch (error) {
            console.error(error);
        }
    };

    const clearCart = async () => {
        try {
            await cartService.clearCart(user.userId);
            window.dispatchEvent(new Event("cartUpdated"));
            toast.success("Cart Cleared");
            loadCart();
        } catch (error) {
            console.error(error);
        }
    };

    const styles = {
        container: {
            backgroundColor: '#f8fafc',
            minHeight: '100vh',
            padding: '32px 16px'
        },
        innerContainer: {
            maxWidth: '1200px',
            margin: '0 auto'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px',
            flexWrap: 'wrap',
            gap: '12px'
        },
        backBtn: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#f97316',
            fontWeight: '600',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '15px',
            transition: 'color 0.3s ease'
        },
        headerActions: {
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
        },
        clearBtn: {
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: '#ef4444',
            fontWeight: '500',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'color 0.3s ease',
            padding: '8px 16px',
            borderRadius: '50px',
            backgroundColor: '#fef2f2'
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '32px'
        },
        itemsSection: {
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
        },
        sectionTitle: {
            fontSize: '20px',
            fontWeight: '700',
            color: '#0f172a',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        itemCard: {
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '16px 20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            border: '1px solid #f1f5f9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            transition: 'all 0.3s ease'
        },
        itemInfo: {
            flex: 1
        },
        itemName: {
            fontSize: '17px',
            fontWeight: '700',
            color: '#0f172a',
            margin: 0
        },
        itemMeta: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '4px',
            flexWrap: 'wrap'
        },
        itemCuisine: {
            fontSize: '13px',
            color: '#94a3b8'
        },
        itemVegBadge: {
            fontSize: '11px',
            fontWeight: '600',
            padding: '2px 10px',
            borderRadius: '50px',
            backgroundColor: '#dcfce7',
            color: '#16a34a'
        },
        itemNonVegBadge: {
            fontSize: '11px',
            fontWeight: '600',
            padding: '2px 10px',
            borderRadius: '50px',
            backgroundColor: '#fee2e2',
            color: '#dc2626'
        },
        itemPrice: {
            fontSize: '18px',
            fontWeight: '700',
            color: '#f97316',
            marginTop: '6px'
        },
        itemOriginalPrice: {
            fontSize: '14px',
            color: '#94a3b8',
            textDecoration: 'line-through',
            marginLeft: '8px',
            fontWeight: '400'
        },
        quantityControls: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#f1f5f9',
            padding: '4px',
            borderRadius: '50px',
            flexShrink: 0
        },
        qtyBtn: {
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontWeight: '700',
            fontSize: '16px'
        },
        qtyBtnMinus: {
            backgroundColor: '#e2e8f0',
            color: '#475569'
        },
        qtyBtnDelete: {
            backgroundColor: '#ef4444',
            color: 'white'
        },
        qtyBtnPlus: {
            backgroundColor: '#22c55e',
            color: 'white'
        },
        qtyText: {
            fontSize: '16px',
            fontWeight: '700',
            color: '#0f172a',
            minWidth: '24px',
            textAlign: 'center'
        },
        summaryCard: {
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            border: '1px solid #f1f5f9',
            position: 'sticky',
            top: '100px',
            alignSelf: 'start'
        },
        summaryTitle: {
            fontSize: '20px',
            fontWeight: '700',
            color: '#0f172a',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        summaryRow: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px 0',
            fontSize: '15px',
            color: '#475569'
        },
        summaryRowBold: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '14px 0',
            fontSize: '18px',
            fontWeight: '700',
            color: '#0f172a',
            borderTop: '2px solid #f1f5f9',
            marginTop: '8px'
        },
        divider: {
            border: 'none',
            borderTop: '1px solid #f1f5f9',
            margin: '4px 0'
        },
        checkoutBtn: {
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #f97316, #ef4444)',
            color: 'white',
            border: 'none',
            fontWeight: '700',
            fontSize: '17px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            marginTop: '16px',
            boxShadow: '0 4px 14px rgba(249, 115, 22, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
        },
        emptyContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            textAlign: 'center'
        },
        emptyIcon: {
            width: '120px',
            height: '120px',
            color: '#f97316',
            opacity: 0.3
        },
        emptyTitle: {
            fontSize: '32px',
            fontWeight: '700',
            color: '#0f172a',
            marginTop: '16px'
        },
        emptySub: {
            color: '#94a3b8',
            marginTop: '8px',
            fontSize: '16px'
        },
        emptyBtn: {
            marginTop: '24px',
            padding: '12px 32px',
            borderRadius: '50px',
            backgroundColor: '#f97316',
            color: 'white',
            border: 'none',
            fontWeight: '600',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
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
        trustBadge: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#f1f5f9',
            padding: '10px 16px',
            borderRadius: '12px',
            fontSize: '13px',
            color: '#475569',
            marginTop: '16px'
        }
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div>
                    <div style={styles.loadingSpinner}></div>
                    <p style={{ color: '#94a3b8', marginTop: '16px' }}>Loading Cart...</p>
                </div>
            </div>
        );
    }

    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <div style={styles.emptyContainer}>
                <ShoppingCart style={styles.emptyIcon} />
                <h2 style={styles.emptyTitle}>Your Cart is Empty</h2>
                <p style={styles.emptySub}>Add delicious food to your cart.</p>
                <button
                    onClick={() => navigate("/")}
                    style={styles.emptyBtn}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ea580c'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f97316'}
                >
                    Browse Restaurants
                </button>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.innerContainer}>
                {/* Header */}
                <div style={styles.header}>
                    <button
                        onClick={() => navigate(-1)}
                        style={styles.backBtn}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#ea580c'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#f97316'}
                    >
                        <ArrowLeft size={20} />
                        Continue Shopping
                    </button>
                    <div style={styles.headerActions}>
                        <button
                            onClick={clearCart}
                            style={styles.clearBtn}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#fee2e2';
                                e.currentTarget.style.color = '#dc2626';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#fef2f2';
                                e.currentTarget.style.color = '#ef4444';
                            }}
                        >
                            <Trash2 size={16} />
                            Clear Cart
                        </button>
                    </div>
                </div>

                {/* Grid */}
                <div style={styles.grid} className="lg:grid-cols-3">
                    {/* Items */}
                    <div style={styles.itemsSection} className="lg:col-span-2">
                        <h3 style={styles.sectionTitle}>
                            <ShoppingCart size={20} color="#f97316" />
                            Cart Items ({cart.items.length})
                        </h3>
                        {cart.items.map((item, index) => (
                            <div
                                key={item.cartItemId || index}
                                style={styles.itemCard}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)';
                                    e.currentTarget.style.borderColor = '#fed7aa';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
                                    e.currentTarget.style.borderColor = '#f1f5f9';
                                }}
                            >
                                <div style={styles.itemInfo}>
                                    <h4 style={styles.itemName}>{item.menuItemName}</h4>
                                    <div style={styles.itemMeta}>
                                        <span style={styles.itemCuisine}>{item.cuisine || 'Italian'}</span>
                                        {item.veg ? (
                                            <span style={styles.itemVegBadge}>🟢 Veg</span>
                                        ) : (
                                            <span style={styles.itemNonVegBadge}>🔴 Non-Veg</span>
                                        )}
                                    </div>
                                    <div>
                                        <span style={styles.itemPrice}>₹{item.price}</span>
                                        {item.originalPrice && (
                                            <span style={styles.itemOriginalPrice}>₹{item.originalPrice}</span>
                                        )}
                                    </div>
                                </div>

                                <div style={styles.quantityControls}>
                                    <button
                                        style={{ ...styles.qtyBtn, ...(item.quantity === 1 ? styles.qtyBtnDelete : styles.qtyBtnMinus) }}
                                        onClick={() => decreaseQuantity(item)}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'scale(1.1)';
                                            if (item.quantity === 1) {
                                                e.currentTarget.style.backgroundColor = '#dc2626';
                                            } else {
                                                e.currentTarget.style.backgroundColor = '#cbd5e1';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'scale(1)';
                                            if (item.quantity === 1) {
                                                e.currentTarget.style.backgroundColor = '#ef4444';
                                            } else {
                                                e.currentTarget.style.backgroundColor = '#e2e8f0';
                                            }
                                        }}
                                    >
                                        {item.quantity === 1 ? <Trash2 size={14} /> : <Minus size={14} />}
                                    </button>
                                    <span style={styles.qtyText}>{item.quantity}</span>
                                    <button
                                        style={{ ...styles.qtyBtn, ...styles.qtyBtnPlus }}
                                        onClick={() => increaseQuantity(item)}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'scale(1.1)';
                                            e.currentTarget.style.backgroundColor = '#16a34a';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'scale(1)';
                                            e.currentTarget.style.backgroundColor = '#22c55e';
                                        }}
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div style={styles.summaryCard}>
                        <h3 style={styles.summaryTitle}>
                            <CreditCard size={20} color="#f97316" />
                            Order Summary
                        </h3>

                        <div style={styles.summaryRow}>
                            <span>Subtotal ({cart.totalItems} items)</span>
                            <span>₹{subtotal}</span>
                        </div>

                        <div style={styles.summaryRow}>
                            <span>Delivery Fee</span>
                            <span
                                style={{
                                    color: deliveryFee === 0 ? "green" : "#111827",
                                    fontWeight: "600"
                                }}
                            >
                                {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                            </span>
                        </div>

                        <div style={styles.summaryRow}>
                            <span>Tax (5%)</span>
                            <span>₹{taxAmount.toFixed(0)}</span>
                        </div>

                        <hr style={styles.divider} />

                        <div style={styles.summaryRowBold}>
                            <span>Total</span>
                            <span>₹{total.toFixed(0)}</span>
                        </div>

                        <button
                            style={styles.checkoutBtn}
                            onClick={() => navigate("/checkout")}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.02)';
                                e.currentTarget.style.boxShadow = '0 8px 24px rgba(249, 115, 22, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = '0 4px 14px rgba(249, 115, 22, 0.3)';
                            }}
                        >
                            Proceed to Checkout
                            <ArrowLeft size={18} style={{ transform: 'rotate(180deg)' }} />
                        </button>

                        <div style={styles.trustBadge}>
                            <ShieldCheck size={18} color="#22c55e" />
                            <span>Secure Checkout • Free Delivery on orders above ₹299</span>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    @media (min-width: 1024px) {
                        .cart-grid {
                            grid-template-columns: repeat(3, 1fr) !important;
                        }
                        .cart-items {
                            grid-column: span 2 / span 2 !important;
                        }
                    }
                `}
            </style>
        </div>
    );
}

export default Cart;