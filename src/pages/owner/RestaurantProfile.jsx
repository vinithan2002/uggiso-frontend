import { useEffect, useState } from "react";
import {
    Store,
    MapPin,
    Phone,
    Mail,
    Globe,
    Clock,
    IndianRupee,
    Truck,
    CheckCircle,
    XCircle,
    Edit,
    Save,
    X,
    Camera,
    Utensils,
    Building,
    Map,
    Hash,
    Coffee,
    ShoppingBag,
    Star,
    TrendingUp,
    Award,
    Users
} from "lucide-react";
import restaurantService from "../../services/restaurantService";
import toast from "react-hot-toast";

function RestaurantProfile() {
    const [restaurant, setRestaurant] = useState({
        id: "",
        name: "",
        description: "",
        cuisine: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        imageUrl: "",
        deliveryFee: "",
        deliveryTime: "",
        minimumOrder: "",
        vegOnly: false,
        active: true,
        rating: 4.5,
        totalOrders: 0,
        totalRevenue: 0
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [edited, setEdited] = useState(false);

    useEffect(() => {
        loadRestaurant();
    }, []);

    const loadRestaurant = async () => {
        try {
            setLoading(true);
            const data = await restaurantService.getMyRestaurant();
            setRestaurant(data);
        } catch (error) {
            console.error(error);
            toast.error("Unable to load restaurant");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setRestaurant({
            ...restaurant,
            [name]: type === "checkbox" ? checked : value
        });
        setEdited(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            await restaurantService.updateRestaurant(
                restaurant.id,
                restaurant
            );
            toast.success("Restaurant updated successfully");
            setEdited(false);
        } catch (error) {
            console.error(error);
            toast.error("Update failed");
        } finally {
            setSaving(false);
        }
    };

    const styles = {
        container: {
            padding: '24px',
            backgroundColor: '#f8fafc',
            minHeight: '100vh'
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
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
        },
        subtitle: {
            fontSize: '14px',
            color: '#64748b',
            marginTop: '4px'
        },
        statusBadge: (active) => ({
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 16px',
            borderRadius: '50px',
            backgroundColor: active ? '#dcfce7' : '#fee2e2',
            color: active ? '#16a34a' : '#dc2626',
            fontWeight: '600',
            fontSize: '13px',
            border: `1px solid ${active ? '#86efac' : '#fca5a5'}`
        }),
        statsRow: {
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            marginBottom: '24px'
        },
        statCard: {
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '16px 20px',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            transition: 'all 0.3s ease'
        },
        statIconWrapper: (bgColor) => ({
            width: '44px',
            height: '44px',
            borderRadius: '10px',
            backgroundColor: bgColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }),
        statValue: {
            fontSize: '20px',
            fontWeight: '700',
            color: '#0f172a'
        },
        statLabel: {
            fontSize: '12px',
            color: '#64748b'
        },
        card: {
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '28px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
        },
        previewSection: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
            marginBottom: '28px',
            paddingBottom: '28px',
            borderBottom: '1px solid #e2e8f0'
        },
        imageWrapper: {
            position: 'relative',
            width: '100%',
            height: '220px',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: '#f1f5f9'
        },
        image: {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        },
        imagePlaceholder: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94a3b8',
            backgroundColor: '#f8fafc'
        },
        imageOverlay: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '12px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
            display: 'flex',
            justifyContent: 'center'
        },
        uploadBtn: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '50px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '500',
            transition: 'all 0.3s ease'
        },
        infoGrid: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px'
        },
        infoItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            backgroundColor: '#f8fafc',
            borderRadius: '10px',
            border: '1px solid #e2e8f0'
        },
        infoIcon: {
            width: '34px',
            height: '34px',
            borderRadius: '8px',
            backgroundColor: '#fef3c7',
            color: '#f97316',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
        },
        infoLabel: {
            fontSize: '11px',
            color: '#94a3b8',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '0.3px'
        },
        infoValue: {
            fontSize: '14px',
            fontWeight: '600',
            color: '#0f172a'
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '18px'
        },
        formRow: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px'
        },
        formGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
        },
        label: {
            fontSize: '13px',
            fontWeight: '600',
            color: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
        },
        labelRequired: {
            color: '#ef4444'
        },
        input: {
            padding: '10px 14px',
            borderRadius: '10px',
            border: '1.5px solid #e2e8f0',
            fontSize: '14px',
            outline: 'none',
            transition: 'all 0.3s ease',
            backgroundColor: '#fafafa',
            color: '#0f172a',
            width: '100%',
            boxSizing: 'border-box'
        },
        textarea: {
            padding: '10px 14px',
            borderRadius: '10px',
            border: '1.5px solid #e2e8f0',
            fontSize: '14px',
            outline: 'none',
            transition: 'all 0.3s ease',
            backgroundColor: '#fafafa',
            color: '#0f172a',
            width: '100%',
            boxSizing: 'border-box',
            minHeight: '80px',
            resize: 'vertical',
            fontFamily: 'inherit'
        },
        checkboxWrapper: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            backgroundColor: '#fafafa',
            borderRadius: '10px',
            border: '1.5px solid #e2e8f0',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
        },
        checkbox: {
            width: '18px',
            height: '18px',
            accentColor: '#f97316',
            cursor: 'pointer'
        },
        checkboxLabel: {
            fontSize: '14px',
            fontWeight: '500',
            color: '#0f172a',
            cursor: 'pointer'
        },
        checkboxDesc: {
            fontSize: '12px',
            color: '#94a3b8'
        },
        buttonGroup: {
            display: 'flex',
            gap: '12px',
            marginTop: '8px',
            paddingTop: '18px',
            borderTop: '1px solid #e2e8f0'
        },
        saveBtn: {
            flex: 1,
            padding: '12px 24px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #f97316, #ef4444)',
            color: 'white',
            border: 'none',
            fontWeight: '600',
            fontSize: '15px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 14px rgba(249,115,22,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
        },
        saveBtnDisabled: {
            flex: 1,
            padding: '12px 24px',
            borderRadius: '10px',
            backgroundColor: '#94a3b8',
            color: 'white',
            border: 'none',
            fontWeight: '600',
            fontSize: '15px',
            cursor: 'not-allowed',
            opacity: 0.6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
        },
        resetBtn: {
            padding: '12px 24px',
            borderRadius: '10px',
            backgroundColor: '#f1f5f9',
            color: '#475569',
            border: 'none',
            fontWeight: '600',
            fontSize: '15px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        loadingContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh'
        },
        loadingSpinner: {
            width: '40px',
            height: '40px',
            border: '4px solid #e2e8f0',
            borderTop: '4px solid #f97316',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
        }
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={{ textAlign: 'center' }}>
                    <div style={styles.loadingSpinner}></div>
                    <p style={{ color: '#94a3b8', marginTop: '12px' }}>Loading Restaurant...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <h1 style={styles.title}>🏪 Restaurant Profile</h1>
                    <p style={styles.subtitle}>Manage your restaurant details and settings</p>
                </div>
                <div style={styles.statusBadge(restaurant.active)}>
                    {restaurant.active ? <CheckCircle size={14} /> : <XCircle size={14} />}
                    {restaurant.active ? 'Active' : 'Inactive'}
                </div>
            </div>

            {/* Stats */}
            <div style={styles.statsRow}>
                <div style={styles.statCard}>
                    <div style={styles.statIconWrapper("#fef3c7")}>
                        <Star size={20} color="#f97316" />
                    </div>
                    <div>
                        <div style={styles.statValue}>{restaurant.rating || 4.5}</div>
                        <div style={styles.statLabel}>Rating</div>
                    </div>
                </div>
                <div style={styles.statCard}>
                    <div style={styles.statIconWrapper("#dbeafe")}>
                        <ShoppingBag size={20} color="#3b82f6" />
                    </div>
                    <div>
                        <div style={styles.statValue}>{restaurant.totalOrders || 0}</div>
                        <div style={styles.statLabel}>Total Orders</div>
                    </div>
                </div>
                <div style={styles.statCard}>
                    <div style={styles.statIconWrapper("#dcfce7")}>
                        <TrendingUp size={20} color="#22c55e" />
                    </div>
                    <div>
                        <div style={styles.statValue}>₹{restaurant.totalRevenue || 0}</div>
                        <div style={styles.statLabel}>Revenue</div>
                    </div>
                </div>
                <div style={styles.statCard}>
                    <div style={styles.statIconWrapper("#fce7f3")}>
                        <Award size={20} color="#ec4899" />
                    </div>
                    <div>
                        <div style={styles.statValue}>{restaurant.cuisine || 'N/A'}</div>
                        <div style={styles.statLabel}>Cuisine</div>
                    </div>
                </div>
            </div>

            <div style={styles.card}>
                {/* Preview Section */}
                <div style={styles.previewSection}>
                    <div style={styles.imageWrapper}>
                        {restaurant.imageUrl ? (
                            <img
                                src={restaurant.imageUrl}
                                alt={restaurant.name}
                                style={styles.image}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.parentElement.querySelector('.placeholder').style.display = 'flex';
                                }}
                            />
                        ) : null}
                        <div className="placeholder" style={restaurant.imageUrl ? { display: 'none' } : { display: 'flex', ...styles.imagePlaceholder }}>
                            <Camera size={40} style={{ opacity: 0.3 }} />
                            <span style={{ marginTop: '8px', fontSize: '14px' }}>No Image</span>
                        </div>
                    </div>

                    <div style={styles.infoGrid}>
                        <div style={styles.infoItem}>
                            <div style={styles.infoIcon}>
                                <Store size={14} />
                            </div>
                            <div>
                                <div style={styles.infoLabel}>Restaurant Name</div>
                                <div style={styles.infoValue}>{restaurant.name || 'Not set'}</div>
                            </div>
                        </div>
                        <div style={styles.infoItem}>
                            <div style={styles.infoIcon}>
                                <Utensils size={14} />
                            </div>
                            <div>
                                <div style={styles.infoLabel}>Cuisine</div>
                                <div style={styles.infoValue}>{restaurant.cuisine || 'Not set'}</div>
                            </div>
                        </div>
                        <div style={styles.infoItem}>
                            <div style={styles.infoIcon}>
                                <MapPin size={14} />
                            </div>
                            <div>
                                <div style={styles.infoLabel}>Location</div>
                                <div style={styles.infoValue}>
                                    {restaurant.city && restaurant.state 
                                        ? `${restaurant.city}, ${restaurant.state}` 
                                        : 'Not set'}
                                </div>
                            </div>
                        </div>
                        <div style={styles.infoItem}>
                            <div style={styles.infoIcon}>
                                <IndianRupee size={14} />
                            </div>
                            <div>
                                <div style={styles.infoLabel}>Delivery Fee</div>
                                <div style={styles.infoValue}>₹{restaurant.deliveryFee || '0'}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formRow}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>
                                <Store size={14} />
                                Restaurant Name
                                <span style={styles.labelRequired}>*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={restaurant.name}
                                onChange={handleChange}
                                placeholder="Enter restaurant name"
                                style={styles.input}
                                required
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = '#f97316';
                                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.1)';
                                    e.currentTarget.style.backgroundColor = '#ffffff';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = '#e2e8f0';
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.backgroundColor = '#fafafa';
                                }}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>
                                <Utensils size={14} />
                                Cuisine
                                <span style={styles.labelRequired}>*</span>
                            </label>
                            <input
                                type="text"
                                name="cuisine"
                                value={restaurant.cuisine}
                                onChange={handleChange}
                                placeholder="Enter cuisine type"
                                style={styles.input}
                                required
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = '#f97316';
                                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.1)';
                                    e.currentTarget.style.backgroundColor = '#ffffff';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = '#e2e8f0';
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.backgroundColor = '#fafafa';
                                }}
                            />
                        </div>
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>
                            <Coffee size={14} />
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={restaurant.description}
                            onChange={handleChange}
                            placeholder="Describe your restaurant, specialties, ambiance..."
                            style={styles.textarea}
                            onFocus={(e) => {
                                e.currentTarget.style.borderColor = '#f97316';
                                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.1)';
                                e.currentTarget.style.backgroundColor = '#ffffff';
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = '#e2e8f0';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.backgroundColor = '#fafafa';
                            }}
                        />
                    </div>

                    <div style={styles.formRow}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>
                                <MapPin size={14} />
                                Address
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={restaurant.address}
                                onChange={handleChange}
                                placeholder="Street address"
                                style={styles.input}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = '#f97316';
                                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.1)';
                                    e.currentTarget.style.backgroundColor = '#ffffff';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = '#e2e8f0';
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.backgroundColor = '#fafafa';
                                }}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>
                                <Building size={14} />
                                City
                            </label>
                            <input
                                type="text"
                                name="city"
                                value={restaurant.city}
                                onChange={handleChange}
                                placeholder="City"
                                style={styles.input}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = '#f97316';
                                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.1)';
                                    e.currentTarget.style.backgroundColor = '#ffffff';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = '#e2e8f0';
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.backgroundColor = '#fafafa';
                                }}
                            />
                        </div>
                    </div>

                    <div style={styles.formRow}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>
                                <Map size={14} />
                                State
                            </label>
                            <input
                                type="text"
                                name="state"
                                value={restaurant.state}
                                onChange={handleChange}
                                placeholder="State"
                                style={styles.input}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = '#f97316';
                                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.1)';
                                    e.currentTarget.style.backgroundColor = '#ffffff';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = '#e2e8f0';
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.backgroundColor = '#fafafa';
                                }}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>
                                <Hash size={14} />
                                Pincode
                            </label>
                            <input
                                type="text"
                                name="pincode"
                                value={restaurant.pincode}
                                onChange={handleChange}
                                placeholder="Pincode"
                                style={styles.input}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = '#f97316';
                                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.1)';
                                    e.currentTarget.style.backgroundColor = '#ffffff';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = '#e2e8f0';
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.backgroundColor = '#fafafa';
                                }}
                            />
                        </div>
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>
                            <Camera size={14} />
                            Image URL
                        </label>
                        <input
                            type="text"
                            name="imageUrl"
                            value={restaurant.imageUrl}
                            onChange={handleChange}
                            placeholder="https://example.com/restaurant-image.jpg"
                            style={styles.input}
                            onFocus={(e) => {
                                e.currentTarget.style.borderColor = '#f97316';
                                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.1)';
                                e.currentTarget.style.backgroundColor = '#ffffff';
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = '#e2e8f0';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.backgroundColor = '#fafafa';
                            }}
                        />
                    </div>

                    <div style={styles.formRow}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>
                                <Truck size={14} />
                                Delivery Fee (₹)
                            </label>
                            <input
                                type="number"
                                name="deliveryFee"
                                value={restaurant.deliveryFee}
                                onChange={handleChange}
                                placeholder="0"
                                style={styles.input}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = '#f97316';
                                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.1)';
                                    e.currentTarget.style.backgroundColor = '#ffffff';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = '#e2e8f0';
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.backgroundColor = '#fafafa';
                                }}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>
                                <Clock size={14} />
                                Delivery Time (min)
                            </label>
                            <input
                                type="number"
                                name="deliveryTime"
                                value={restaurant.deliveryTime}
                                onChange={handleChange}
                                placeholder="30"
                                style={styles.input}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = '#f97316';
                                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.1)';
                                    e.currentTarget.style.backgroundColor = '#ffffff';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = '#e2e8f0';
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.backgroundColor = '#fafafa';
                                }}
                            />
                        </div>
                    </div>

                    <div style={styles.formRow}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>
                                <ShoppingBag size={14} />
                                Minimum Order (₹)
                            </label>
                            <input
                                type="number"
                                name="minimumOrder"
                                value={restaurant.minimumOrder}
                                onChange={handleChange}
                                placeholder="99"
                                style={styles.input}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = '#f97316';
                                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.1)';
                                    e.currentTarget.style.backgroundColor = '#ffffff';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = '#e2e8f0';
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.backgroundColor = '#fafafa';
                                }}
                            />
                        </div>
                    </div>

                    <div style={styles.formRow}>
                        <div
                            style={styles.checkboxWrapper}
                            onClick={() => {
                                setRestaurant({ ...restaurant, vegOnly: !restaurant.vegOnly });
                                setEdited(true);
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#f1f5f9';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#fafafa';
                            }}
                        >
                            <input
                                type="checkbox"
                                name="vegOnly"
                                checked={restaurant.vegOnly}
                                onChange={handleChange}
                                style={styles.checkbox}
                                onClick={(e) => e.stopPropagation()}
                            />
                            <div>
                                <div style={styles.checkboxLabel}>
                                    {restaurant.vegOnly ? '🟢 Veg Only' : 'Veg Only'}
                                </div>
                                <div style={styles.checkboxDesc}>
                                    {restaurant.vegOnly 
                                        ? 'Only vegetarian items will be shown' 
                                        : 'Both veg and non-veg items allowed'}
                                </div>
                            </div>
                        </div>

                        <div
                            style={styles.checkboxWrapper}
                            onClick={() => {
                                setRestaurant({ ...restaurant, active: !restaurant.active });
                                setEdited(true);
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#f1f5f9';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#fafafa';
                            }}
                        >
                            <input
                                type="checkbox"
                                name="active"
                                checked={restaurant.active}
                                onChange={handleChange}
                                style={styles.checkbox}
                                onClick={(e) => e.stopPropagation()}
                            />
                            <div>
                                <div style={styles.checkboxLabel}>
                                    {restaurant.active ? '🟢 Restaurant Active' : 'Restaurant Active'}
                                </div>
                                <div style={styles.checkboxDesc}>
                                    {restaurant.active 
                                        ? 'Restaurant is visible to customers' 
                                        : 'Restaurant is hidden from customers'}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={styles.buttonGroup}>
                        <button
                            type="submit"
                            disabled={saving || !edited}
                            style={saving || !edited ? styles.saveBtnDisabled : styles.saveBtn}
                            onMouseEnter={(e) => {
                                if (!saving && edited) {
                                    e.currentTarget.style.transform = 'scale(1.02)';
                                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(249,115,22,0.4)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!saving && edited) {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(249,115,22,0.3)';
                                }
                            }}
                        >
                            {saving ? (
                                <>
                                    <span style={{
                                        display: 'inline-block',
                                        width: '18px',
                                        height: '18px',
                                        border: '2px solid rgba(255,255,255,0.3)',
                                        borderTop: '2px solid white',
                                        borderRadius: '50%',
                                        animation: 'spin 0.8s linear infinite'
                                    }}></span>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    Save Changes
                                </>
                            )}
                        </button>
                        {edited && (
                            <button
                                type="button"
                                style={styles.resetBtn}
                                onClick={() => {
                                    loadRestaurant();
                                    setEdited(false);
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#e2e8f0';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#f1f5f9';
                                }}
                            >
                                <X size={18} />
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    );
}

export default RestaurantProfile;