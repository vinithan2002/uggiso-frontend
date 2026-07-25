import axiosConfig from "../utils/axiosConfig";

// ================= Get Cart =================

const getCart = async (userId) => {

    const response = await axiosConfig.get(
        `/api/cart/${userId}`
    );

    return response.data;

};

// ================= Add To Cart =================

const addToCart = async (data) => {

    const response = await axiosConfig.post(
        "/api/cart/add",
        data
    );

    return response.data;

};

// ================= Update Quantity =================

const updateCartItem = async (cartItemId, data) => {

    const response = await axiosConfig.put(
        `/api/cart/item/${cartItemId}`,
        data
    );

    return response.data;

};

// ================= Remove Item =================

const removeItem = async (cartItemId) => {

    const response = await axiosConfig.delete(
        `/api/cart/item/${cartItemId}`
    );

    return response.data;

};

// ================= Clear Cart =================

const clearCart = async (userId) => {

    const response = await axiosConfig.delete(
        `/api/cart/clear/${userId}`
    );

    return response.data;

};

export default {

    getCart,

    addToCart,

    updateCartItem,

    removeItem,

    clearCart

};