import axios from "../utils/axiosConfig";

const placeOrder = async (orderData) => {
    const response = await axios.post("/api/orders", orderData);
    return response.data;
};

const getOrdersByUser = async (userId) => {
    const response = await axios.get(`/api/orders/user/${userId}`);
    return response.data;
};

const getOrderById = async (orderId) => {
    const response = await axios.get(`/api/orders/${orderId}`);
    return response.data;
};

const cancelOrder = async (orderId) => {
    const response = await axios.delete(`/api/orders/${orderId}`);
    return response.data;
};

export default {
    placeOrder,
    getOrdersByUser,
    getOrderById,
    cancelOrder
};