import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    MapPin,
    CreditCard,
    IndianRupee,
    ShoppingBag,
    Truck,
    ShieldCheck,
    Plus,
    Home,
    Building,
    CheckCircle,
    Clock,
    Wallet,
    Landmark
} from "lucide-react";

import cartService from "../../services/cartService";
import addressService from "../../services/addressService";
import orderService from "../../services/orderService";

import toast from "react-hot-toast";

function Checkout() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, []);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [cart, setCart] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [loading, setLoading] = useState(true);
    const [placingOrder, setPlacingOrder] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const cartResponse = await cartService.getCart(user.userId);
            const addressResponse = await addressService.getAddressesByUser(user.userId);
            setCart(cartResponse);
            setAddresses(addressResponse);
            const defaultAddress = addressResponse.find(address => address.defaultAddress);
            if (defaultAddress) {
                setSelectedAddress(defaultAddress.id);
            }
        } catch (error) {
            console.error(error);
            toast.error("Unable to load checkout");
        } finally {
            setLoading(false);
        }
    };

    const placeOrder = async () => {
        if (!selectedAddress) {
            toast.error("Please select an address");
            return;
        }
        try {
            setPlacingOrder(true);
            await orderService.placeOrder({
                userId: user.userId,
                addressId: selectedAddress,
                paymentMethod,
                couponCode: ""
            });
            toast.success("Order Placed Successfully 🎉");
            navigate("/orders");
        } catch (error) {
            console.error(error);
            toast.error("Failed to place order");
        } finally {
            setPlacingOrder(false);
        }
    };

    const getAddressTypeIcon = (type) => {
        if (type?.toLowerCase().includes('home')) return <Home size={16} />;
        if (type?.toLowerCase().includes('work') || type?.toLowerCase().includes('office')) return <Building size={16} />;
        return <MapPin size={16} />;
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
            alignItems: 'center',
            gap: '16px',
            marginBottom: '32px'
        },
        backBtn: {
            display: 'flex',
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
            transition: 'all 0.3s ease'
        },
        pageTitle: {
            fontSize: '28px',
            fontWeight: '800',
            color: '#0f172a',
            margin: 0
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '32px'
        },
        leftSection: {
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
        },
        card: {
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            border: '1px solid #f1f5f9'
        },
        cardTitle: {
            fontSize: '18px',
            fontWeight: '700',
            color: '#0f172a',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        addressList: {
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
        },
        addressOption: (isSelected) => ({
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            padding: '16px',
            borderRadius: '12px',
            border: `2px solid ${isSelected ? '#f97316' : '#e2e8f0'}`,
            backgroundColor: isSelected ? '#fff7ed' : '#ffffff',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative'
        }),
        addressRadio: (isSelected) => ({
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            border: `2px solid ${isSelected ? '#f97316' : '#cbd5e1'}`,
            backgroundColor: isSelected ? '#f97316' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginTop: '2px',
            transition: 'all 0.3s ease'
        }),
        addressContent: {
            flex: 1
        },
        addressType: {
            fontSize: '14px',
            fontWeight: '600',
            color: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
        },
        addressText: {
            fontSize: '14px',
            color: '#64748b',
            marginTop: '4px',
            lineHeight: '1.5'
        },
        addressDefault: {
            fontSize: '11px',
            fontWeight: '600',
            color: '#22c55e',
            backgroundColor: '#dcfce7',
            padding: '2px 10px',
            borderRadius: '50px',
            marginLeft: '8px'
        },
        paymentOptions: {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
        },
        paymentOption: (isSelected) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 16px',
            borderRadius: '12px',
            border: `2px solid ${isSelected ? '#f97316' : '#e2e8f0'}`,
            backgroundColor: isSelected ? '#fff7ed' : '#ffffff',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
        }),
        paymentIcon: {
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            backgroundColor: '#f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748b',
            flexShrink: 0
        },
        paymentLabel: {
            fontSize: '14px',
            fontWeight: '500',
            color: '#0f172a'
        },
        paymentDesc: {
            fontSize: '12px',
            color: '#94a3b8'
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
            fontSize: '18px',
            fontWeight: '700',
            color: '#0f172a',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        summaryRow: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px 0',
            fontSize: '14px',
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
        placeOrderBtn: {
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
        placeOrderBtnDisabled: {
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            backgroundColor: '#94a3b8',
            color: 'white',
            border: 'none',
            fontWeight: '700',
            fontSize: '17px',
            cursor: 'not-allowed',
            opacity: 0.6,
            marginTop: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
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
        emptyAddress: {
            textAlign: 'center',
            padding: '32px 16px',
            color: '#94a3b8'
        },
        addAddressBtn: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '12px',
            backgroundColor: '#f97316',
            color: 'white',
            border: 'none',
            fontWeight: '600',
            fontSize: '14px',
            cursor: 'pointer',
            marginTop: '12px',
            transition: 'background-color 0.3s ease'
        },
        itemsPreview: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginTop: '12px'
        },
        itemPreviewRow: {
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '13px',
            color: '#64748b',
            padding: '4px 0'
        },
        itemPreviewName: {
            flex: 1
        },
        itemPreviewQty: {
            margin: '0 12px',
            color: '#94a3b8'
        },
        itemPreviewPrice: {
            fontWeight: '500',
            color: '#0f172a'
        }
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={{ textAlign: 'center' }}>
                    <div style={styles.loadingSpinner}></div>
                    <p style={{ color: '#94a3b8', marginTop: '16px' }}>Loading Checkout...</p>
                </div>
            </div>
        );
    }

    if (!cart) return null;

    const subtotal = cart.totalAmount || 0;
    const deliveryFee =
    subtotal >= 299
        ? 0
        : 40;
    const tax = subtotal * 0.05;
    const total = subtotal + deliveryFee + tax;

    return (
        <div style={styles.container}>
            <div style={styles.innerContainer}>
                {/* Header */}
                <div style={styles.header}>
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
                        Back to Cart
                    </button>
                    <h1 style={styles.pageTitle}>Checkout</h1>
                </div>

                {/* Grid */}
                <div style={styles.grid} className="lg:grid-cols-3">
                    {/* Left Section */}
                    <div style={styles.leftSection} className="lg:col-span-2">
                        {/* Address */}
                        <div style={styles.card}>
                            <h2 style={styles.cardTitle}>
                                <MapPin size={20} color="#f97316" />
                                Delivery Address
                            </h2>
                            {addresses.length > 0 ? (
                                <div style={styles.addressList}>
                                    {addresses.map(address => {
                                        const isSelected = selectedAddress === address.id;
                                        return (
                                            <div
                                                key={address.id}
                                                style={styles.addressOption(isSelected)}
                                                onClick={() => setSelectedAddress(address.id)}
                                                onMouseEnter={(e) => {
                                                    if (!isSelected) {
                                                        e.currentTarget.style.borderColor = '#f97316';
                                                        e.currentTarget.style.backgroundColor = '#faf5ff';
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (!isSelected) {
                                                        e.currentTarget.style.borderColor = '#e2e8f0';
                                                        e.currentTarget.style.backgroundColor = '#ffffff';
                                                    }
                                                }}
                                            >
                                                <div style={styles.addressRadio(isSelected)}>
                                                    {isSelected && <CheckCircle size={14} color="white" />}
                                                </div>
                                                <div style={styles.addressContent}>
                                                    <div style={styles.addressType}>
                                                        {getAddressTypeIcon(address.addressType)}
                                                        {address.addressType || 'Address'}
                                                        {address.defaultAddress && (
                                                            <span style={styles.addressDefault}>Default</span>
                                                        )}
                                                    </div>
                                                    <div style={styles.addressText}>
                                                        {address.houseNo}, {address.street}
                                                        {address.landmark && `, ${address.landmark}`}
                                                        <br />
                                                        {address.city}, {address.state} - {address.pincode}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div style={styles.emptyAddress}>
                                    <p>No addresses found. Please add an address.</p>
                                    <button style={styles.addAddressBtn}>
                                        <Plus size={16} />
                                        Add New Address
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Payment */}
                        <div style={styles.card}>
                            <h2 style={styles.cardTitle}>
                                <CreditCard size={20} color="#f97316" />
                                Payment Method
                            </h2>
                            <div style={styles.paymentOptions}>
                                <div
                                    style={styles.paymentOption(paymentMethod === "COD")}
                                    onClick={() => setPaymentMethod("COD")}
                                >
                                    <div style={styles.paymentIcon}>
                                        <Wallet size={18} />
                                    </div>
                                    <div>
                                        <div style={styles.paymentLabel}>Cash on Delivery</div>
                                        <div style={styles.paymentDesc}>Pay when you receive</div>
                                    </div>
                                </div>
                                <div
                                    style={styles.paymentOption(paymentMethod === "UPI")}
                                    onClick={() => setPaymentMethod("UPI")}
                                >
                                    <div style={styles.paymentIcon}>
                                        <Landmark size={18} />
                                    </div>
                                    <div>
                                        <div style={styles.paymentLabel}>UPI</div>
                                        <div style={styles.paymentDesc}>Google Pay, PhonePe, Paytm</div>
                                    </div>
                                </div>
                                <div
                                    style={styles.paymentOption(paymentMethod === "CARD")}
                                    onClick={() => setPaymentMethod("CARD")}
                                >
                                    <div style={styles.paymentIcon}>
                                        <CreditCard size={18} />
                                    </div>
                                    <div>
                                        <div style={styles.paymentLabel}>Debit / Credit Card</div>
                                        <div style={styles.paymentDesc}>Visa, Mastercard, RuPay</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Summary */}
                    <div style={styles.summaryCard}>
                        <h2 style={styles.summaryTitle}>
                            <ShoppingBag size={20} color="#f97316" />
                            Order Summary
                        </h2>

                        {/* Items Preview */}
                        <div style={styles.itemsPreview}>
                            {cart.items.slice(0, 3).map((item, index) => (
                                <div key={index} style={styles.itemPreviewRow}>
                                    <span style={styles.itemPreviewName}>
                                        {item.menuItemName}
                                    </span>
                                    <span style={styles.itemPreviewQty}>×{item.quantity}</span>
                                    <span style={styles.itemPreviewPrice}>₹{item.price * item.quantity}</span>
                                </div>
                            ))}
                            {cart.items.length > 3 && (
                                <div style={{ ...styles.itemPreviewRow, color: '#94a3b8', fontSize: '12px' }}>
                                    <span>+ {cart.items.length - 3} more items</span>
                                </div>
                            )}
                        </div>

                        <hr style={styles.divider} />

                        <div style={styles.summaryRow}>
                            <span>Subtotal ({cart.totalItems} items)</span>
                            <span>₹{subtotal}</span>
                        </div>

                        <div style={styles.summaryRow}>
    <span>Delivery Fee</span>

    <span
        style={{
            color: deliveryFee === 0 ? "#16a34a" : "#111827",
            fontWeight: "600"
        }}
    >
        {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
    </span>
</div>

                        <div style={styles.summaryRow}>
                            <span>Tax (5%)</span>
                            <span>₹{tax.toFixed(0)}</span>
                        </div>

                        <hr style={styles.divider} />

                        <div style={styles.summaryRowBold}>
                            <span>Total</span>
                            <span>₹{total.toFixed(0)}</span>
                        </div>

                        <button
                            onClick={placeOrder}
                            disabled={placingOrder || !selectedAddress}
                            style={placingOrder || !selectedAddress ? styles.placeOrderBtnDisabled : styles.placeOrderBtn}
                            onMouseEnter={(e) => {
                                if (!placingOrder && selectedAddress) {
                                    e.currentTarget.style.transform = 'scale(1.02)';
                                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(249, 115, 22, 0.4)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!placingOrder && selectedAddress) {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(249, 115, 22, 0.3)';
                                }
                            }}
                        >
                            {placingOrder ? (
                                <>
                                    <div style={{ 
                                        width: '20px', 
                                        height: '20px', 
                                        border: '2px solid rgba(255,255,255,0.3)',
                                        borderTop: '2px solid white',
                                        borderRadius: '50%',
                                        animation: 'spin 0.8s linear infinite'
                                    }}></div>
                                    Placing Order...
                                </>
                            ) : (
                                <>
                                    <Truck size={20} />
                                    Place Order • ₹{total.toFixed(0)}
                                </>
                            )}
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
                        .checkout-grid {
                            grid-template-columns: repeat(3, 1fr) !important;
                        }
                        .checkout-left {
                            grid-column: span 2 / span 2 !important;
                        }
                    }
                `}
            </style>
        </div>
    );
}

export default Checkout;