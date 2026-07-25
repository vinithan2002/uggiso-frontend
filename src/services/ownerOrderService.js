import axios from "../utils/axiosConfig";

const getRestaurantOrders = async (restaurantId) => {
    const response = await axios.get(`/api/orders/restaurant/${restaurantId}`);
    return response.data;
};

const updateOrderStatus = async (orderId, status) => {
    const response = await axios.put(
        `/api/orders/${orderId}/status`,
        {
            status
        }
    );

    return response.data;
};

export default {
    getRestaurantOrders,
    updateOrderStatus
};