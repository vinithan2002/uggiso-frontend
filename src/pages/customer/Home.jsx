import { useEffect, useState } from "react";

import HeroSection from "../../components/home/HeroSection";
import CouponSection from "../../components/home/CouponSection";
import Categories from "../../components/home/Categories";
import RestaurantGrid from "../../components/home/RestaurantGrid";

import restaurantService from "../../services/restaurantService";

function Home() {

        useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, []);

    const [search, setSearch] = useState("");

    const [selectedCategory, setSelectedCategory] = useState("All");

    const [restaurants, setRestaurants] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (selectedCategory === "All") {

            loadRestaurants();

        } else {

            loadRestaurantsByCuisine(selectedCategory);

        }

    }, [selectedCategory]);

    // Load all restaurants
    const loadRestaurants = async () => {

        try {

            setLoading(true);

            const response =
                await restaurantService.getAllRestaurants();

            setRestaurants(response);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    //  ADD THIS METHOD
    const loadRestaurantsByCuisine = async (cuisine) => {

        try {

            setLoading(true);

            const response =
                await restaurantService.getRestaurantsByCuisine(cuisine);

            setRestaurants(response);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="bg-slate-50 min-h-screen">

            <HeroSection
                search={search}
                setSearch={setSearch}
            />

            <CouponSection />

            <Categories
                restaurants={restaurants}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            <RestaurantGrid
                restaurants={restaurants}
                search={search}
                selectedCategory={selectedCategory}
                loading={loading}
            />

        </div>

    );

}

export default Home;