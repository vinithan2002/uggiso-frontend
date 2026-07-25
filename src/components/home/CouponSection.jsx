import {
    TicketPercent,
    Gift,
    Flame,
    ArrowRight,
    Clock,
    Copy,
    Check
} from "lucide-react";
import { useState } from "react";

function CouponSection() {
    const [copiedCode, setCopiedCode] = useState(null);

    const offers = [
        {
            id: 1,
            title: "50% OFF",
            subtitle: "On Your First Order",
            code: "WELCOME50",
            gradient: "linear-gradient(135deg, #f97316, #ef4444)",
            icon: <Gift size={22} />,
            discount: "50%",
            validity: "Valid for new users only"
        },
        {
            id: 2,
            title: "FREE DELIVERY",
            subtitle: "Above ₹299",
            code: "FREEDEL",
            gradient: "linear-gradient(135deg, #22c55e, #059669)",
            icon: <TicketPercent size={22} />,
            discount: "Free",
            validity: "Valid on all orders above ₹299"
        },
        {
            id: 3,
            title: "30% OFF",
            subtitle: "Weekend Special",
            code: "WEEKEND30",
            gradient: "linear-gradient(135deg, #a855f7, #ec4899)",
            icon: <Flame size={22} />,
            discount: "30%",
            validity: "Valid on weekends only"
        }
    ];

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const styles = {
        container: {
            width: '100%',  // Changed from 30% to 100%
            backgroundColor: '#f9fafb',
            padding: '64px 16px'
        },
        innerContainer: {
            maxWidth: '1152px',
            margin: '0 auto',
            padding: '0 16px'
        },
        header: {
            textAlign: 'center',
            marginBottom: '48px'
        },
        headerTitle: {
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#111827',
        },
        headerSub: {
            color: '#6b7280',
            marginTop: '8px',
            fontSize: '18px'
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',  // Changed to 3 columns
            gap: '24px'
        },
        card: {
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            overflow: 'hidden',
            transition: 'box-shadow 0.3s ease'
        },
        cardContent: {
            padding: '24px'
        },
        topBar: (gradient) => ({
            height: '6px',
            width: '100%',
            background: gradient
        }),
        topRow: {
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: '16px'
        },
        iconWrapper: (gradient) => ({
            padding: '10px',
            borderRadius: '12px',
            background: gradient,
            color: 'white',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }),
        badge: (gradient) => ({
            fontSize: '12px',
            fontWeight: 'bold',
            padding: '4px 12px',
            borderRadius: '9999px',
            background: gradient,
            color: 'white'
        }),
        title: (gradient) => ({
            fontSize: '20px',
            fontWeight: 'bold',
            background: gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
        }),
        subtitle: {
            color: '#4b5563',
            fontSize: '14px',
            marginTop: '2px'
        },
        divider: {
            margin: '16px 0',
            borderTop: '1px dashed #e5e7eb'
        },
        validity: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#6b7280',
            fontSize: '12px'
        },
        codeWrapper: {
            marginTop: '12px',
            backgroundColor: '#f9fafb',
            borderRadius: '12px',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        codeLabel: {
            fontSize: '10px',
            color: '#9ca3af',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            margin: 0
        },
        codeValue: {
            fontFamily: 'monospace',
            fontWeight: 'bold',
            fontSize: '14px',
            color: '#111827',
            letterSpacing: '0.05em',
            margin: 0
        },
        copyBtn: (gradient, isCopied) => ({
            padding: '8px',
            borderRadius: '8px',
            background: isCopied ? '#22c55e' : gradient,
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }),
        applyBtn: (gradient) => ({
            width: '100%',
            marginTop: '12px',
            padding: '10px',
            borderRadius: '12px',
            background: gradient,
            color: 'white',
            border: 'none',
            fontWeight: '600',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.3s ease'
        }),
        bottomMsg: {
            textAlign: 'center',
            marginTop: '40px',
            color: '#9ca3af',
            fontSize: '14px'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.innerContainer}>
                
                {/* Header */}
                <div style={styles.header}>
                    <h2 style={styles.headerTitle}>🔥 Today's Hot Offers</h2>
                    <p style={styles.headerSub}>
                        Save big with exclusive UGGISO coupons. Limited time offers!
                    </p>
                </div>

                {/* Grid - 3 columns */}
                <div style={styles.grid}>
                    {offers.map((offer) => (
                        <div key={offer.id} style={styles.card}>
                            <div style={styles.topBar(offer.gradient)}></div>
                            
                            <div style={styles.cardContent}>
                                {/* Icon & Badge */}
                                <div style={styles.topRow}>
                                    <div style={styles.iconWrapper(offer.gradient)}>
                                        {offer.icon}
                                    </div>
                                    <span style={styles.badge(offer.gradient)}>
                                        {offer.discount} OFF
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 style={styles.title(offer.gradient)}>
                                    {offer.title}
                                </h3>
                                <p style={styles.subtitle}>
                                    {offer.subtitle}
                                </p>

                                {/* Divider */}
                                <div style={styles.divider}></div>

                                {/* Validity */}
                                <div style={styles.validity}>
                                    <Clock size={14} />
                                    <span>{offer.validity}</span>
                                </div>

                                {/* Coupon Code */}
                                <div style={styles.codeWrapper}>
                                    <div>
                                        <p style={styles.codeLabel}>Coupon Code</p>
                                        <p style={styles.codeValue}>{offer.code}</p>
                                    </div>
                                    <button
                                        onClick={() => handleCopy(offer.code)}
                                        style={styles.copyBtn(offer.gradient, copiedCode === offer.code)}
                                    >
                                        {copiedCode === offer.code ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Message */}
                <div style={styles.bottomMsg}>
                    ✨ New offers added every week. Stay tuned!
                </div>
            </div>
        </div>
    );
}

export default CouponSection;