import { useState, useEffect } from "react";
import RestaurantCard from "../restaurant/RestaurantCard";

function RestaurantGrid({

    restaurants = [],

    search = "",

    loading = false

}) {

    const [columns, setColumns] = useState(1);

    useEffect(() => {

        const handleResize = () => {

            const width = window.innerWidth;

            if (width >= 1280) {

                setColumns(4);

            } else if (width >= 1024) {

                setColumns(3);

            } else if (width >= 640) {

                setColumns(2);

            } else {

                setColumns(1);

            }

        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);

    }, []);

    // Search Filter
    const filteredRestaurants = restaurants.filter((restaurant) => {

        const keyword = search.toLowerCase();

        return (

            restaurant.name?.toLowerCase().includes(keyword) ||

            restaurant.cuisine?.toLowerCase().includes(keyword) ||

            restaurant.city?.toLowerCase().includes(keyword) ||

            restaurant.description?.toLowerCase().includes(keyword)

        );

    });

    const styles = {

        section: {

            width: "100%",

            backgroundColor: "#f9fafb",

            padding: "48px 16px"

        },

        container: {

            maxWidth: "1200px",

            margin: "0 auto",

            padding: "0 16px"

        },

        headingContainer: {

            textAlign: "center",

            marginBottom: "32px"

        },

        title: {

            fontSize: "32px",

            fontWeight: "bold",

            color: "#111827",

            margin: 0

        },

        subtitle: {

            color: "#6b7280",

            marginTop: "4px",

            fontSize: "14px"

        },

        grid: {

            display: "grid",

            gridTemplateColumns: `repeat(${columns}, 1fr)`,

            gap: "20px",

            width: "100%"

        }

    };

    if (loading) {

        return (

            <section style={styles.section}>

                <div style={styles.container}>

                    <h2
                        style={{
                            textAlign: "center",
                            padding: "100px 0",
                            color: "#6b7280"
                        }}
                    >

                        Loading Restaurants...

                    </h2>

                </div>

            </section>

        );

    }

    return (

        <section style={styles.section}>

            <div style={styles.container}>

                {/* Heading */}

                <div style={styles.headingContainer}>

                    <h2 style={styles.title}>

                        🍴 Popular Restaurants

                    </h2>

                    <p style={styles.subtitle}>

                        Discover the best restaurants near you

                    </p>

                </div>

                {/* Restaurant Grid */}

                <div style={styles.grid}>

                    {

                        filteredRestaurants.length > 0 ? (

                            filteredRestaurants.map((restaurant) => (

                                <RestaurantCard

                                    key={restaurant.id}

                                    restaurant={restaurant}

                                />

                            ))

                        ) : (

                            <div

                                style={{

                                    gridColumn: "1 / -1",

                                    textAlign: "center",

                                    padding: "60px 0",

                                    color: "#6b7280",

                                    fontSize: "20px",

                                    fontWeight: "600"

                                }}

                            >

                                No Restaurants Found

                            </div>

                        )

                    }

                </div>

            </div>

        </section>

    );

}

export default RestaurantGrid;