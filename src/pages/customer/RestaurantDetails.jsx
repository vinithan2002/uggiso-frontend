import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Star,
    Clock3,
    MapPin,
    Search,
    Heart,
    Share2,
    ChefHat,
    Bike,
    Award,
    Filter,
    X,
    ShoppingBag,
    ArrowLeft
} from "lucide-react";

import restaurantService from "../../services/restaurantService";
import menuService from "../../services/menuService";
import cartService from "../../services/cartService";

import MenuCard from "../../components/restaurant/MenuCard";

import toast from "react-hot-toast";

function RestaurantDetails() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, []);
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem("user"));

    const [restaurant, setRestaurant] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("ALL");
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        loadRestaurant();
        if (user) {
            loadCart();
        }
    }, [id]);

    const loadRestaurant = async () => {
        try {
            setLoading(true);
            const restaurantData = await restaurantService.getRestaurantById(id);
            const menuData = await menuService.getCustomerRestaurantMenu(id);
            setRestaurant(restaurantData);
            setMenuItems(menuData);
            menuData.forEach(item => {
    console.log(item.name, item.foodType);
});
        } catch (error) {
            console.error(error);
            toast.error("Unable to load restaurant");
        } finally {
            setLoading(false);
        }
    };

    const loadCart = async () => {
        try {
            const cart = await cartService.getCart(user.userId);
            const map = {};
            cart.items.forEach(item => {
                map[item.menuItemId] = {
                    cartItemId: item.cartItemId,
                    quantity: item.quantity
                };
            });
            setCartItems(map);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddToCart = async (item) => {
        if (!user) {
            toast.error("Please login first");
            return;
        }
        try {
            await cartService.addToCart({
    userId: user.userId,
    menuItemId: item.id,
    quantity: 1
});

await loadCart();

window.dispatchEvent(new Event("cartUpdated"));

toast.success(`${item.name} added to cart`);
        } catch (error) {
            console.error(error);
            toast.error("Unable to add item");
        }
    };

    const increaseQuantity = async (item) => {
        const cartItem = cartItems[item.id];
        if (!cartItem) return;
        try {
            await cartService.updateCartItem(
    cartItem.cartItemId,
    { quantity: cartItem.quantity + 1 }
);

await loadCart();

window.dispatchEvent(new Event("cartUpdated"));
        } catch (error) {
            console.error(error);
        }
    };

    const decreaseQuantity = async (item) => {
        const cartItem = cartItems[item.id];
        if (!cartItem) return;
        try {
            if (cartItem.quantity === 1) {
                await cartService.removeItem(cartItem.cartItemId);
            } else {
                await cartService.updateCartItem(
                    cartItem.cartItemId,
                    { quantity: cartItem.quantity - 1 }
                );
            }
            await loadCart();

window.dispatchEvent(new Event("cartUpdated"));
        } catch (error) {
            console.error(error);
        }
    };

    const filteredMenu = useMemo(() => {
        return menuItems.filter(item => {
            const matchesSearch = item.name?.toLowerCase().includes(search.toLowerCase());
            if (filter === "VEG") {
                return matchesSearch && item.foodType === "VEG";
            }
            if (filter === "NON_VEG") {
                return matchesSearch && item.foodType === "NON_VEG";
            }
            return matchesSearch;
        });
    }, [menuItems, search, filter]);

    const styles = {
        container: {
            backgroundColor: '#f8fafc',
            minHeight: '100vh'
        },
        banner: {
            position: 'relative',
            height: '380px',
            overflow: 'hidden'
        },
        bannerImage: {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        },
        bannerOverlay: {
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)'
        },
        bannerContent: {
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: '1200px',
            padding: '0 24px',
            color: 'white'
        },
        backButton: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'rgba(255,255,255,0.7)',
            cursor: 'pointer',
            fontSize: '14px',
            marginBottom: '16px',
            transition: 'color 0.3s ease',
            background: 'none',
            border: 'none'
        },
        restaurantName: {
            fontSize: '42px',
            fontWeight: '900',
            margin: 0,
            letterSpacing: '-0.5px'
        },
        restaurantDesc: {
            fontSize: '16px',
            color: 'rgba(255,255,255,0.8)',
            marginTop: '8px',
            maxWidth: '600px'
        },
        infoRow: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            marginTop: '16px'
        },
        infoItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.85)'
        },
        infoBadge: {
            backgroundColor: 'rgba(255,255,255,0.15)',
            padding: '4px 12px',
            borderRadius: '50px',
            fontSize: '13px'
        },
        actionButtons: {
            display: 'flex',
            gap: '12px',
            marginTop: '16px'
        },
        actionBtn: {
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            color: 'white'
        },
        contentWrapper: {
            maxWidth: '1200px',
            margin: '-30px auto 0 auto',
            padding: '0 24px 40px 24px',
            position: 'relative',
            zIndex: 2
        },
        controlsCard: {
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '20px 24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            marginBottom: '32px'
        },
        searchWrapper: {
            position: 'relative',
            flex: 1
        },
        searchIcon: {
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#94a3b8'
        },
        searchInput: {
            width: '100%',
            padding: '14px 16px 14px 48px',
            borderRadius: '12px',
            border: '2px solid #e2e8f0',
            fontSize: '14px',
            outline: 'none',
            transition: 'border-color 0.3s ease',
            backgroundColor: '#f8fafc'
        },
        filterGroup: {
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap'
        },
        filterBtn: (isActive, color = '') => ({
            padding: '8px 20px',
            borderRadius: '50px',
            border: isActive ? 'none' : '2px solid #e2e8f0',
            backgroundColor: isActive ? color : 'transparent',
            color: isActive ? 'white' : '#64748b',
            fontWeight: '600',
            fontSize: '13px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
        }),
        menuHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '12px'
        },
        menuTitle: {
            fontSize: '28px',
            fontWeight: '800',
            color: '#0f172a',
            margin: 0
        },
        menuCount: {
            color: '#94a3b8',
            fontSize: '14px'
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: '20px'
        },
        loadingContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            backgroundColor: '#f8fafc'
        },
        loadingText: {
            fontSize: '20px',
            fontWeight: '600',
            color: '#94a3b8'
        },
        emptyState: {
            textAlign: 'center',
            padding: '60px 20px',
            color: '#94a3b8'
        },
        emptyIcon: {
            fontSize: '48px',
            marginBottom: '16px'
        }
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                        width: '48px', 
                        height: '48px', 
                        border: '4px solid #e2e8f0',
                        borderTop: '4px solid #f97316',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 16px'
                    }}></div>
                    <p style={styles.loadingText}>Loading Restaurant...</p>
                </div>
            </div>
        );
    }

    if (!restaurant) {
        return (
            <div style={styles.loadingContainer}>
                <p style={styles.loadingText}>Restaurant not found</p>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* Banner */}
            <div style={styles.banner}>
                <img
                    src={restaurant.imageUrl || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&h=600&fit=crop"}
                    alt={restaurant.name}
                    style={styles.bannerImage}
                />
                <div style={styles.bannerOverlay}></div>
                
                <div style={styles.bannerContent}>
                    <button 
                        style={styles.backButton}
                        onClick={() => window.history.back()}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                    >
                        <ArrowLeft size={18} />
                        Back
                    </button>
                    
                    <h1 style={styles.restaurantName}>{restaurant.name}</h1>
                    <p style={styles.restaurantDesc}>{restaurant.description}</p>
                    
                    <div style={styles.infoRow}>
                        <div style={styles.infoItem}>
                            <Star size={16} fill="#fbbf24" color="#fbbf24" />
                            <span>{restaurant.rating}</span>
                        </div>
                        <div style={styles.infoItem}>
                            <Clock3 size={16} />
                            <span>{restaurant.deliveryTime} mins</span>
                        </div>
                        <div style={styles.infoItem}>
                            <MapPin size={16} />
                            <span>{restaurant.city}</span>
                        </div>
                        <span style={styles.infoBadge}>
                            ₹{restaurant.minimumOrder} Minimum Order
                        </span>
                        <span style={styles.infoBadge}>
                            {restaurant.cuisine || 'Multi-Cuisine'}
                        </span>
                    </div>

                    <div style={styles.actionButtons}>
                        <div 
                            style={styles.actionBtn}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
                            }}
                            onClick={() => setIsLiked(!isLiked)}
                        >
                            <Heart size={20} fill={isLiked ? '#ef4444' : 'none'} color={isLiked ? '#ef4444' : 'white'} />
                        </div>
                        <div 
                            style={styles.actionBtn}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
                            }}
                        >
                            <Share2 size={20} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div style={styles.contentWrapper}>
                {/* Controls */}
                <div style={styles.controlsCard}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={styles.searchWrapper}>
                            <Search size={20} style={styles.searchIcon} />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search for dishes..."
                                style={styles.searchInput}
                                onFocus={(e) => e.currentTarget.style.borderColor = '#f97316'}
                                onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                            />
                        </div>
                        <div style={styles.filterGroup}>
                            <button
                                onClick={() => setFilter("ALL")}
                                style={styles.filterBtn(filter === "ALL", '#f97316')}
                            >
                                🍽 All
                            </button>
                            <button
                                onClick={() => setFilter("VEG")}
                                style={styles.filterBtn(filter === "VEG", '#22c55e')}
                            >
                                🟢 Veg
                            </button>
                            <button
                                onClick={() => setFilter("NON_VEG")}
                                style={styles.filterBtn(filter === "NON_VEG", '#ef4444')}
                            >
                                🔴 Non Veg
                            </button>
                            {filter !== "ALL" && (
                                <button
                                    onClick={() => setFilter("ALL")}
                                    style={{
                                        padding: '8px 12px',
                                        borderRadius: '50px',
                                        border: 'none',
                                        backgroundColor: '#f1f5f9',
                                        color: '#64748b',
                                        cursor: 'pointer',
                                        fontSize: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px'
                                    }}
                                >
                                    <X size={14} />
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Menu Header */}
                <div style={styles.menuHeader}>
                    <div>
                        <h2 style={styles.menuTitle}>🍽 Menu</h2>
                        <p style={styles.menuCount}>{filteredMenu.length} items available</p>
                    </div>
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px',
                        color: '#94a3b8',
                        fontSize: '14px'
                    }}>
                        <ShoppingBag size={18} />
                        <span>{Object.keys(cartItems).length} items in cart</span>
                    </div>
                </div>

                {/* Menu Grid */}
                {filteredMenu.length > 0 ? (
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(1, 1fr)',
                        gap: '20px'
                    }} className="sm:grid-cols-2 lg:grid-cols-3">
                        {filteredMenu.map((item) => (
                            <MenuCard
                                key={item.id}
                                item={item}
                                quantity={cartItems[item.id]?.quantity || 0}
                                onAdd={() => handleAddToCart(item)}
                                onIncrease={() => increaseQuantity(item)}
                                onDecrease={() => decreaseQuantity(item)}
                            />
                        ))}
                    </div>
                ) : (
                    <div style={styles.emptyState}>
                        <div style={styles.emptyIcon}>🔍</div>
                        <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b' }}>No items found</h3>
                        <p style={{ color: '#94a3b8', marginTop: '8px' }}>
                            Try adjusting your search or filter
                        </p>
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
                        .menu-grid {
                            grid-template-columns: repeat(2, 1fr) !important;
                        }
                    }
                    @media (min-width: 1024px) {
                        .menu-grid {
                            grid-template-columns: repeat(3, 1fr) !important;
                        }
                    }
                `}
            </style>
        </div>
    );
}

export default RestaurantDetails;