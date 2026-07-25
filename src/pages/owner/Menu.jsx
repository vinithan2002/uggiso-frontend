import { useEffect, useMemo, useState } from "react";
import { Plus, Search, Pencil, Trash2, X, Filter, ChevronDown, TrendingUp, Clock, Tag, Package, Grid3x3, List, Star, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import categoryService from "../../services/categoryService";
import menuService from "../../services/menuService";
import MenuFormModal from "../../components/owner/MenuFormModal";

function Menu() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, []);
    const user = JSON.parse(localStorage.getItem("user"));
    const restaurantId = user?.restaurantId;
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [viewMode, setViewMode] = useState("grid");
    const [filterCategory, setFilterCategory] = useState("ALL");
    const [filterStatus, setFilterStatus] = useState("ALL");

    useEffect(() => {
        if (restaurantId) {
            loadMenu();
            loadCategories();
        }
    }, [restaurantId]);

    const loadMenu = async () => {
        try {
            setLoading(true);
            const data = await menuService.getOwnerRestaurantMenu(restaurantId);
            setMenuItems(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load menu");
        } finally {
            setLoading(false);
        }
    };

    const loadCategories = async () => {
        try {
            const data = await categoryService.getRestaurantCategories(restaurantId);
            setCategories(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load categories");
        }
    };

    const handleEdit = (item) => {

    setEditingItem(item);

    setShowModal(true);

};

    const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this menu item?"
    );

    if (!confirmDelete) return;

    try {

        await menuService.deleteMenuItem(id);

        toast.success("Menu item deleted successfully");

        loadMenu();

    } catch (error) {

        console.error(error);

        toast.error("Failed to delete menu item");

    }

};

    const filteredMenu = useMemo(() => {
        let filtered = menuItems.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );
        if (filterCategory !== "ALL") {
            filtered = filtered.filter(item => item.categoryId === filterCategory);
        }
        if (filterStatus !== "ALL") {
            filtered = filtered.filter(item => 
                filterStatus === "AVAILABLE" ? item.available : !item.available
            );
        }
        return filtered;
    }, [menuItems, search, filterCategory, filterStatus]);

    const stats = {
        total: menuItems.length,
        available: menuItems.filter(item => item.available).length,
        unavailable: menuItems.filter(item => !item.available).length
    };

    const styles = {
        container: {
            padding: '32px',
            backgroundColor: '#f0f2f5',
            minHeight: '100vh'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '32px'
        },
        headerLeft: {
            display: 'flex',
            flexDirection: 'column'
        },
        title: {
            fontSize: '32px',
            fontWeight: '800',
            color: '#0a0a0a',
            margin: 0,
            letterSpacing: '-0.5px'
        },
        subtitle: {
            fontSize: '15px',
            color: '#6b7280',
            marginTop: '4px'
        },
        addBtn: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '14px 28px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #f97316, #ea580c)',
            color: 'white',
            border: 'none',
            fontWeight: '700',
            fontSize: '15px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 24px rgba(249,115,22,0.35)'
        },
        statsRow: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginBottom: '28px'
        },
        statCard: (color, bgColor, iconBg) => ({
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '20px 24px',
            border: '1px solid #eef2f6',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            transition: 'all 0.3s ease'
        }),
        statIconWrapper: (bgColor) => ({
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            backgroundColor: bgColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px'
        }),
        statValue: {
            fontSize: '28px',
            fontWeight: '800',
            color: '#0a0a0a',
            lineHeight: '1.2'
        },
        statLabel: {
            fontSize: '14px',
            color: '#6b7280',
            fontWeight: '500'
        },
        controlsBar: {
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '28px',
            alignItems: 'center'
        },
        searchWrapper: {
            flex: 1,
            minWidth: '280px',
            position: 'relative'
        },
        searchIcon: {
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#9ca3af'
        },
        searchInput: {
            width: '100%',
            padding: '14px 16px 14px 48px',
            borderRadius: '14px',
            border: '2px solid #e5e7eb',
            fontSize: '15px',
            outline: 'none',
            transition: 'all 0.3s ease',
            backgroundColor: '#ffffff',
            color: '#0a0a0a'
        },
        filterGroup: {
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap'
        },
        filterSelect: {
            padding: '12px 18px',
            borderRadius: '12px',
            border: '2px solid #e5e7eb',
            fontSize: '14px',
            fontWeight: '500',
            color: '#1a1a1a',
            backgroundColor: '#ffffff',
            cursor: 'pointer',
            outline: 'none',
            transition: 'all 0.3s ease',
            minWidth: '140px'
        },
        viewToggle: {
            display: 'flex',
            gap: '4px',
            backgroundColor: '#f1f3f5',
            padding: '4px',
            borderRadius: '12px'
        },
        viewBtn: (active) => ({
            padding: '8px 14px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: active ? '#ffffff' : 'transparent',
            color: active ? '#0a0a0a' : '#9ca3af',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: active ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontWeight: active ? '600' : '400',
            fontSize: '13px'
        }),
        gridContainer: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px'
        },
        menuCard: {
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid #eef2f6',
            transition: 'all 0.3s ease',
            position: 'relative'
        },
        menuCardImage: {
            width: '100%',
            height: '180px',
            objectFit: 'cover',
            backgroundColor: '#f1f3f5'
        },
        menuCardContent: {
            padding: '18px 20px 20px'
        },
        menuCardTop: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '6px'
        },
        menuCardName: {
            fontSize: '17px',
            fontWeight: '700',
            color: '#0a0a0a',
            margin: 0,
            flex: 1
        },
        menuCardPrice: {
            fontSize: '20px',
            fontWeight: '800',
            color: '#f97316',
            marginLeft: '12px'
        },
        menuCardMeta: {
            display: 'flex',
            gap: '12px',
            marginTop: '6px',
            flexWrap: 'wrap'
        },
        menuCardChip: {
            fontSize: '12px',
            color: '#6b7280',
            backgroundColor: '#f3f4f6',
            padding: '2px 12px',
            borderRadius: '50px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
        },
        menuCardFooter: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '14px',
            paddingTop: '14px',
            borderTop: '1px solid #f1f3f5'
        },
        statusBadge: (available) => ({
            padding: '4px 14px',
            borderRadius: '50px',
            fontSize: '12px',
            fontWeight: '600',
            backgroundColor: available ? '#dcfce7' : '#fee2e2',
            color: available ? '#16a34a' : '#dc2626',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
        }),
        cardActions: {
            display: 'flex',
            gap: '6px'
        },
        actionIcon: (color) => ({
            width: '34px',
            height: '34px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: color === 'blue' ? '#eff6ff' : '#fef2f2',
            color: color === 'blue' ? '#3b82f6' : '#ef4444',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }),
        listTable: {
            width: '100%',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid #eef2f6'
        },
        listThead: {
            backgroundColor: '#f8fafc',
            borderBottom: '1px solid #eef2f6'
        },
        listTh: {
            padding: '14px 18px',
            textAlign: 'left',
            fontSize: '12px',
            fontWeight: '600',
            color: '#6b7280',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
        },
        listTd: {
            padding: '14px 18px',
            borderBottom: '1px solid #f1f3f5',
            fontSize: '14px',
            color: '#1a1a1a',
            verticalAlign: 'middle'
        },
        emptyState: {
            textAlign: 'center',
            padding: '80px 20px',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #eef2f6'
        },
        emptyIcon: {
            fontSize: '56px',
            marginBottom: '16px'
        },
        emptyTitle: {
            fontSize: '22px',
            fontWeight: '700',
            color: '#0a0a0a',
            margin: 0
        },
        emptySub: {
            color: '#6b7280',
            marginTop: '6px',
            fontSize: '15px'
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
            border: '4px solid #eef2f6',
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
                    <p style={{ color: '#6b7280', marginTop: '16px', fontSize: '15px' }}>Loading menu...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <h1 style={styles.title}>🍽 Menu Management</h1>
                    <p style={styles.subtitle}>Manage all your restaurant menu items</p>
                </div>
                <button
                    style={styles.addBtn}
                    onClick={() => {
    setEditingItem(null);
    setShowModal(true);
}}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.03)';
                        e.currentTarget.style.boxShadow = '0 12px 32px rgba(249,115,22,0.45)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(249,115,22,0.35)';
                    }}
                >
                    <Plus size={20} />
                    Add New Item
                </button>
            </div>

            {/* Stats */}
            <div style={styles.statsRow}>
                <div style={styles.statCard("#f97316", "#fff7ed", "#ffedd5")}>
                    <div style={styles.statIconWrapper("#ffedd5")}>📦</div>
                    <div>
                        <div style={styles.statValue}>{stats.total}</div>
                        <div style={styles.statLabel}>Total Items</div>
                    </div>
                </div>
                <div style={styles.statCard("#22c55e", "#dcfce7", "#dcfce7")}>
                    <div style={styles.statIconWrapper("#dcfce7")}>✅</div>
                    <div>
                        <div style={styles.statValue}>{stats.available}</div>
                        <div style={styles.statLabel}>Available</div>
                    </div>
                </div>
                <div style={styles.statCard("#ef4444", "#fee2e2", "#fee2e2")}>
                    <div style={styles.statIconWrapper("#fee2e2")}>⛔</div>
                    <div>
                        <div style={styles.statValue}>{stats.unavailable}</div>
                        <div style={styles.statLabel}>Unavailable</div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div style={styles.controlsBar}>
                <div style={styles.searchWrapper}>
                    <Search size={18} style={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search menu items..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={styles.searchInput}
                        onFocus={(e) => {
                            e.currentTarget.style.borderColor = '#f97316';
                            e.currentTarget.style.boxShadow = '0 0 0 4px rgba(249,115,22,0.1)';
                        }}
                        onBlur={(e) => {
                            e.currentTarget.style.borderColor = '#e5e7eb';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    />
                </div>
                <div style={styles.filterGroup}>
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        style={styles.filterSelect}
                        onFocus={(e) => {
                            e.currentTarget.style.borderColor = '#f97316';
                            e.currentTarget.style.boxShadow = '0 0 0 4px rgba(249,115,22,0.1)';
                        }}
                        onBlur={(e) => {
                            e.currentTarget.style.borderColor = '#e5e7eb';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <option value="ALL">📂 All Categories</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        style={styles.filterSelect}
                        onFocus={(e) => {
                            e.currentTarget.style.borderColor = '#f97316';
                            e.currentTarget.style.boxShadow = '0 0 0 4px rgba(249,115,22,0.1)';
                        }}
                        onBlur={(e) => {
                            e.currentTarget.style.borderColor = '#e5e7eb';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <option value="ALL">🔄 All Status</option>
                        <option value="AVAILABLE">✅ Available</option>
                        <option value="UNAVAILABLE">❌ Unavailable</option>
                    </select>
                </div>
                <div style={styles.viewToggle}>
                    <button style={styles.viewBtn(viewMode === "grid")} onClick={() => setViewMode("grid")}>
                        <Grid3x3 size={16} />
                        Grid
                    </button>
                    <button style={styles.viewBtn(viewMode === "list")} onClick={() => setViewMode("list")}>
                        <List size={16} />
                        List
                    </button>
                </div>
            </div>

            {/* Menu Items */}
            {filteredMenu.length === 0 ? (
                <div style={styles.emptyState}>
                    <div style={styles.emptyIcon}>🍽️</div>
                    <h2 style={styles.emptyTitle}>No items found</h2>
                    <p style={styles.emptySub}>
                        {search || filterCategory !== "ALL" || filterStatus !== "ALL" 
                            ? "Try adjusting your filters" 
                            : "Start by adding your first menu item"}
                    </p>
                </div>
            ) : viewMode === "grid" ? (
                <div style={styles.gridContainer}>
                    {filteredMenu.map((item) => (
                        <div
                            key={item.id}
                            style={styles.menuCard}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
                                e.currentTarget.style.transform = 'translateY(-4px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <img
                                src={item.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop"}
                                alt={item.name}
                                style={styles.menuCardImage}
                                onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop";
                                }}
                            />
                            <div style={styles.menuCardContent}>
                                <div style={styles.menuCardTop}>
                                    <h3 style={styles.menuCardName}>{item.name}</h3>
                                    <span style={styles.menuCardPrice}>₹{item.price}</span>
                                </div>
                                <div style={styles.menuCardMeta}>
                                    <span style={styles.menuCardChip}>
                                        <Tag size={12} />
                                        {item.categoryName || "Uncategorized"}
                                    </span>
                                    <span style={styles.menuCardChip}>
                                        <Clock size={12} />
                                        {item.preparationTime || "N/A"} min
                                    </span>
                                </div>
                                <div style={styles.menuCardFooter}>
                                    <span style={styles.statusBadge(item.available)}>
                                        {item.available ? 'Available' : 'Unavailable'}
                                    </span>
                                    <div style={styles.cardActions}>
                                        <button
    style={styles.actionIcon("blue")}
    onClick={() => handleEdit(item)}
>
    <Pencil size={15} />
</button>
                                        <button
    style={styles.actionIcon("red")}
    onClick={() => handleDelete(item.id)}
>
    <Trash2 size={15} />
</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <table style={styles.listTable}>
                    <thead style={styles.listThead}>
                        <tr>
                            <th style={styles.listTh}>Item</th>
                            <th style={styles.listTh}>Category</th>
                            <th style={styles.listTh}>Price</th>
                            <th style={styles.listTh}>Status</th>
                            <th style={styles.listTh} align="center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMenu.map((item) => (
                            <tr key={item.id}>
                                <td style={styles.listTd}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <img
                                            src={item.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=60&h=60&fit=crop"}
                                            alt={item.name}
                                            style={{
                                                width: '44px',
                                                height: '44px',
                                                borderRadius: '10px',
                                                objectFit: 'cover'
                                            }}
                                            onError={(e) => {
                                                e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=60&h=60&fit=crop";
                                            }}
                                        />
                                        <div>
                                            <div style={{ fontWeight: '600', color: '#0a0a0a' }}>{item.name}</div>
                                            <div style={{ fontSize: '12px', color: '#9ca3af' }}>{item.description || "No description"}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style={styles.listTd}>
                                    <span style={styles.menuCardChip}>{item.categoryName || "Uncategorized"}</span>
                                </td>
                                <td style={{ ...styles.listTd, fontWeight: '700', color: '#f97316' }}>₹{item.price}</td>
                                <td style={styles.listTd}>
                                    <span style={styles.statusBadge(item.available)}>
                                        {item.available ? 'Available' : 'Unavailable'}
                                    </span>
                                </td>
                                <td style={{ ...styles.listTd, textAlign: 'center' }}>
                                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                                        <button
    style={{ ...styles.actionIcon("blue"), width: '32px', height: '32px' }}
    onClick={() => handleEdit(item)}
>
    <Pencil size={14} />
</button>
                                        <button
    style={{ ...styles.actionIcon("red"), width: "32px", height: "32px" }}
    onClick={() => handleDelete(item.id)}
>
    <Trash2 size={14} />
</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Modal */}
            {showModal && (
    <MenuFormModal
        restaurantId={restaurantId}
        categories={categories}
        editingItem={editingItem}
        onClose={() => {
            setShowModal(false);
            setEditingItem(null);
        }}
        onSuccess={() => {
            loadMenu();
            setShowModal(false);
            setEditingItem(null);
        }}
    />
)}

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

export default Menu;