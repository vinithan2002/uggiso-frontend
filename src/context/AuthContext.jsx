import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import axiosConfig from "../utils/axiosConfig";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(false);

    // Load user on page refresh
    useEffect(() => {

        const storedUser = localStorage.getItem("user");

        if (storedUser) {

            setUser(JSON.parse(storedUser));

        }

    }, []);

    // ================= LOGIN =================

    const login = async (loginData) => {

        try {

            setLoading(true);

            const response = await axiosConfig.post(
                "/login",
                loginData
            );

            const userData = response.data;

            localStorage.setItem(
                "user",
                JSON.stringify(userData)
            );

            setUser(userData);

            toast.success("Login Successful");

            return {

                success: true,

                role: userData.role,

                user: userData

            };

        } catch (error) {

            const message =
                error.response?.data ||
                "Invalid Email or Password";

            toast.error(message);

            return {

                success: false,

                message

            };

        } finally {

            setLoading(false);

        }

    };

    // ================= REGISTER =================

    const register = async (registerData) => {

        try {

            setLoading(true);

            const response = await axiosConfig.post(
                "/register",
                registerData
            );

            toast.success(response.data);

            navigate("/login");

            return {

                success: true

            };

        } catch (error) {

            const message =
                error.response?.data ||
                "Registration Failed";

            toast.error(message);

            return {

                success: false,

                message

            };

        } finally {

            setLoading(false);

        }

    };

    // ================= LOGOUT =================

    const logout = () => {

        localStorage.removeItem("user");

        setUser(null);

        toast.success("Logged Out");

        navigate("/login");

    };

    return (

        <AuthContext.Provider

            value={{

                user,

                loading,

                login,

                register,

                logout,

                isAuthenticated: !!user

            }}

        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}