    import { Routes, Route, Navigate } from "react-router-dom";

    // Authentication
    import Login from "../pages/auth/Login";
    import Register from "../pages/auth/Register";

    // Customer Pages
    import Home from "../pages/customer/Home";
    import RestaurantDetails from "../pages/customer/RestaurantDetails";
    import Cart from "../pages/customer/Cart";
    import Checkout from "../pages/customer/Checkout";
    import Orders from "../pages/customer/Orders";
    import Profile from "../pages/customer/Profile";
    import OrderDetails from "../pages/customer/OrderDetails";

    // Layout
    import MainLayout from "../layouts/MainLayout";

    function AppRoutes() {
        return (
            <Routes> 

                {/* Authentication */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route  
                    path="/register"
                    element={<Register />}
                />

                {/* Customer */}

                <Route
                    path="/"
                    element={
                        <MainLayout>
                            <Home />
                        </MainLayout>
                    }
                />

                <Route
                    path="/restaurant/:id"
                    element={
                        <MainLayout>
                            <RestaurantDetails />
                        </MainLayout>
                    }
                />

                <Route
                    path="/cart"
                    element={
                        <MainLayout>
                            <Cart />
                        </MainLayout>
                    }
                />

                <Route
                    path="/checkout"
                    element={
                        <MainLayout>
                            <Checkout />
                        </MainLayout>
                    }
                />

                <Route
                    path="/orders"
                    element={
                        <MainLayout>
                            <Orders />
                        </MainLayout>
                    }
                />

                <Route
    path="/orders/:orderId"
    element={
        <MainLayout>
            <OrderDetails />
        </MainLayout>
    }
/>

                <Route
                    path="/profile"
                    element={
                        <MainLayout>
                            <Profile />
                        </MainLayout>
                    }
                />

                {/* Owner */}

                <Route
                    path="/owner/dashboard"
                    element={<h1>Owner Dashboard</h1>}
                />

                {/* Delivery */}

                <Route
                    path="/delivery/dashboard"
                    element={<h1>Delivery Dashboard</h1>}
                />

                {/* Invalid Routes */}

                <Route
                    path="*"
                    element={<Navigate to="/" />}
                />

                <Route
    path="/test"
    element={<h1>TEST ROUTE WORKING</h1>}
/>
            </Routes>
        );
    }

    export default AppRoutes;