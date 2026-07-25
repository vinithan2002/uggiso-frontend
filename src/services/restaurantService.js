import axiosConfig from "../utils/axiosConfig";

const getAllRestaurants = async () => {

    const response = await axiosConfig.get("/api/restaurants");

    return response.data;

};

const getRestaurantById = async (id) => {

    const response = await axiosConfig.get(`/api/restaurants/${id}`);

    return response.data;

};

const getMyRestaurant = async () => {

    const response = await axiosConfig.get(
        "/api/restaurants/my"
    );

    return response.data;

};

const searchRestaurants = async (keyword) => {

    const response = await axiosConfig.get(

        `/api/restaurants/search?keyword=${keyword}`

    );

    return response.data;

};

const getRestaurantsByCuisine = async (cuisine) => {

    const response = await axiosConfig.get(
        `/api/restaurants/cuisine/${cuisine}`
    );

    return response.data;

};
const updateRestaurant = async (id, data) => {

    const response = await axiosConfig.put(
        `/api/restaurants/${id}`,
        data
    );

    return response.data;

};

export default {

    getAllRestaurants,

    getRestaurantById,

    getMyRestaurant,

    updateRestaurant,

    searchRestaurants,

    getRestaurantsByCuisine

};