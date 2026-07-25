import { Link, useNavigate } from "react-router-dom";
import {
    Search,
    ShoppingCart,
    ClipboardList,
    User,
    Menu,
    X,
    LogOut
} from "lucide-react";

import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import cartService from "../../services/cartService";

function Navbar() {

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const [mobileMenu, setMobileMenu] = useState(false);

    const [search, setSearch] = useState("");

    const [cartCount, setCartCount] = useState(0);

    const [isMobile, setIsMobile] = useState(
        window.innerWidth < 768
    );

    useEffect(() => {

        const handleResize = () => {

            const mobile = window.innerWidth < 768;

            setIsMobile(mobile);

            if (!mobile) {

                setMobileMenu(false);

            }

        };
        

        window.addEventListener("resize", handleResize);

        return () =>
            window.removeEventListener(
                "resize",
                handleResize
            );

    }, []);

    useEffect(() => {

    const handleCartUpdate = () => {

        if (user) {
            loadCartCount();
        }

    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
        window.removeEventListener("cartUpdated", handleCartUpdate);
    };

}, [user]);

    useEffect(() => {

        if (user) {

            loadCartCount();

        } else {

            setCartCount(0);

        }

    }, [user]);

    const loadCartCount = async () => {

        try {

            const cart = await cartService.getCart(user.userId);

            if (cart && cart.items) {

                const total = cart.items.reduce(

                    (sum, item) => sum + item.quantity,

                    0

                );

                setCartCount(total);

            } else {

                setCartCount(0);

            }

        } catch (error) {

            console.error(error);

            setCartCount(0);

        }

    };

    const handleLogout = () => {

        logout();

        setMobileMenu(false);

        navigate("/login");

    };

    return (

        <header
            style={{
                width: "100%",
                position: "sticky",
                top: 0,
                zIndex: 999,
                background: "#ffffff",
                boxShadow: "0 2px 10px rgba(0,0,0,.08)"
            }}
        >

            <div
                style={{
                    maxWidth: "1400px",
                    margin: "0 auto",
                    padding: "0 20px",
                    height: "80px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
             {/* Logo */}

<Link
    to="/"
    style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        textDecoration: "none"
    }}
>
    <div
        style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "linear-gradient(135deg,#ff7a18,#ff3d00)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "24px"
        }}
    >
        🍕
    </div>

    <div>

        <h2
            style={{
                margin: 0,
                color: "#222",
                fontSize: "26px"
            }}
        >
            UGGISO
        </h2>

        <small
            style={{
                color: "#777"
            }}
        >
            Food Delivery
        </small>

    </div>

</Link>

{/* Search */}

{

    !isMobile && (

        <div
            style={{
                flex: 1,
                margin: "0 40px",
                maxWidth: "500px",
                display: "flex",
                alignItems: "center",
                background: "#f5f5f5",
                borderRadius: "40px",
                padding: "12px 20px"
            }}
        >



            

        </div>

    )

}

{/* Right Menu */}

<div

    style={{

        display: "flex",

        alignItems: "center",

        gap: "28px"

    }}

>

{

!isMobile && (

<>

<Link

    to="/orders"

    style={{

        display: "flex",

        alignItems: "center",

        gap: "8px",

        color: "#333",

        textDecoration: "none"

    }}

>

    <ClipboardList size={20}/>

    Orders

</Link>

<Link

    to="/cart"

    style={{

        position: "relative",

        color: "#333"

    }}

>

    <ShoppingCart size={24}/>

    <span

        style={{

            position: "absolute",

            top: "-8px",

            right: "-10px",

            width: "20px",

            height: "20px",

            borderRadius: "50%",

            background: "#ff6b00",

            color: "#fff",

            display: "flex",

            justifyContent: "center",

            alignItems: "center",

            fontSize: "12px"

        }}

    >

        {cartCount}

    </span>

</Link>
   {/* Profile */}

<Link
    to="/profile"
    style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        textDecoration: "none",
        color: "#333"
    }}
>

    <User size={20} />

    <span>

        {user?.username || "Profile"}

    </span>

</Link>

{/* Login / Logout */}

{

    user ? (

        <button

            onClick={handleLogout}

            style={{

                display: "flex",

                alignItems: "center",

                gap: "8px",

                border: "none",

                background: "transparent",

                cursor: "pointer",

                color: "#e53935",

                fontSize: "15px"

            }}

        >

            <LogOut size={20} />

            Logout

        </button>

    ) : (

        <button

            onClick={() => navigate("/login")}

            style={{

                background: "#ff6b00",

                color: "#fff",

                border: "none",

                borderRadius: "30px",

                padding: "10px 22px",

                cursor: "pointer",

                fontWeight: "600"

            }}

        >

            Login

        </button>

    )

}

</>

)

}

{/* Mobile Hamburger */}

{

    isMobile && (

        <button

            onClick={() => setMobileMenu(!mobileMenu)}

            style={{

                border: "none",

                background: "transparent",

                cursor: "pointer"

            }}

        >

            {

                mobileMenu

                    ? <X size={30} />

                    : <Menu size={30} />

            }

        </button>

    )

}

</div>

</div>

{/* Mobile Menu */}

{

    isMobile && mobileMenu && (

        <div

            style={{

                background: "#ffffff",

                borderTop: "1px solid #eee",

                padding: "20px"

            }}

        >

            <div

                style={{

                    display: "flex",

                    flexDirection: "column",

                    gap: "18px"

                }}

            >

                <Link
                    to="/"
                    onClick={() => setMobileMenu(false)}
                    style={{
                        textDecoration: "none",
                        color: "#333"
                    }}
                >
                    Home
                </Link>

                <Link
                    to="/orders"
                    onClick={() => setMobileMenu(false)}
                    style={{
                        textDecoration: "none",
                        color: "#333"
                    }}
                >
                    Orders
                </Link>

                <Link
                    to="/cart"
                    onClick={() => setMobileMenu(false)}
                    style={{
                        textDecoration: "none",
                        color: "#333"
                    }}
                >
                    Cart ({cartCount})
                </Link>

                <Link
                    to="/profile"
                    onClick={() => setMobileMenu(false)}
                    style={{
                        textDecoration: "none",
                        color: "#333"
                    }}
                >
                    Profile
                </Link>

                {

                    user ? (

                        <button

                            onClick={handleLogout}

                            style={{

                                background: "#e53935",

                                color: "#fff",

                                border: "none",

                                borderRadius: "8px",

                                padding: "12px",

                                cursor: "pointer"

                            }}

                        >

                            Logout

                        </button>

                    ) : (

                        <button

                            onClick={() => navigate("/login")}

                            style={{

                                background: "#ff6b00",

                                color: "#fff",

                                border: "none",

                                borderRadius: "8px",

                                padding: "12px",

                                cursor: "pointer"

                            }}

                        >

                            Login

                        </button>

                    )

                }

            </div>

        </div>

    )

}

</header>

    );

}

export default Navbar;