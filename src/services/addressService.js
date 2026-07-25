import axiosConfig from "../utils/axiosConfig";

// ================= Create Address =================

const createAddress = async (data) => {

    const response = await axiosConfig.post(
        "/api/addresses",
        data
    );

    return response.data;

};

// ================= Get Address By Id =================

const getAddressById = async (id) => {

    const response = await axiosConfig.get(
        `/api/addresses/${id}`
    );

    return response.data;

};

// ================= Get Addresses By User =================

const getAddressesByUser = async (userId) => {

    const response = await axiosConfig.get(
        `/api/addresses/user/${userId}`
    );

    return response.data;

};

// ================= Update Address =================

const updateAddress = async (id, data) => {

    const response = await axiosConfig.put(
        `/api/addresses/${id}`,
        data
    );

    return response.data;

};

// ================= Delete Address =================

const deleteAddress = async (id) => {

    const response = await axiosConfig.delete(
        `/api/addresses/${id}`
    );

    return response.data;

};

export default {

    createAddress,

    getAddressById,

    getAddressesByUser,

    updateAddress,

    deleteAddress

};