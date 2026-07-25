import axios from "../utils/axiosConfig";

const getDashboard = async (restaurantId) => {

    const response = await axios.get(
        `/api/orders/restaurant/${restaurantId}/dashboard`
    );

    return response.data;
};

export default {
    getDashboard
};