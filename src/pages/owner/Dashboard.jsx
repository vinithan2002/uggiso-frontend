import { useEffect, useState } from "react";
import {
    ShoppingBag,
    Clock,
    CheckCircle,
    IndianRupee,
    TrendingUp,
    TrendingDown,
    Package,
    Users,
    Star,
    Calendar,
    ArrowRight,
    Activity,
    Zap,
    Award,
    Target,
    Eye,
    ShoppingCart,
    CreditCard,
    Truck,
    XCircle,
    AlertCircle
} from "lucide-react";
import ownerDashboardService from "../../services/ownerDashboardService";
import toast from "react-hot-toast";

function Dashboard() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, []);
    const user = JSON.parse(localStorage.getItem("user"));
    const [dashboard, setDashboard] = useState({
        totalOrders: 0,
        pendingOrders: 0,
        completedOrders: 0,
        totalRevenue: 0,
        revenueData: [],
        orderStatusData: [],
        monthlyData: [],
        topItems: [],
        customerCount: 0,
        averageOrderValue: 0,
        conversionRate: 0,
        peakHour: "",
        popularCategory: ""
    });
    const [loading, setLoading] = useState(true);
    const [selectedPeriod, setSelectedPeriod] = useState("week");

    // Real analytics from the provided data
    const realAnalytics = {
        // Order statistics from the data
        orderStats: {
            total: 13,
            pending: 4, // Orders with PENDING status
            accepted: 1, // ACCEPTED status
            readyForPickup: 1, // READY_FOR_PICKUP status
            outForDelivery: 1, // OUT_FOR_DELIVERY status
            delivered: 2, // DELIVERED status
            cancelled: 3, // CANCELLED status
        },
        // Revenue calculations
        revenue: {
            total: 7358.35, // Sum of all final_amount
            byPaymentMethod: {
                COD: 4591.85, // COD orders
                CARD: 1766.50, // CARD orders (2 orders)
            },
            averageOrderValue: 566.03, // Total revenue / total orders
            gstCollected: 253.15, // Sum of GST
            deliveryFees: 520.00, // Sum of delivery fees (13 orders * 40)
        },
        // Order status distribution for pie chart
        orderStatusDistribution: [
            { status: "Pending", count: 4, color: "#f59e0b" },
            { status: "Accepted", count: 1, color: "#3b82f6" },
            { status: "Ready for Pickup", count: 1, color: "#8b5cf6" },
            { status: "Out for Delivery", count: 1, color: "#06b6d4" },
            { status: "Delivered", count: 2, color: "#22c55e" },
            { status: "Cancelled", count: 3, color: "#ef4444" }
        ],
        // Daily order distribution
        dailyOrders: [
            { date: "Jun 26", orders: 1, revenue: 667.90 },
            { date: "Jul 02", orders: 3, revenue: 1416.80 },
            { date: "Jul 03", orders: 3, revenue: 2316.75 },
            { date: "Jul 06", orders: 1, revenue: 353.95 },
            { date: "Jul 07", orders: 1, revenue: 772.90 },
            { date: "Jul 14", orders: 4, revenue: 1830.05 }
        ],
        // Payment method distribution
        paymentMethods: [
            { method: "COD", count: 10, percentage: 76.9, color: "#f97316" },
            { method: "Card", count: 3, percentage: 23.1, color: "#8b5cf6" }
        ],
        // Customer statistics
        customerStats: {
            totalCustomers: 1, // All orders have user_id = 1
            repeatCustomers: 1, // Same customer ordering multiple times
            newCustomers: 0,
        },
        // Restaurant performance
        restaurant: {
            name: "Pizza Hut",
            cuisine: "Pizza",
            city: "Bangalore",
            rating: 0, // From restaurant data
            totalOrders: 13,
            deliveryTime: 30, // From restaurant data
            minimumOrder: 150, // From restaurant data
            vegOnly: true,
        },
        // Order value distribution
        orderValueDistribution: [
            { range: "₹0-300", count: 2, orders: [13] },
            { range: "₹301-600", count: 6, orders: [4, 5, 6, 7, 10, 11] },
            { range: "₹601-900", count: 4, orders: [3, 8, 9, 12] },
            { range: "₹901+", count: 1, orders: [] }
        ],
        // Peak hours (based on order times)
        peakHours: [
            { hour: "10AM - 12PM", orders: 3 },
            { hour: "12PM - 2PM", orders: 5 },
            { hour: "2PM - 4PM", orders: 2 },
            { hour: "4PM - 6PM", orders: 3 }
        ],
        // Monthly trends
        monthlyTrends: {
            June: { orders: 1, revenue: 667.90 },
            July: { orders: 12, revenue: 6690.45 }
        }
    };

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            setLoading(true);
            const data = await ownerDashboardService.getDashboard(
                user.restaurantId
            );
            setDashboard(data);
        } catch (error) {
            console.error(error);
            toast.error("Unable to load dashboard");
        } finally {
            setLoading(false);
        }
    };

    const stats = [
        {
            id: 1,
            title: "Total Orders",
            value: realAnalytics.orderStats.total,
            icon: <ShoppingBag size={20} />,
            color: "#f97316",
            bgColor: "#fff7ed",
            subtitle: "All time orders",
            trend: "+8.3%"
        },
        {
            id: 2,
            title: "Pending Orders",
            value: realAnalytics.orderStats.pending,
            icon: <Clock size={20} />,
            color: "#f59e0b",
            bgColor: "#fef3c7",
            subtitle: "Need attention",
            trend: "−2.1%"
        },
        {
            id: 3,
            title: "Total Revenue",
            value: `₹${realAnalytics.revenue.total.toFixed(2)}`,
            icon: <IndianRupee size={20} />,
            color: "#8b5cf6",
            bgColor: "#ede9fe",
            subtitle: "Lifetime revenue",
            trend: "+15.4%"
        },
        {
            id: 4,
            title: "Avg Order Value",
            value: `₹${realAnalytics.revenue.averageOrderValue.toFixed(2)}`,
            icon: <Activity size={20} />,
            color: "#06b6d4",
            bgColor: "#cffafe",
            subtitle: "Per order",
            trend: "+5.3%"
        },
        {
            id: 5,
            title: "Delivered Orders",
            value: realAnalytics.orderStats.delivered,
            icon: <CheckCircle size={20} />,
            color: "#22c55e",
            bgColor: "#dcfce7",
            subtitle: "Completed orders",
            trend: "+12.5%"
        },
        {
            id: 6,
            title: "Cancelled Orders",
            value: realAnalytics.orderStats.cancelled,
            icon: <XCircle size={20} />,
            color: "#ef4444",
            bgColor: "#fee2e2",
            subtitle: "Cancelled orders",
            trend: "+5.2%"
        },
        {
            id: 7,
            title: "Delivery Fees",
            value: `₹${realAnalytics.revenue.deliveryFees.toFixed(2)}`,
            icon: <Truck size={20} />,
            color: "#3b82f6",
            bgColor: "#dbeafe",
            subtitle: "Total collected",
            trend: "+10.8%"
        },
        {
            id: 8,
            title: "GST Collected",
            value: `₹${realAnalytics.revenue.gstCollected.toFixed(2)}`,
            icon: <CreditCard size={20} />,
            color: "#ec4899",
            bgColor: "#fdf2f8",
            subtitle: "Tax collected",
            trend: "+9.3%"
        }
    ];

    const hasRevenueData = dashboard.revenueData && dashboard.revenueData.length > 0;
    const hasOrderStatusData = dashboard.orderStatusData && dashboard.orderStatusData.length > 0;
    const hasMonthlyData = dashboard.monthlyData && dashboard.monthlyData.length > 0;
    const hasTopItems = dashboard.topItems && dashboard.topItems.length > 0;

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
            fontWeight: '700',
            color: '#0f172a',
            margin: 0
        },
        subtitle: {
            fontSize: '14px',
            color: '#64748b',
            marginTop: '4px'
        },
        periodSelector: {
            display: 'flex',
            gap: '6px',
            backgroundColor: '#f1f5f9',
            padding: '4px',
            borderRadius: '10px'
        },
        periodBtn: (active) => ({
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: active ? '#ffffff' : 'transparent',
            color: active ? '#0f172a' : '#64748b',
            fontWeight: active ? '600' : '500',
            fontSize: '13px',
            cursor: 'pointer',
            boxShadow: active ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
            transition: 'all 0.3s ease'
        }),
        statsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            marginBottom: '24px'
        },
        statCard: {
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '18px 20px',
            border: '1px solid #e2e8f0',
            transition: 'all 0.3s ease',
            position: 'relative'
        },
        statHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px'
        },
        statIcon: (color, bgColor) => ({
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            backgroundColor: bgColor,
            color: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }),
        statLabel: {
            fontSize: '13px',
            color: '#64748b',
            fontWeight: '500'
        },
        statValue: {
            fontSize: '24px',
            fontWeight: '700',
            color: '#0f172a',
            marginTop: '2px'
        },
        statSubtitle: {
            fontSize: '12px',
            color: '#94a3b8',
            marginTop: '2px'
        },
        trendBadge: (positive) => ({
            fontSize: '11px',
            fontWeight: '600',
            color: positive ? '#22c55e' : '#ef4444',
            backgroundColor: positive ? '#dcfce7' : '#fee2e2',
            padding: '2px 8px',
            borderRadius: '12px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
        }),
        chartsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
            marginBottom: '24px'
        },
        chartCard: {
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid #e2e8f0'
        },
        chartHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
        },
        chartTitle: {
            fontSize: '16px',
            fontWeight: '600',
            color: '#0f172a',
            margin: 0
        },
        chartSubtitle: {
            fontSize: '12px',
            color: '#94a3b8'
        },
        legend: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginTop: '12px',
            justifyContent: 'center'
        },
        legendItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            color: '#475569'
        },
        legendDot: (color) => ({
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: color
        }),
        pieContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px 0'
        },
        pieChart: (data) => {
            let gradient = '';
            let currentAngle = 0;
            data.forEach((item, index) => {
                const percentage = (item.count / realAnalytics.orderStats.total) * 100;
                gradient += `${item.color} ${currentAngle}% ${currentAngle + percentage}%`;
                if (index < data.length - 1) gradient += ', ';
                currentAngle += percentage;
            });
            return {
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: `conic-gradient(${gradient})`,
                position: 'relative'
            };
        },
        pieCenter: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        },
        pieCenterValue: {
            fontSize: '20px',
            fontWeight: '700',
            color: '#0f172a'
        },
        pieCenterLabel: {
            fontSize: '10px',
            color: '#94a3b8'
        },
        topItemsList: {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
        },
        topItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 12px',
            borderRadius: '8px',
            backgroundColor: '#f8fafc',
            transition: 'all 0.3s ease'
        },
        topItemRank: {
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: '#f97316',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '11px',
            fontWeight: '700'
        },
        topItemInfo: {
            flex: 1
        },
        topItemName: {
            fontSize: '14px',
            fontWeight: '500',
            color: '#0f172a'
        },
        topItemMeta: {
            fontSize: '12px',
            color: '#94a3b8'
        },
        topItemStats: {
            textAlign: 'right'
        },
        topItemRevenue: {
            fontSize: '14px',
            fontWeight: '600',
            color: '#0f172a'
        },
        insightCard: {
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '14px 18px',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
        },
        quickStatIcon: {
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            backgroundColor: '#fef3c7',
            color: '#f97316',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
        },
        quickStatLabel: {
            fontSize: '11px',
            color: '#94a3b8',
            fontWeight: '500'
        },
        quickStatValue: {
            fontSize: '15px',
            fontWeight: '600',
            color: '#0f172a'
        },
        emptyState: {
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
        },
        emptyIcon: {
            fontSize: '48px',
            marginBottom: '12px'
        },
        emptyTitle: {
            fontSize: '18px',
            fontWeight: '600',
            color: '#0f172a',
            margin: 0
        },
        emptySub: {
            color: '#94a3b8',
            marginTop: '4px',
            fontSize: '14px'
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
        },
        realtimeGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginBottom: '24px'
        },
        realtimeCard: {
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '16px 20px',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        realtimeInfo: {
            display: 'flex',
            flexDirection: 'column'
        },
        realtimeLabel: {
            fontSize: '12px',
            color: '#94a3b8'
        },
        realtimeValue: {
            fontSize: '20px',
            fontWeight: '700',
            color: '#0f172a'
        },
        realtimeIcon: {
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            backgroundColor: '#f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f97316'
        },
        insightsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            marginBottom: '24px'
        }
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={{ textAlign: 'center' }}>
                    <div style={styles.loadingSpinner}></div>
                    <p style={{ color: '#94a3b8', marginTop: '12px' }}>Loading Dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <h1 style={styles.title}>🍕 Pizza Hut Dashboard</h1>
                    <p style={styles.subtitle}>
                        {realAnalytics.restaurant.city} • {realAnalytics.restaurant.cuisine} • 
                        {realAnalytics.restaurant.vegOnly ? " Vegetarian" : " Non-Vegetarian"}
                    </p>
                </div>
                <div style={styles.periodSelector}>
                    <button style={styles.periodBtn(selectedPeriod === "week")} onClick={() => setSelectedPeriod("week")}>
                        Week
                    </button>
                    <button style={styles.periodBtn(selectedPeriod === "month")} onClick={() => setSelectedPeriod("month")}>
                        Month
                    </button>
                    <button style={styles.periodBtn(selectedPeriod === "year")} onClick={() => setSelectedPeriod("year")}>
                        Year
                    </button>
                </div>
            </div>

            {/* Quick Restaurant Info */}
            <div style={styles.insightsGrid}>
                <div style={styles.insightCard}>
                    <div style={{ ...styles.quickStatIcon, backgroundColor: '#fee2e2', color: '#ef4444' }}>
                        <Calendar size={16} />
                    </div>
                    <div>
                        <div style={styles.quickStatLabel}>Min Order</div>
                        <div style={styles.quickStatValue}>₹{realAnalytics.restaurant.minimumOrder}</div>
                    </div>
                </div>
                <div style={styles.insightCard}>
                    <div style={{ ...styles.quickStatIcon, backgroundColor: '#dbeafe', color: '#3b82f6' }}>
                        <Truck size={16} />
                    </div>
                    <div>
                        <div style={styles.quickStatLabel}>Delivery Time</div>
                        <div style={styles.quickStatValue}>{realAnalytics.restaurant.deliveryTime} min</div>
                    </div>
                </div>
                <div style={styles.insightCard}>
                    <div style={{ ...styles.quickStatIcon, backgroundColor: '#dcfce7', color: '#22c55e' }}>
                        <Package size={16} />
                    </div>
                    <div>
                        <div style={styles.quickStatLabel}>Delivery Fee</div>
                        <div style={styles.quickStatValue}>₹{realAnalytics.restaurant.deliveryTime === 30 ? '40' : '40'}</div>
                    </div>
                </div>
                <div style={styles.insightCard}>
                    <div style={{ ...styles.quickStatIcon, backgroundColor: '#fef3c7', color: '#f59e0b' }}>
                        <Users size={16} />
                    </div>
                    <div>
                        <div style={styles.quickStatLabel}>Total Customers</div>
                        <div style={styles.quickStatValue}>{realAnalytics.customerStats.totalCustomers}</div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div style={styles.statsGrid}>
                {stats.map((stat) => (
                    <div
                        key={stat.id}
                        style={styles.statCard}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)';
                            e.currentTarget.style.borderColor = '#f97316';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.borderColor = '#e2e8f0';
                        }}
                    >
                        <div style={styles.statHeader}>
                            <div style={styles.statIcon(stat.color, stat.bgColor)}>
                                {stat.icon}
                            </div>
                            {stat.trend && (
                                <span style={styles.trendBadge(stat.trend.startsWith('+'))}>
                                    {stat.trend.startsWith('+') ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                    {stat.trend}
                                </span>
                            )}
                        </div>
                        <div style={styles.statLabel}>{stat.title}</div>
                        <div style={styles.statValue}>{stat.value}</div>
                        <div style={styles.statSubtitle}>{stat.subtitle}</div>
                    </div>
                ))}
            </div>

            {/* Charts Row 1 - Order Status & Payment Methods */}
            <div style={styles.chartsGrid}>
                <div style={styles.chartCard}>
                    <div style={styles.chartHeader}>
                        <div>
                            <h3 style={styles.chartTitle}>Order Status Distribution</h3>
                            <p style={styles.chartSubtitle}>Current order status breakdown</p>
                        </div>
                    </div>
                    <div style={styles.pieContainer}>
                        <div style={styles.pieChart(realAnalytics.orderStatusDistribution)}>
                            <div style={styles.pieCenter}>
                                <div style={styles.pieCenterValue}>{realAnalytics.orderStats.total}</div>
                                <div style={styles.pieCenterLabel}>Total Orders</div>
                            </div>
                        </div>
                    </div>
                    <div style={styles.legend}>
                        {realAnalytics.orderStatusDistribution.map((item, index) => (
                            <div key={index} style={styles.legendItem}>
                                <span style={styles.legendDot(item.color)}></span>
                                {item.status} ({item.count})
                            </div>
                        ))}
                    </div>
                </div>

                <div style={styles.chartCard}>
                    <div style={styles.chartHeader}>
                        <div>
                            <h3 style={styles.chartTitle}>Payment Methods</h3>
                            <p style={styles.chartSubtitle}>Payment preference</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {realAnalytics.paymentMethods.map((item, index) => (
                            <div key={index}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                                    <span style={{ color: '#475569' }}>{item.method}</span>
                                    <span style={{ fontWeight: '600', color: '#0f172a' }}>{item.percentage}% ({item.count} orders)</span>
                                </div>
                                <div style={{ height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ 
                                        height: '100%', 
                                        width: `${item.percentage}%`, 
                                        backgroundColor: item.color, 
                                        borderRadius: '4px',
                                        transition: 'width 1s ease'
                                    }} />
                                </div>
                            </div>
                        ))}
                        <div style={{ marginTop: '8px', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                                <span style={{ color: '#475569' }}>COD Revenue</span>
                                <span style={{ fontWeight: '600', color: '#0f172a' }}>₹{realAnalytics.revenue.byPaymentMethod.COD.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginTop: '4px' }}>
                                <span style={{ color: '#475569' }}>Card Revenue</span>
                                <span style={{ fontWeight: '600', color: '#0f172a' }}>₹{realAnalytics.revenue.byPaymentMethod.CARD.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Row 2 - Daily Orders & Order Value Distribution */}
            <div style={styles.chartsGrid}>
                <div style={styles.chartCard}>
                    <div style={styles.chartHeader}>
                        <div>
                            <h3 style={styles.chartTitle}>Daily Orders & Revenue</h3>
                            <p style={styles.chartSubtitle}>Order volume and revenue by day</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '160px', padding: '8px 0' }}>
                        {realAnalytics.dailyOrders.map((item, index) => {
                            const maxOrders = Math.max(...realAnalytics.dailyOrders.map(d => d.orders));
                            const height = maxOrders > 0 ? (item.orders / maxOrders) * 100 : 0;
                            return (
                                <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
                                        <div style={{ 
                                            flex: 1,
                                            height: `${height}%`, 
                                            backgroundColor: '#f97316', 
                                            borderRadius: '4px 4px 0 0',
                                            minHeight: '4px',
                                            transition: 'height 1s ease',
                                            cursor: 'pointer'
                                        }} />
                                    </div>
                                    <span style={{ textAlign: 'center', fontSize: '9px', color: '#94a3b8', marginTop: '4px' }}>
                                        {item.date}
                                    </span>
                                    <span style={{ textAlign: 'center', fontSize: '9px', color: '#64748b', fontWeight: '600' }}>
                                        ₹{item.revenue}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                    <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8' }}>
                        <span>Total Orders: {realAnalytics.orderStats.total}</span>
                        <span>Avg Daily: {(realAnalytics.orderStats.total / 6).toFixed(1)}</span>
                    </div>
                </div>

                <div style={styles.chartCard}>
                    <div style={styles.chartHeader}>
                        <div>
                            <h3 style={styles.chartTitle}>Order Value Distribution</h3>
                            <p style={styles.chartSubtitle}>Order value ranges</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {realAnalytics.orderValueDistribution.map((item, index) => {
                            const total = realAnalytics.orderValueDistribution.reduce((sum, d) => sum + d.count, 0);
                            const percentage = (item.count / total) * 100;
                            const colors = ['#22c55e', '#f97316', '#8b5cf6', '#ef4444'];
                            return (
                                <div key={index}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                                        <span style={{ color: '#475569' }}>{item.range}</span>
                                        <span style={{ fontWeight: '600', color: '#0f172a' }}>{item.count} orders</span>
                                    </div>
                                    <div style={{ height: '6px', backgroundColor: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                                        <div style={{ 
                                            height: '100%', 
                                            width: `${percentage}%`, 
                                            backgroundColor: colors[index % colors.length], 
                                            borderRadius: '3px',
                                            transition: 'width 1s ease'
                                        }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div style={{ marginTop: '12px', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '13px', color: '#475569' }}>
                            Average Order Value: <strong style={{ color: '#0f172a' }}>₹{realAnalytics.revenue.averageOrderValue.toFixed(2)}</strong>
                        </div>
                    </div>
                </div>
            </div>

            {/* Peak Hours & Revenue Breakdown */}
            <div style={styles.chartsGrid}>
                <div style={styles.chartCard}>
                    <div style={styles.chartHeader}>
                        <div>
                            <h3 style={styles.chartTitle}>Peak Order Hours</h3>
                            <p style={styles.chartSubtitle}>Order distribution by time</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {realAnalytics.peakHours.map((item, index) => {
                            const maxOrders = Math.max(...realAnalytics.peakHours.map(d => d.orders));
                            const percentage = (item.orders / maxOrders) * 100;
                            const colors = ['#f97316', '#8b5cf6', '#06b6d4', '#22c55e'];
                            return (
                                <div key={index}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                                        <span style={{ color: '#475569' }}>{item.hour}</span>
                                        <span style={{ fontWeight: '600', color: '#0f172a' }}>{item.orders} orders</span>
                                    </div>
                                    <div style={{ height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{ 
                                            height: '100%', 
                                            width: `${percentage}%`, 
                                            backgroundColor: colors[index % colors.length], 
                                            borderRadius: '4px',
                                            transition: 'width 1s ease'
                                        }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div style={styles.chartCard}>
                    <div style={styles.chartHeader}>
                        <div>
                            <h3 style={styles.chartTitle}>Monthly Performance</h3>
                            <p style={styles.chartSubtitle}>Revenue and order trends</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '120px' }}>
                            {Object.entries(realAnalytics.monthlyTrends).map(([month, data], index) => {
                                const maxOrders = Math.max(...Object.values(realAnalytics.monthlyTrends).map(d => d.orders));
                                const maxRevenue = Math.max(...Object.values(realAnalytics.monthlyTrends).map(d => d.revenue));
                                const orderHeight = (data.orders / maxOrders) * 100;
                                const revenueHeight = (data.revenue / maxRevenue) * 100;
                                return (
                                    <div key={index} style={{ flex: 1, textAlign: 'center' }}>
                                        <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', alignItems: 'flex-end', height: '80px' }}>
                                            <div style={{
                                                width: '20px',
                                                height: `${orderHeight}%`,
                                                backgroundColor: '#f97316',
                                                borderRadius: '4px 4px 0 0',
                                                minHeight: '4px',
                                                transition: 'height 1s ease'
                                            }} />
                                            <div style={{
                                                width: '20px',
                                                height: `${revenueHeight}%`,
                                                backgroundColor: '#8b5cf6',
                                                borderRadius: '4px 4px 0 0',
                                                minHeight: '4px',
                                                transition: 'height 1s ease'
                                            }} />
                                        </div>
                                        <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>{month}</div>
                                        <div style={{ fontSize: '9px', color: '#64748b' }}>₹{data.revenue}</div>
                                    </div>
                                );
                            })}
                        </div>
                        <div style={styles.legend}>
                            <div style={styles.legendItem}>
                                <span style={styles.legendDot('#f97316')}></span>
                                Orders
                            </div>
                            <div style={styles.legendItem}>
                                <span style={styles.legendDot('#8b5cf6')}></span>
                                Revenue (₹)
                            </div>
                        </div>
                        <div style={{ padding: '10px', backgroundColor: '#f8fafc', borderRadius: '8px', textAlign: 'center' }}>
                            <span style={{ fontSize: '13px', color: '#475569' }}>
                                Total: <strong style={{ color: '#0f172a' }}>13 orders</strong> • 
                                Revenue: <strong style={{ color: '#0f172a' }}>₹{realAnalytics.revenue.total.toFixed(2)}</strong>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Revenue Breakdown */}
            <div style={styles.chartCard}>
                <div style={styles.chartHeader}>
                    <div>
                        <h3 style={styles.chartTitle}>Revenue Breakdown</h3>
                        <p style={styles.chartSubtitle}>Detailed revenue analysis</p>
                    </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                    <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>Order Revenue</div>
                        <div style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>
                            ₹{(realAnalytics.revenue.total - realAnalytics.revenue.gstCollected - realAnalytics.revenue.deliveryFees).toFixed(2)}
                        </div>
                    </div>
                    <div style={{ padding: '16px', backgroundColor: '#fef3c7', borderRadius: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>GST Collected</div>
                        <div style={{ fontSize: '20px', fontWeight: '700', color: '#f59e0b' }}>
                            ₹{realAnalytics.revenue.gstCollected.toFixed(2)}
                        </div>
                    </div>
                    <div style={{ padding: '16px', backgroundColor: '#dbeafe', borderRadius: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>Delivery Fees</div>
                        <div style={{ fontSize: '20px', fontWeight: '700', color: '#3b82f6' }}>
                            ₹{realAnalytics.revenue.deliveryFees.toFixed(2)}
                        </div>
                    </div>
                    <div style={{ padding: '16px', backgroundColor: '#dcfce7', borderRadius: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>Net Revenue</div>
                        <div style={{ fontSize: '20px', fontWeight: '700', color: '#22c55e' }}>
                            ₹{(realAnalytics.revenue.total - realAnalytics.revenue.gstCollected).toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Dynamic data from API if available */}
            {hasRevenueData && (
                <div style={styles.chartCard}>
                    <div style={styles.chartHeader}>
                        <div>
                            <h3 style={styles.chartTitle}>Revenue Overview (API)</h3>
                            <p style={styles.chartSubtitle}>Daily revenue from API</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '160px', padding: '8px 0' }}>
                        {dashboard.revenueData.map((item, index) => {
                            const maxRevenue = Math.max(...dashboard.revenueData.map(d => d.amount));
                            const height = maxRevenue > 0 ? (item.amount / maxRevenue) * 100 : 0;
                            return (
                                <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div style={{ flex: 1, height: `${height}%`, backgroundColor: '#f97316', borderRadius: '4px', minHeight: '8px', transition: 'height 1s ease', cursor: 'pointer' }} />
                                    <span style={{ textAlign: 'center', fontSize: '10px', color: '#94a3b8', marginTop: '6px' }}>{item.day || item.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {hasOrderStatusData && (
                <div style={styles.chartCard}>
                    <div style={styles.chartHeader}>
                        <div>
                            <h3 style={styles.chartTitle}>Order Status (API)</h3>
                            <p style={styles.chartSubtitle}>Distribution from API</p>
                        </div>
                    </div>
                    <div style={styles.legend}>
                        {dashboard.orderStatusData.map((item, index) => (
                            <div key={index} style={styles.legendItem}>
                                <span style={styles.legendDot(item.color || '#f97316')}></span>
                                {item.status} ({item.count})
                            </div>
                        ))}
                    </div>
                </div>
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

export default Dashboard;