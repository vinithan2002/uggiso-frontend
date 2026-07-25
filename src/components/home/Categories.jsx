import { ChevronRight } from "lucide-react";
import { useRef } from "react";

function Categories({
    restaurants,
    selectedCategory,
    setSelectedCategory
}) {

    const scrollRef = useRef(null);

    // Complete category list with all food categories
    const allCategories = [
        { id: 0, name: "All" },
        { id: 1, name: "Pizza" },
        { id: 2, name: "Burger" },
        { id: 3, name: "Chicken" },
        { id: 4, name: "Chinese" },
        { id: 5, name: "Desserts" },
        { id: 6, name: "Drinks" },
        { id: 7, name: "Veg" },
        { id: 8, name: "Non Veg" },
        { id: 9, name: "Italian" },
        { id: 10, name: "South Indian" },
        { id: 11, name: "North Indian" },
        { id: 12, name: "Biryani" },
        { id: 13, name: "Cake" },
        { id: 14, name: "Fast Food" },
        { id: 15, name: "Seafood" },
        { id: 16, name: "Mexican" },
        { id: 17, name: "Japanese" },
        { id: 18, name: "Thai" },
        { id: 19, name: "Breakfast" },
        { id: 20, name: "Healthy" }
    ];

    // Category images - Real food photos for each category
    const categoryImages = {
        "All": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&h=150&fit=crop&crop=center",
        "Pizza": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=150&h=150&fit=crop&crop=center",
        "Burger": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150&h=150&fit=crop&crop=center",
        "Chicken": "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=150&h=150&fit=crop&crop=center",
        "Chinese": "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=150&h=150&fit=crop&crop=center",
        "Desserts": "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=150&h=150&fit=crop&crop=center",
        "Drinks": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=150&h=150&fit=crop&crop=center",
        "Veg": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=150&h=150&fit=crop&crop=center",
        "Non Veg": "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=150&h=150&fit=crop&crop=center",
        "Italian": "https://images.unsplash.com/photo-1535463731098-4c4a7c0a1e6f?w=150&h=150&fit=crop&crop=center",
        "South Indian": "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=150&h=150&fit=crop&crop=center",
        "North Indian": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=150&h=150&fit=crop&crop=center",
        "Biryani": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=150&h=150&fit=crop&crop=center",
        "Cake": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=150&h=150&fit=crop&crop=center",
        "Fast Food": "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=150&h=150&fit=crop&crop=center",
        "Seafood": "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=150&h=150&fit=crop&crop=center",
        "Mexican": "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=150&h=150&fit=crop&crop=center",
        "Japanese": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=150&h=150&fit=crop&crop=center",
        "Thai": "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=150&h=150&fit=crop&crop=center",
        "Breakfast": "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=150&h=150&fit=crop&crop=center",
        "Healthy": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=150&h=150&fit=crop&crop=center"
    };

    // Use all categories always
    const finalCategories = allCategories;

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 200;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const styles = {
        section: {
            width: '100%',
            backgroundColor: '#ffffff',
            padding: '40px 20px'
        },
        container: {
            maxWidth: '1200px',
            margin: '0 auto'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
        },
        headerLeft: {
            display: 'flex',
            flexDirection: 'column'
        },
        headerTitle: {
            fontSize: '24px',
            fontWeight: '700',
            color: '#0f172a',
            margin: 0
        },
        headerSub: {
            fontSize: '14px',
            color: '#94a3b8',
            margin: '4px 0 0 0'
        },
        viewAllBtn: {
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: '#f97316',
            fontWeight: '600',
            fontSize: '14px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            transition: 'color 0.3s ease'
        },
        scrollWrapper: {
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
        },
        scrollBtn: {
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'white',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'all 0.3s ease',
            color: '#475569',
            fontSize: '20px',
            fontWeight: '300'
        },
        scrollBtnLeft: {
            left: '-10px'
        },
        scrollBtnRight: {
            right: '-10px'
        },
        scrollContainer: {
            display: 'flex',
            gap: '16px',
            overflowX: 'auto',
            padding: '12px 4px 20px 4px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
        },
        categoryBtn: (isSelected) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '0',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            flexShrink: 0,
            position: 'relative',
            background: 'none',
            border: 'none'
        }),
        circleWrapper: (isSelected, image) => ({
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            border: isSelected ? '3px solid #f97316' : '3px solid transparent',
            boxShadow: isSelected ? '0 8px 25px rgba(249,115,22,0.3)' : '0 2px 8px rgba(0,0,0,0.04)',
            position: 'relative',
            overflow: 'hidden',
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }),
        circleOverlay: (isSelected) => ({
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '50%',
            backgroundColor: isSelected ? 'rgba(249,115,22,0.15)' : 'rgba(0,0,0,0.05)',
            transition: 'all 0.3s ease'
        }),
        categoryName: (isSelected) => ({
            fontSize: '12px',
            fontWeight: isSelected ? '700' : '500',
            color: isSelected ? '#f97316' : '#0f172a',
            transition: 'color 0.3s ease',
            whiteSpace: 'nowrap'
        }),
        selectedIndicator: {
            position: 'absolute',
            bottom: '-4px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#f97316'
        }
    };

    return (
        <section style={styles.section}>
            <div style={styles.container}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <h2 style={styles.headerTitle}>🍽 Food Categories</h2>
                        <p style={styles.headerSub}>Find your favourite dishes</p>
                    </div>
                    <button 
                        style={styles.viewAllBtn}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#ea580c'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#f97316'}
                    >
                        View All Categories
                        <ChevronRight size={18} />
                    </button>
                </div>

                {/* Scrollable Categories - Circular with Images */}
                <div style={styles.scrollWrapper}>
                    <button 
                        style={{ ...styles.scrollBtn, ...styles.scrollBtnLeft }}
                        onClick={() => scroll('left')}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#f97316';
                            e.currentTarget.style.color = 'white';
                            e.currentTarget.style.borderColor = '#f97316';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'white';
                            e.currentTarget.style.color = '#475569';
                            e.currentTarget.style.borderColor = '#e2e8f0';
                        }}
                    >
                        ‹
                    </button>

                    <div 
                        ref={scrollRef}
                        style={styles.scrollContainer}
                        className="categories-scroll"
                    >
                        {finalCategories.map((category) => {
                            const isSelected = selectedCategory === category.name;
                            const image = categoryImages[category.name] || categoryImages["All"];

                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.name)}
                                    style={styles.categoryBtn(isSelected)}
                                    onMouseEnter={(e) => {
                                        if (!isSelected) {
                                            const circle = e.currentTarget.querySelector('.circle-wrapper');
                                            if (circle) {
                                                circle.style.transform = 'scale(1.05)';
                                                circle.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                                            }
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isSelected) {
                                            const circle = e.currentTarget.querySelector('.circle-wrapper');
                                            if (circle) {
                                                circle.style.transform = 'scale(1)';
                                                circle.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                                            }
                                        }
                                    }}
                                >
                                    <div 
                                        className="circle-wrapper"
                                        style={styles.circleWrapper(isSelected, image)}
                                    >
                                        <div style={styles.circleOverlay(isSelected)}></div>
                                    </div>
                                    <span style={styles.categoryName(isSelected)}>
                                        {category.name}
                                    </span>
                                    {isSelected && <div style={styles.selectedIndicator}></div>}
                                </button>
                            );
                        })}
                    </div>

                    <button 
                        style={{ ...styles.scrollBtn, ...styles.scrollBtnRight }}
                        onClick={() => scroll('right')}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#f97316';
                            e.currentTarget.style.color = 'white';
                            e.currentTarget.style.borderColor = '#f97316';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'white';
                            e.currentTarget.style.color = '#475569';
                            e.currentTarget.style.borderColor = '#e2e8f0';
                        }}
                    >
                        ›
                    </button>
                </div>

                <style>
                    {`
                        .categories-scroll::-webkit-scrollbar {
                            display: none;
                        }
                        .categories-scroll {
                            scrollbar-width: none;
                            -ms-overflow-style: none;
                        }
                    `}
                </style>
            </div>
        </section>
    );
}

export default Categories;