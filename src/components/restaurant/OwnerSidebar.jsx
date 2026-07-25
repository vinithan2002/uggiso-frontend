import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
    LayoutDashboard,
    ShoppingBag,
    UtensilsCrossed,
    Grid2x2,
    Store,
    LogOut,
    ChefHat,
    Bell,
    Settings,
    HelpCircle
} from "lucide-react";
import { useState } from "react";

function OwnerSidebar({ collapsed, setCollapsed }) {
    const { logout } = useAuth();
    const user = JSON.parse(localStorage.getItem("user"));

    const menuItems = [
        {
            to: "/owner/dashboard",
            icon: <LayoutDashboard size={20} />,
            label: "Dashboard",
            badge: "12"
        },
        {
            to: "/owner/orders",
            icon: <ShoppingBag size={20} />,
            label: "Orders",
            badge: "5"
        },
        {
            to: "/owner/menu",
            icon: <UtensilsCrossed size={20} />,
            label: "Menu"
        },
        {
            to: "/owner/restaurant-profile",
            icon: <Store size={20} />,
            label: "Restaurant Profile"
        }
    ];

    const linkClass = ({ isActive }) =>
        `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 font-medium ${
            isActive
                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25"
                : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
        }`;

    const styles = {
        sidebar: {
            width: collapsed ? '80px' : '280px',
            height: '100vh',
            backgroundColor: '#ffffff',
            borderRight: '1px solid #f1f5f9',
            boxShadow: '4px 0 30px rgba(0,0,0,0.04)',
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: 50,
            transition: 'width 0.3s ease',
            overflow: 'hidden'
        },
        header: {
            padding: collapsed ? '16px 12px' : '20px 24px',
            borderBottom: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            flexShrink: 0,
            minHeight: '80px'
        },
        logoWrapper: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
        },
        logoIcon: {
            width: '44px',
            height: '44px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #f97316, #ef4444)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold',
            flexShrink: 0,
            boxShadow: '0 4px 14px rgba(249,115,22,0.3)'
        },
        logoText: {
            fontSize: '20px',
            fontWeight: '800',
            color: '#0f172a',
            letterSpacing: '-0.5px',
            whiteSpace: 'nowrap'
        },
        logoSub: {
            fontSize: '10px',
            color: '#94a3b8',
            fontWeight: '500',
            letterSpacing: '0.5px',
            textTransform: 'uppercase'
        },
        logoHidden: {
            display: 'none'
        },
        userCard: {
            margin: collapsed ? '8px 8px' : '16px 20px',
            padding: collapsed ? '12px' : '14px 18px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #fff7ed, #ffedd5)',
            border: '1px solid #fed7aa',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            justifyContent: collapsed ? 'center' : 'flex-start'
        },
        userAvatar: {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f97316, #ef4444)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '16px',
            fontWeight: '700',
            flexShrink: 0
        },
        userDetails: {
            flex: 1
        },
        userDetailsHidden: {
            display: 'none'
        },
        userGreeting: {
            fontSize: '12px',
            color: '#92400e',
            fontWeight: '500'
        },
        userEmail: {
            fontSize: '13px',
            fontWeight: '600',
            color: '#78350f'
        },
        nav: {
            flex: 1,
            padding: collapsed ? '8px 8px' : '8px 16px',
            overflowY: 'auto',
            overflowX: 'hidden'
        },
        navLabel: {
            fontSize: '10px',
            fontWeight: '600',
            color: '#94a3b8',
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            padding: '8px 12px',
            marginBottom: '4px',
            display: collapsed ? 'none' : 'block'
        },
        linkWrapper: {
            position: 'relative',
            marginBottom: '4px'
        },
        link: (isActive) => ({
            display: 'flex',
            alignItems: 'center',
            gap: collapsed ? '0' : '12px',
            padding: collapsed ? '12px' : '10px 14px',
            borderRadius: '12px',
            backgroundColor: isActive ? 'linear-gradient(135deg, #f97316, #ef4444)' : 'transparent',
            color: isActive ? '#ffffff' : '#475569',
            textDecoration: 'none',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            justifyContent: collapsed ? 'center' : 'flex-start',
            position: 'relative',
            whiteSpace: 'nowrap',
            width: '100%',
            border: 'none',
            background: isActive ? 'linear-gradient(135deg, #f97316, #ef4444)' : 'transparent',
            boxShadow: isActive ? '0 4px 14px rgba(249,115,22,0.3)' : 'none'
        }),
        linkIcon: (isActive) => ({
            color: isActive ? '#ffffff' : '#94a3b8',
            transition: 'color 0.3s ease',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '20px'
        }),
        linkLabel: {
            fontSize: '14px',
            fontWeight: '500',
            whiteSpace: 'nowrap',
            flex: 1
        },
        linkLabelHidden: {
            display: 'none'
        },
        linkBadge: {
            backgroundColor: '#ffffff',
            color: '#f97316',
            fontSize: '10px',
            fontWeight: '700',
            padding: '2px 8px',
            borderRadius: '50px',
            display: collapsed ? 'none' : 'block'
        },
        linkBadgeActive: {
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: '#ffffff',
            fontSize: '10px',
            fontWeight: '700',
            padding: '2px 8px',
            borderRadius: '50px',
            display: collapsed ? 'none' : 'block'
        },
        footer: {
            padding: collapsed ? '8px 8px' : '16px 20px',
            borderTop: '1px solid #f1f5f9',
            flexShrink: 0
        },
        logoutBtn: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'center',
            gap: '10px',
            padding: collapsed ? '12px' : '12px 18px',
            borderRadius: '12px',
            backgroundColor: '#fef2f2',
            color: '#ef4444',
            border: 'none',
            fontWeight: '600',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
        },
        logoutText: {
            display: collapsed ? 'none' : 'block'
        },
        tooltip: {
            position: 'absolute',
            left: 'calc(100% + 12px)',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: '#0f172a',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '500',
            whiteSpace: 'nowrap',
            display: 'none',
            zIndex: 100,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }
    };

    return (
        <div style={styles.sidebar}>
            {/* Header */}
            <div style={styles.header}>
                <div style={styles.logoWrapper}>
                    <div style={styles.logoIcon}>🍕</div>
                    <div style={collapsed ? styles.logoHidden : {}}>
                        <div style={styles.logoText}>UGGISO</div>
                        <div style={styles.logoSub}>Restaurant Panel</div>
                    </div>
                </div>
                {/* Toggle button removed */}
            </div>

            {/* User Card */}
            <div style={styles.userCard}>
                <div style={styles.userAvatar}>
                    {user?.email?.[0]?.toUpperCase() || 'U'}
                </div>
                <div style={collapsed ? styles.userDetailsHidden : styles.userDetails}>
                    <div style={styles.userGreeting}>Welcome 👋</div>
                    <div style={styles.userEmail}>{user?.email || 'User'}</div>
                </div>
            </div>

            {/* Navigation */}
            <nav style={styles.nav}>
                <div style={styles.navLabel}>Main Menu</div>
                {menuItems.map((item) => (
                    <div key={item.to} style={styles.linkWrapper}>
                        <NavLink
                            to={item.to}
                            style={({ isActive }) => styles.link(isActive)}
                            className={({ isActive }) => isActive ? 'active' : ''}
                            onMouseEnter={(e) => {
                                if (collapsed) {
                                    const tooltip = e.currentTarget.querySelector('.tooltip');
                                    if (tooltip) {
                                        tooltip.style.display = 'block';
                                    }
                                }
                            }}
                            onMouseLeave={(e) => {
                                const tooltip = e.currentTarget.querySelector('.tooltip');
                                if (tooltip) {
                                    tooltip.style.display = 'none';
                                }
                            }}
                        >
                            {({ isActive }) => (
                                <>
                                    <span style={styles.linkIcon(isActive)}>
                                        {item.icon}
                                    </span>
                                    <span style={collapsed ? styles.linkLabelHidden : styles.linkLabel}>
                                        {item.label}
                                    </span>
                                    {item.badge && (
                                        <span style={isActive ? styles.linkBadgeActive : styles.linkBadge}>
                                            {item.badge}
                                        </span>
                                    )}
                                    {collapsed && (
                                        <span className="tooltip" style={styles.tooltip}>
                                            {item.label}
                                        </span>
                                    )}
                                </>
                            )}
                        </NavLink>
                    </div>
                ))}
            </nav>

            {/* Footer */}
            <div style={styles.footer}>
                <button
                    style={styles.logoutBtn}
                    onClick={logout}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#fee2e2';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#fef2f2';
                    }}
                >
                    <LogOut size={18} />
                    <span style={styles.logoutText}>Logout</span>
                </button>
            </div>
        </div>
    );
}

export default OwnerSidebar;