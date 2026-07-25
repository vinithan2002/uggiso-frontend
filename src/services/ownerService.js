import axios from "../utils/axiosConfig";

const registerOwner = async (ownerData) => {

    const response = await axios.post(

        "/api/users/restaurant-owner/register",

        ownerData

    );

    return response.data;

};

export default {

    registerOwner

};