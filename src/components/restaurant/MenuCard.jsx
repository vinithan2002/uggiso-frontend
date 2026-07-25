import {
    Plus,
    Minus,
    Clock3,
    Star,
    Trash2,
    Heart
} from "lucide-react";
import { useState } from "react";

function MenuCard({
    item,
    quantity,
    onAdd,
    onIncrease,
    onDecrease
}) {
    const [isLiked, setIsLiked] = useState(false);

    const isVeg = item.foodType === "VEG";

    const styles = {
        card: {
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
            transition: 'all 0.3s ease',
            border: '1px solid #f0f0f0',
            display: 'flex',
            flexDirection: 'row',
            height: '180px',
            position: 'relative'
        },
        leftContent: {
            flex: 1,
            padding: '18px 22px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minWidth: 0
        },
        topSection: {
            flex: 1
        },
        nameRow: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '4px'
        },
        name: {
            fontSize: '18px',
            fontWeight: '700',
            color: '#1a1a1a',
            margin: 0,
            lineHeight: '1.3',
            flex: 1
        },
        price: {
            fontSize: '18px',
            fontWeight: '700',
            color: '#1a1a1a',
            whiteSpace: 'nowrap',
            marginLeft: '12px'
        },
        ratingRow: {
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '6px'
        },
        ratingStar: {
            color: '#fbbf24',
            fontSize: '14px'
        },
        ratingValue: {
            fontSize: '14px',
            fontWeight: '600',
            color: '#1a1a1a'
        },
        ratingCountText: {
            fontSize: '13px',
            color: '#999'
        },
        description: {
            fontSize: '14px',
            color: '#666',
            lineHeight: '1.5',
            margin: '6px 0 6px 0',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
        },
        customisable: {
            fontSize: '12px',
            color: '#f97316',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginTop: '4px'
        },
        footer: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '10px'
        },
        prepTime: {
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            color: '#999'
        },
        addBtn: {
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#f97316',
            color: 'white',
            padding: '8px 22px',
            borderRadius: '8px',
            border: 'none',
            fontWeight: '600',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
        },
        quantityControls: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
        },
        qtyBtn: {
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontWeight: '700',
            fontSize: '14px'
        },
        qtyBtnMinus: {
            backgroundColor: '#f0f0f0',
            color: '#666'
        },
        qtyBtnPlus: {
            backgroundColor: '#22c55e',
            color: 'white'
        },
        qtyBtnDelete: {
            backgroundColor: '#ef4444',
            color: 'white'
        },
        qtyText: {
            fontSize: '16px',
            fontWeight: '600',
            color: '#1a1a1a',
            minWidth: '24px',
            textAlign: 'center'
        },
        rightImage: {
            width: '180px',
            height: '180px',
            flexShrink: 0,
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#f5f5f5'
        },
        image: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
        },
        vegBadge: {
            position: 'absolute',
            top: '10px',
            left: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: isVeg ? '#22c55e' : '#ef4444',
            color: 'white',
            padding: '3px 12px',
            borderRadius: '4px',
            fontSize: '10px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
        },
        likeBtn: {
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(4px)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }
    };

    return (
        <div 
            style={styles.card}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)';
                e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)';
                e.currentTarget.style.transform = 'translateY(0)';
            }}
        >
            {/* Left Content */}
            <div style={styles.leftContent}>
                <div style={styles.topSection}>
                    {/* Name & Price */}
                    <div style={styles.nameRow}>
                        <h3 style={styles.name}>{item.name}</h3>
                        <span style={styles.price}>₹{item.price}</span>
                    </div>

                    {/* Rating */}
                    <div style={styles.ratingRow}>
                        <span style={styles.ratingStar}>★</span>
                        <span style={styles.ratingValue}>{item.rating || 4.5}</span>
                        <span style={styles.ratingCountText}>({item.ratingCount || 12})</span>
                    </div>

                    {/* Description */}
                    <p style={styles.description}>
                        {item.description || 'Delicious freshly prepared with premium ingredients'}
                    </p>

                </div>

                {/* Footer */}
                <div style={styles.footer}>
                    <div style={styles.prepTime}>
                        <Clock3 size={14} />
                        <span>{item.preparationTime || '20-30'} mins</span>
                    </div>

                    {quantity > 0 ? (
                        <div style={styles.quantityControls}>
                            <button
                                style={{ ...styles.qtyBtn, ...(quantity === 1 ? styles.qtyBtnDelete : styles.qtyBtnMinus) }}
                                onClick={onDecrease}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                            >
                                {quantity === 1 ? <Trash2 size={14} /> : <Minus size={14} />}
                            </button>
                            <span style={styles.qtyText}>{quantity}</span>
                            <button
                                style={{ ...styles.qtyBtn, ...styles.qtyBtnPlus }}
                                onClick={onIncrease}
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
                    ) : (
                        <button
                            style={styles.addBtn}
                            onClick={onAdd}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#ea580c';
                                e.currentTarget.style.transform = 'scale(1.02)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#f97316';
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            ADD
                        </button>
                    )}
                </div>
            </div>

            {/* Right Image */}
            <div style={styles.rightImage}>
                <img
                    src={item.imageUrl || "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=300&fit=crop"}
                    alt={item.name}
                    style={styles.image}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=300&fit=crop";
                    }}
                />

                {/* Veg/Non-Veg Badge */}
                <div style={styles.vegBadge}>
                    {isVeg ? 'VEG' : 'NON-VEG'}
                </div>

                {/* Like Button */}
                <button
                    style={styles.likeBtn}
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsLiked(!isLiked);
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <Heart 
                        size={16} 
                        fill={isLiked ? '#ef4444' : 'none'} 
                        color={isLiked ? '#ef4444' : '#888'}
                    />
                </button>
            </div>
        </div>
    );
}

export default MenuCard;