import axiosConfig from "../utils/axiosConfig";

// Customer Menu
const getCustomerRestaurantMenu = async (restaurantId) => {

    const response = await axiosConfig.get(
        `/api/menu-items/restaurant/${restaurantId}`
    );

    return response.data;
};

// Owner Menu
const getOwnerRestaurantMenu = async (restaurantId) => {

    const response = await axiosConfig.get(
        `/api/menu-items/owner/${restaurantId}`
    );

    return response.data;
};

const getMenuItem = async (id) => {

    const response = await axiosConfig.get(
        `/api/menu-items/${id}`
    );

    return response.data;
};

const createMenuItem = async (data) => {

    const response = await axiosConfig.post(
        "/api/menu-items",
        data
    );

    return response.data;
};

const updateMenuItem = async (id, data) => {

    const response = await axiosConfig.put(
        `/api/menu-items/${id}`,
        data
    );

    return response.data;
};

const deleteMenuItem = async (id) => {

    const response = await axiosConfig.delete(
        `/api/menu-items/${id}`
    );

    return response.data;
};

export default {
    getCustomerRestaurantMenu,
    getOwnerRestaurantMenu,
    getMenuItem,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem
};