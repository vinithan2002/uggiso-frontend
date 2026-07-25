import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    UtensilsCrossed,
    ArrowRight,
    CheckCircle
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

function OwnerLogin() {
    useEffect(() => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }, []);
    const navigate = useNavigate();
    const { login, loading } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [loginData, setLoginData] = useState({
        userName: "",
        password: ""
    });
    const [rememberMe, setRememberMe] = useState(false);

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
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

    const styles = {
        container: {
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            background: 'linear-gradient(135deg, #fef3c7 0%, #fff7ed 30%, #ffffff 70%, #fef2f2 100%)',
            position: 'relative',
            overflow: 'hidden'
        },
        bgDecoration1: {
            position: 'absolute',
            top: '-200px',
            right: '-200px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)',
            pointerEvents: 'none'
        },
        bgDecoration2: {
            position: 'absolute',
            bottom: '-200px',
            left: '-200px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 70%)',
            pointerEvents: 'none'
        },
        card: {
            width: '100%',
            maxWidth: '1120px',
            display: 'grid',
            gridTemplateColumns: '1fr',
            backgroundColor: '#ffffff',
            borderRadius: '32px',
            overflow: 'hidden',
            boxShadow: '0 25px 80px rgba(0,0,0,0.08)',
            position: 'relative',
            zIndex: 1
        },
        leftPanel: {
            background: 'linear-gradient(160deg, #f97316 0%, #ea580c 40%, #ef4444 100%)',
            padding: '32px 24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden'
        },
        leftPanelGlow: {
            position: 'absolute',
            top: '-150px',
            right: '-150px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            pointerEvents: 'none'
        },
        leftPanelGlow2: {
            position: 'absolute',
            bottom: '-100px',
            left: '-100px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            pointerEvents: 'none'
        },
        logoWrapper: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            position: 'relative',
            zIndex: 1
        },
        logoIcon: {
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        logoText: {
            fontSize: '24px',
            fontWeight: '900',
            color: '#ffffff',
            letterSpacing: '-0.5px',
            margin: 0
        },
        leftContent: {
            position: 'relative',
            zIndex: 1,
            marginTop: '24px'
        },
        leftTitle: {
            fontSize: '28px',
            fontWeight: '800',
            color: '#ffffff',
            lineHeight: '1.2',
            margin: 0
        },
        leftSubtitle: {
            color: 'rgba(255,255,255,0.85)',
            fontSize: '14px',
            lineHeight: '1.7',
            marginTop: '12px',
            maxWidth: '340px'
        },
        features: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginTop: '20px'
        },
        featureItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: 'rgba(255,255,255,0.9)',
            fontSize: '13px'
        },
        featureIcon: {
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
        },
        leftImage: {
            width: '100%',
            height: '140px',
            borderRadius: '16px',
            objectFit: 'cover',
            marginTop: '20px',
            position: 'relative',
            zIndex: 1,
            display: 'none'
        },
        rightPanel: {
            padding: '32px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#ffffff'
        },
        formWrapper: {
            width: '100%',
            maxWidth: '380px'
        },
        formHeader: {
            textAlign: 'center',
            marginBottom: '24px'
        },
        formTitle: {
            fontSize: '24px',
            fontWeight: '800',
            color: '#0f172a',
            margin: 0
        },
        formSubtitle: {
            color: '#94a3b8',
            fontSize: '13px',
            marginTop: '4px'
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
        },
        inputGroup: {
            position: 'relative'
        },
        inputLabel: {
            fontSize: '12px',
            fontWeight: '600',
            color: '#0f172a',
            marginBottom: '4px',
            display: 'block'
        },
        inputWrapper: {
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            padding: '0 14px',
            border: '2px solid #f1f5f9',
            transition: 'all 0.3s ease',
            height: '46px'
        },
        inputIcon: {
            color: '#94a3b8',
            flexShrink: 0
        },
        input: {
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            padding: '0 10px',
            fontSize: '13px',
            color: '#0f172a',
            height: '100%'
        },
        passwordToggle: {
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center'
        },
        optionsRow: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '2px'
        },
        checkboxWrapper: {
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            fontSize: '12px',
            color: '#475569'
        },
        checkbox: {
            width: '16px',
            height: '16px',
            accentColor: '#f97316',
            cursor: 'pointer'
        },
        forgotLink: {
            fontSize: '12px',
            color: '#f97316',
            fontWeight: '600',
            textDecoration: 'none',
            cursor: 'pointer'
        },
        loginBtn: {
            width: '100%',
            height: '46px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #f97316, #ef4444)',
            color: 'white',
            border: 'none',
            fontSize: '15px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            marginTop: '4px',
            boxShadow: '0 8px 24px rgba(249,115,22,0.3)'
        },
        registerRow: {
            textAlign: 'center',
            fontSize: '13px',
            color: '#64748b',
            marginTop: '12px'
        },
        registerLink: {
            color: '#f97316',
            fontWeight: '700',
            textDecoration: 'none',
            marginLeft: '4px'
        },
        divider: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            margin: '4px 0'
        },
        dividerLine: {
            flex: 1,
            height: '1px',
            backgroundColor: '#f1f5f9'
        },
        dividerText: {
            fontSize: '11px',
            color: '#94a3b8',
            whiteSpace: 'nowrap'
        },
        socialBtns: {
            display: 'flex',
            gap: '10px'
        },
        socialBtn: {
            flex: 1,
            height: '40px',
            borderRadius: '10px',
            border: '2px solid #f1f5f9',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontSize: '12px',
            fontWeight: '500',
            color: '#475569',
            gap: '6px'
        }
    };

    // Responsive styles
    const cardStyle = {
        ...styles.card,
        '@media (min-width: 768px)': {
            gridTemplateColumns: 'repeat(2, 1fr)'
        }
    };

    const leftPanelStyle = {
        ...styles.leftPanel,
        '@media (min-width: 768px)': {
            padding: '40px 32px'
        }
    };

    const leftImageStyle = {
        ...styles.leftImage,
        '@media (min-width: 768px)': {
            display: 'block'
        }
    };

    const rightPanelStyle = {
        ...styles.rightPanel,
        '@media (min-width: 768px)': {
            padding: '40px 32px'
        }
    };

    const formWrapperStyle = {
        ...styles.formWrapper,
        '@media (min-width: 768px)': {
            maxWidth: '400px'
        }
    };

    const leftTitleStyle = {
        ...styles.leftTitle,
        '@media (min-width: 768px)': {
            fontSize: '36px'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.bgDecoration1}></div>
            <div style={styles.bgDecoration2}></div>

            <div style={cardStyle} className="login-card">
                {/* Left Panel */}
                <div style={leftPanelStyle} className="login-left">
                    <div style={styles.leftPanelGlow}></div>
                    <div style={styles.leftPanelGlow2}></div>

                    <div style={styles.logoWrapper}>
                        <div style={styles.logoIcon}>
                            <UtensilsCrossed size={24} color="white" />
                        </div>
                        <h1 style={styles.logoText}>UGGISO</h1>
                    </div>

                    <div style={styles.leftContent}>
                        <h2 style={leftTitleStyle}>
                            Manage Your<br />
                            Restaurant Business
                        </h2>
                        <p style={styles.leftSubtitle}>
                            Discover amazing restaurants, order your favourite meals,
                            and enjoy lightning-fast delivery.
                        </p>

                        <div style={styles.features}>
                            <div style={styles.featureItem}>
                                <span style={styles.featureIcon}>
                                    <CheckCircle size={10} color="white" />
                                </span>
                                Manage Restaurant
                            </div>
                            <div style={styles.featureItem}>
                                <span style={styles.featureIcon}>
                                    <CheckCircle size={10} color="white" />
                                </span>
                                Update Menu Anytime
                            </div>
                            <div style={styles.featureItem}>
                                <span style={styles.featureIcon}>
                                    <CheckCircle size={10} color="white" />
                                </span>
                                Track Customer Orders
                            </div>
                        </div>

                        <img
                            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=400&fit=crop"
                            alt="Food"
                            style={leftImageStyle}
                            className="login-image"
                        />
                    </div>
                </div>

                {/* Right Panel */}
                <div style={rightPanelStyle} className="login-right">
                    <div style={formWrapperStyle}>
                        <div style={styles.formHeader}>
                            <h2 style={styles.formTitle}>Restaurant Owner Login 🍽️</h2>
                            <p style={styles.formSubtitle}>Login to manage your restaurant, menu, and orders.</p>
                        </div>

                        <form onSubmit={handleSubmit} style={styles.form}>
                            <div style={styles.inputGroup}>
                                <label style={styles.inputLabel}>Username</label>
                                <div style={styles.inputWrapper}>
                                    <Mail size={17} style={styles.inputIcon} />
                                    <input
                                        type="text"
                                        name="userName"
                                        value={loginData.userName}
                                        onChange={handleChange}
                                        placeholder="Enter your username"
                                        style={styles.input}
                                        required
                                        onFocus={(e) => {
                                            e.currentTarget.parentElement.style.borderColor = '#f97316';
                                            e.currentTarget.parentElement.style.backgroundColor = '#fff7ed';
                                        }}
                                        onBlur={(e) => {
                                            e.currentTarget.parentElement.style.borderColor = '#f1f5f9';
                                            e.currentTarget.parentElement.style.backgroundColor = '#f8fafc';
                                        }}
                                    />
                                </div>
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.inputLabel}>Password</label>
                                <div style={styles.inputWrapper}>
                                    <Lock size={17} style={styles.inputIcon} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={loginData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        style={styles.input}
                                        required
                                        onFocus={(e) => {
                                            e.currentTarget.parentElement.style.borderColor = '#f97316';
                                            e.currentTarget.parentElement.style.backgroundColor = '#fff7ed';
                                        }}
                                        onBlur={(e) => {
                                            e.currentTarget.parentElement.style.borderColor = '#f1f5f9';
                                            e.currentTarget.parentElement.style.backgroundColor = '#f8fafc';
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={styles.passwordToggle}
                                    >
                                        {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                                    </button>
                                </div>
                            </div>

                            <div style={styles.optionsRow}>
                                <label style={styles.checkboxWrapper}>
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        style={styles.checkbox}
                                    />
                                    Remember Me
                                </label>
                                <Link to="/forgot-password" style={styles.forgotLink}>
                                    Forgot Password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                style={styles.loginBtn}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.02)';
                                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(249,115,22,0.4)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(249,115,22,0.3)';
                                }}
                            >
                                {loading ? (
                                    <>
                                        <span style={{
                                            display: 'inline-block',
                                            width: '18px',
                                            height: '18px',
                                            border: '2px solid rgba(255,255,255,0.3)',
                                            borderTop: '2px solid white',
                                            borderRadius: '50%',
                                            animation: 'spin 0.8s linear infinite'
                                        }}></span>
                                        Logging in...
                                    </>
                                ) : (
                                    <>
                                        Login
                                        <ArrowRight size={17} />
                                    </>
                                )}
                            </button>

                            <div style={styles.registerRow}>
                                New to UGGISO?
                                <Link to="/register" style={styles.registerLink}>
                                    Create Account →
                                </Link>
                            </div>

                            <div style={styles.divider}>
                                <div style={styles.dividerLine}></div>
                                <span style={styles.dividerText}>or continue with</span>
                                <div style={styles.dividerLine}></div>
                            </div>

                            <div style={styles.socialBtns}>
                                <button style={styles.socialBtn}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877f2">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                    Google
                                </button>
                                <button style={styles.socialBtn}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#000">
                                        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.26.82-.58 0-.286-.01-1.04-.016-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.205.085 1.838 1.237 1.838 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.3-.535-1.52.117-3.16 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.653 1.64.24 2.86.118 3.16.768.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.62-5.476 5.92.43.37.824 1.102.824 2.22 0 1.602-.015 2.894-.015 3.287 0 .322.218.698.825.58C20.565 21.795 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                    Apple
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    
                    /* Responsive Styles */
                    @media (min-width: 768px) {
                        .login-card {
                            grid-template-columns: repeat(2, 1fr) !important;
                        }
                        .login-left {
                            padding: 40px 32px !important;
                        }
                        .login-right {
                            padding: 40px 32px !important;
                        }
                        .login-image {
                            display: block !important;
                        }
                    }
                    
                    @media (min-width: 1024px) {
                        .login-left {
                            padding: 48px !important;
                        }
                        .login-right {
                            padding: 48px !important;
                        }
                    }
                    
                    @media (max-width: 480px) {
                        .login-left {
                            padding: 24px 20px !important;
                        }
                        .login-right {
                            padding: 24px 20px !important;
                        }
                        .login-card {
                            border-radius: 24px !important;
                        }
                    }
                `}
            </style>
        </div>
    );
}

export default OwnerLogin;