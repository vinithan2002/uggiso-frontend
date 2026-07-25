import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Customer Pages
import Home from "./pages/customer/Home";
import RestaurantDetails from "./pages/customer/RestaurantDetails";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import Orders from "./pages/customer/Orders";
import OrderDetails from "./pages/customer/OrderDetails";
import Profile from "./pages/customer/Profile";
import AddressForm from "./pages/customer/AddressForm";

//Owner Pages
import OwnerLayout from "./layouts/OwnerLayout";
import OwnerOrders from "./pages/owner/Orders";
import Dashboard from "./pages/owner/Dashboard";
import RestaurantProfile from "./pages/owner/RestaurantProfile";
import Menu from "./pages/owner/Menu";

function App() {

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

            {/* Customer Layout */}

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
            <Route
    path="/owner/orders"
    element={
        <OwnerLayout>
            <OwnerOrders />
        </OwnerLayout>
    }
/>

            <Route

                path="/address/new"

                element={

                    <MainLayout>

                        <AddressForm />

                    </MainLayout>

                }

            />
                        <Route
    path="/owner/dashboard"
    element={
        <OwnerLayout>
            <Dashboard />
        </OwnerLayout>
    }
/>

<Route
    path="/owner/menu"
    element={
        <OwnerLayout>
            <Menu />
        </OwnerLayout>
    }
/>

<Route
    path="/owner/restaurant-profile"
    element={
        <OwnerLayout>
            <RestaurantProfile />
        </OwnerLayout>
    }
/>

            {/* 404 */}

            <Route

                path="*"

                element={

                    <h1 className="text-center text-4xl font-bold mt-20">

                        404 | Page Not Found

                    </h1>

                }

            />

        </Routes>

    );

}

export default App;