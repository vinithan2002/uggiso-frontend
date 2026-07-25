import { Star, Clock, MapPin, Tag, Heart, Share2, ChefHat, Bike, Award, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function RestaurantCard({ restaurant }) {
    const navigate = useNavigate();
    const [isLiked, setIsLiked] = useState(false);

    const {
        id,
        name,
        description,
        cuisine,
        address,
        city,
        state,
        imageUrl,
        rating,
        deliveryFee,
        deliveryTime,
        minimumOrder,
        vegOnly,
        active
    } = restaurant;

    const handleLike = (e) => {
        e.stopPropagation();
        setIsLiked(!isLiked);
    };

    const handleShare = (e) => {
        e.stopPropagation();
    };

    // Check if restaurant is closed
    const isClosed = !active;

    const styles = {
        card: {
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            cursor: isClosed ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            border: isClosed ? '2px solid #fca5a5' : '1px solid #f3f4f6',
            position: 'relative',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            opacity: isClosed ? 0.75 : 1
        },
        imageContainer: {
            position: 'relative',
            height: '200px',
            overflow: 'hidden',
            flexShrink: 0
        },
        image: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
            filter: isClosed ? 'grayscale(0.8)' : 'none'
        },
        overlay: {
            position: 'absolute',
            inset: 0,
            background: isClosed 
                ? 'rgba(0,0,0,0.6)' 
                : 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2), transparent)'
        },
        closedOverlay: {
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
        },
        closedText: {
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'center',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)'
        },
        closedSubtext: {
            color: 'rgba(255,255,255,0.8)',
            fontSize: '14px',
            marginTop: '8px',
            textAlign: 'center'
        },
        featuredBadge: {
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: 'linear-gradient(135deg, #fbbf24, #f97316)',
            color: 'white',
            padding: '4px 10px',
            borderRadius: '9999px',
            fontSize: '10px',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            zIndex: 2
        },
        statusBadge: {
            position: 'absolute',
            top: '12px',
            right: '12px',
            padding: '4px 10px',
            borderRadius: '9999px',
            fontSize: '10px',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: isClosed ? '#ef4444' : '#22c55e',
            color: 'white',
            zIndex: 2
        },
        actionButtons: {
            position: 'absolute',
            top: '12px',
            right: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            zIndex: 2
        },
        actionBtn: {
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(4px)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'transform 0.3s ease'
        },
        offerBadge: {
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            right: '12px',
            background: isClosed 
                ? 'linear-gradient(135deg, #6b7280, #4b5563)' 
                : 'linear-gradient(135deg, #f97316, #ef4444)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 2,
            opacity: isClosed ? 0.5 : 1
        },
        offerText: {
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontWeight: 'bold',
            fontSize: '12px'
        },
        offerCode: {
            fontSize: '10px',
            fontWeight: '600',
            backgroundColor: 'rgba(255,255,255,0.2)',
            padding: '2px 10px',
            borderRadius: '9999px'
        },
        content: {
            padding: '16px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '8px'
        },
        nameContainer: {
            flex: 1,
            minWidth: 0,
            marginRight: '8px'
        },
        name: {
            fontSize: '18px',
            fontWeight: '800',
            color: isClosed ? '#6b7280' : '#111827',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            margin: 0
        },
        cuisineContainer: {
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: '2px'
        },
        cuisine: {
            color: isClosed ? '#9ca3af' : '#6b7280',
            fontSize: '13px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            margin: 0
        },
        ratingContainer: {
            flexShrink: 0,
            background: isClosed 
                ? 'linear-gradient(135deg, #9ca3af, #6b7280)' 
                : 'linear-gradient(135deg, #22c55e, #16a34a)',
            color: 'white',
            padding: '4px 10px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: isClosed ? 'none' : '0 4px 6px -1px rgba(34, 197, 94, 0.3)'
        },
        ratingText: {
            fontWeight: 'bold',
            fontSize: '12px'
        },
        featuresGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '6px',
            marginTop: '12px'
        },
        featureItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: isClosed ? '#9ca3af' : '#4b5563',
            backgroundColor: isClosed ? '#f3f4f6' : '#f9fafb',
            padding: '6px 8px',
            borderRadius: '10px',
            fontSize: '11px',
            fontWeight: '500',
            justifyContent: 'center'
        },
        footer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '12px',
            paddingTop: '12px',
            borderTop: '1px solid #f3f4f6'
        },
        footerInfo: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
        },
        footerText: {
            fontSize: '11px',
            color: isClosed ? '#9ca3af' : '#6b7280'
        },
        footerTextBold: {
            fontWeight: '600',
            color: isClosed ? '#6b7280' : '#374151'
        },
        divider: {
            width: '1px',
            height: '14px',
            backgroundColor: '#e5e7eb'
        },
        viewMenuBtn: {
            background: isClosed 
                ? 'linear-gradient(135deg, #9ca3af, #6b7280)' 
                : 'linear-gradient(135deg, #f97316, #ef4444)',
            color: 'white',
            padding: '6px 16px',
            borderRadius: '10px',
            border: 'none',
            fontWeight: '600',
            fontSize: '12px',
            cursor: isClosed ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: isClosed ? 'none' : '0 4px 6px -1px rgba(249, 115, 22, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            whiteSpace: 'nowrap',
            opacity: isClosed ? 0.6 : 1
        }
    };

    const handleCardClick = () => {
        if (!isClosed) {
            navigate(`/restaurant/${id}`);
        }
        // If closed, do nothing (or show a toast message)
    };

    const handleViewMenu = (e) => {
        e.stopPropagation();
        if (!isClosed) {
            navigate(`/restaurant/${id}`);
        }
    };

    return (
        <div 
            style={styles.card}
            onClick={handleCardClick}
            onMouseEnter={(e) => {
                if (!isClosed) {
                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                }
            }}
            onMouseLeave={(e) => {
                if (!isClosed) {
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                    e.currentTarget.style.transform = 'translateY(0)';
                }
            }}
        >
            {/* Image Container */}
            <div style={styles.imageContainer}>
                <img
                    src={imageUrl || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop"}
                    alt={name}
                    style={styles.image}
                    onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop";
                    }}
                />
                <div style={styles.overlay}></div>

                {/* Closed Overlay */}
                {isClosed && (
                    <div style={styles.closedOverlay}>
                        <Lock size={40} color="white" />
                        <div style={styles.closedText}>Currently Closed</div>
                        <div style={styles.closedSubtext}>Check back later for orders</div>
                    </div>
                )}

                {/* Featured Badge */}
                {rating >= 4.5 && !isClosed && (
                    <div style={styles.featuredBadge}>
                        <Award size={12} />
                        Featured
                    </div>
                )}

                {/* Open Status */}
                <div style={styles.statusBadge}>
                    <span style={{ 
                        width: '5px', 
                        height: '5px', 
                        borderRadius: '50%', 
                        backgroundColor: 'white', 
                        display: 'inline-block' 
                    }}></span>
                    {isClosed ? 'Closed' : 'Open Now'}
                </div>

                {/* Offer Badge */}
                {!isClosed && (
                    <div style={styles.offerBadge}>
                        <div style={styles.offerText}>
                            <Tag size={14} />
                            <span>50% OFF UPTO ₹120</span>
                        </div>
                        <span style={styles.offerCode}>Use Code: WELCOME</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div style={styles.content}>
                {/* Restaurant Info */}
                <div style={styles.header}>
                    <div style={styles.nameContainer}>
                        <h3 style={styles.name}>{name}</h3>
                        <div style={styles.cuisineContainer}>
                            <ChefHat size={13} color={isClosed ? "#9ca3af" : "#9ca3af"} />
                            <p style={styles.cuisine}>{cuisine}</p>
                        </div>
                    </div>
                    <div style={styles.ratingContainer}>
                        <Star size={12} fill="white" color="white" />
                        <span style={styles.ratingText}>{rating || '4.0'}</span>
                    </div>
                </div>

                {/* Features Grid */}
                <div style={styles.featuresGrid}>
                    <div style={styles.featureItem}>
                        <Clock size={13} color={isClosed ? "#9ca3af" : "#f97316"} />
                        <span>{deliveryTime}mins</span>
                    </div>
                    <div style={styles.featureItem}>
                        <Bike size={13} color={isClosed ? "#9ca3af" : "#3b82f6"} />
                        <span>₹{deliveryFee}</span>
                    </div>
                    <div style={styles.featureItem}>
                        <MapPin size={13} color={isClosed ? "#9ca3af" : "#ef4444"} />
                        <span>{city}</span>
                    </div>
                </div>

                {/* Footer */}
                <div style={styles.footer}>
                    <div style={styles.footerInfo}>
                        <div style={styles.footerText}>
                            <span style={styles.footerTextBold}>
                                {vegOnly ? "Veg Only" : "Veg & Non-Veg"}
                            </span>
                        </div>
                        <div style={styles.divider}></div>
                        <div style={styles.footerText}>
                            Min. ₹{minimumOrder}
                        </div>
                    </div>
                    <button 
                        style={styles.viewMenuBtn}
                        onClick={handleViewMenu}
                        onMouseEnter={(e) => {
                            if (!isClosed) {
                                e.currentTarget.style.transform = 'scale(1.02)';
                                e.currentTarget.style.boxShadow = '0 8px 16px -4px rgba(249, 115, 22, 0.4)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isClosed) {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(249, 115, 22, 0.3)';
                            }
                        }}
                        disabled={isClosed}
                    >
                        {isClosed ? 'Closed' : 'View Menu'}
                        {!isClosed && <span style={{ transition: 'transform 0.3s ease' }}>→</span>}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RestaurantCard;