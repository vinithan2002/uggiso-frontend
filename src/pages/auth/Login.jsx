import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  UtensilsCrossed,
  ArrowRight,
  User,
  Store,
  Bike,
} from "lucide-react";

import "../../styles/auth/Login.css";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login, loading } = useAuth();

  const [selectedRole, setSelectedRole] = useState("ROLE_USER");

  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(loginData);

    if (result.success) {
      switch (result.role) {
        case "ROLE_USER":
          navigate("/");
          break;

        case "ROLE_RESTAURANT_OWNER":
          navigate("/owner/dashboard");
          break;

        case "ROLE_DELIVERY_AGENT":
          navigate("/delivery/dashboard");
          break;

        default:
          navigate("/");
      }
    }
  };

  const getTitle = () => {
    switch (selectedRole) {
      case "ROLE_RESTAURANT_OWNER":
        return "Restaurant Owner Login";

      case "ROLE_DELIVERY_AGENT":
        return "Delivery Partner Login";

      default:
        return "Customer Login";
    }
  };

  const getSubtitle = () => {
    switch (selectedRole) {
      case "ROLE_RESTAURANT_OWNER":
        return "Manage your restaurant and orders.";

      case "ROLE_DELIVERY_AGENT":
        return "Deliver orders and earn money.";

      default:
        return "Order your favourite food anytime.";
    }
  };

  const getButtonText = () => {
    switch (selectedRole) {
      case "ROLE_RESTAURANT_OWNER":
        return "Login as Restaurant";

      case "ROLE_DELIVERY_AGENT":
        return "Login as Delivery";

      default:
        return "Login as Customer";
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        {/* LEFT PANEL */}

        <div className="left-panel">

          <div className="logo">

            <UtensilsCrossed size={32} />

            <h1>UGGISO</h1>

          </div>

          <div className="hero-content">

            <h2>
              Fresh Food,
              <br />
              Delivered Fast.
            </h2>

            <p>
              Discover amazing restaurants, order delicious meals,
              and enjoy lightning-fast delivery.
            </p>

            <ul>

              <li>✔ 10,000+ Happy Customers</li>

              <li>✔ 500+ Restaurant Partners</li>

              <li>✔ Fast Delivery</li>

              <li>✔ Secure Payments</li>

            </ul>

            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900"
              alt="Food"
            />

          </div>

        </div>

        {/* RIGHT PANEL */}

        <div className="right-panel">

          <div className="login-box">

            <h2>{getTitle()}</h2>

            <p>{getSubtitle()}</p>

            {/* ROLE TABS */}

            <div className="role-tabs">

              <button
                type="button"
                className={
                  selectedRole === "ROLE_USER"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setSelectedRole("ROLE_USER")
                }
              >
                <User size={18} />
                Customer
              </button>

              <button
                type="button"
                className={
                  selectedRole ===
                  "ROLE_RESTAURANT_OWNER"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setSelectedRole(
                    "ROLE_RESTAURANT_OWNER"
                  )
                }
              >
                <Store size={18} />
                Restaurant
              </button>

              {/*<button
                type="button"
                className={
                  selectedRole ===
                  "ROLE_DELIVERY_AGENT"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setSelectedRole(
                    "ROLE_DELIVERY_AGENT"
                  )
                }
              >
                <Bike size={18} />
                Delivery
              </button> */}

            </div>

            <form onSubmit={handleSubmit}>
                              {/* Username */}

              <div className="input-group">

                <label>Email Address</label>

                <div className="input-box">

                  <Mail size={18} className="input-icon" />

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={loginData.email}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              {/* Password */}

              <div className="input-group">

                <label>Password</label>

                <div className="input-box">

                  <Lock size={18} className="input-icon" />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="button"
                    className="eye-btn"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

              </div>

              {/* Remember */}

              <div className="login-options">

                <label className="remember">

                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(e.target.checked)
                    }
                  />

                  Remember Me

                </label>

                <Link
                  to="/forgot-password"
                  className="forgot"
                >
                  Forgot Password?
                </Link>

              </div>

              {/* Login Button */}

              <button
                type="submit"
                className="login-btn"
                disabled={loading}
              >
                {loading ? (
                  "Logging In..."
                ) : (
                  <>
                    {getButtonText()}
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              {/* Register */}

              <div className="register-link">

                <span>Don't have an account?</span>

                <Link to="/register">

                  Register Now

                </Link>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Login;