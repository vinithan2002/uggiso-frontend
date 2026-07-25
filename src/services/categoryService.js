import axiosConfig from "../utils/axiosConfig";

const getRestaurantCategories = async (restaurantId) => {

    const response = await axiosConfig.get(
        `/api/categories/restaurant/${restaurantId}`
    );

    return response.data;
};

export default {
    getRestaurantCategories
};