import { useState } from "react";
import { Link } from "react-router-dom";
import {
    User,
    Mail,
    Phone,
    Lock,
    Eye,
    EyeOff,
    UtensilsCrossed,
    ArrowRight,
    CheckCircle
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

function Register() {
    const { register, loading } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [registerData, setRegisterData] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (registerData.password !== registerData.confirmPassword) {
            return alert("Passwords do not match");
        }
        const data = {
            firstName: registerData.firstName,
            lastName: registerData.lastName,
            userName: registerData.userName,
            email: registerData.email,
            phoneNumber: registerData.phoneNumber,
            password: registerData.password
        };
        await register(data);
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
            maxWidth: '420px'
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
            gap: '14px'
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
        row: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px'
        },
        registerBtn: {
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
        loginRow: {
            textAlign: 'center',
            fontSize: '13px',
            color: '#64748b',
            marginTop: '12px'
        },
        loginLink: {
            color: '#f97316',
            fontWeight: '700',
            textDecoration: 'none',
            marginLeft: '4px'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.bgDecoration1}></div>
            <div style={styles.bgDecoration2}></div>

            <div style={styles.card} className="register-card">
                {/* Left Panel */}
                <div style={styles.leftPanel} className="register-left">
                    <div style={styles.leftPanelGlow}></div>
                    <div style={styles.leftPanelGlow2}></div>

                    <div style={styles.logoWrapper}>
                        <div style={styles.logoIcon}>
                            <UtensilsCrossed size={24} color="white" />
                        </div>
                        <h1 style={styles.logoText}>UGGISO</h1>
                    </div>

                    <div style={styles.leftContent}>
                        <h2 style={styles.leftTitle}>
                            Join UGGISO Today 🍕
                        </h2>
                        <p style={styles.leftSubtitle}>
                            Discover thousands of restaurants, exciting offers,
                            and lightning-fast delivery.
                        </p>

                        <div style={styles.features}>
                            <div style={styles.featureItem}>
                                <span style={styles.featureIcon}>
                                    <CheckCircle size={10} color="white" />
                                </span>
                                10,000+ Happy Customers
                            </div>
                            <div style={styles.featureItem}>
                                <span style={styles.featureIcon}>
                                    <CheckCircle size={10} color="white" />
                                </span>
                                Fast & Reliable Delivery
                            </div>
                            <div style={styles.featureItem}>
                                <span style={styles.featureIcon}>
                                    <CheckCircle size={10} color="white" />
                                </span>
                                Exclusive Offers Daily
                            </div>
                        </div>

                        <img
                            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=400&fit=crop"
                            alt="Food"
                            style={styles.leftImage}
                            className="register-image"
                        />
                    </div>
                </div>

                {/* Right Panel */}
                <div style={styles.rightPanel} className="register-right">
                    <div style={styles.formWrapper}>
                        <div style={styles.formHeader}>
                            <h2 style={styles.formTitle}>Create Account 🚀</h2>
                            <p style={styles.formSubtitle}>Register and start ordering delicious food.</p>
                        </div>

                        <form onSubmit={handleSubmit} style={styles.form}>
                            {/* Name Row */}
                            <div style={styles.row}>
                                <div style={styles.inputGroup}>
                                    <label style={styles.inputLabel}>First Name</label>
                                    <div style={styles.inputWrapper}>
                                        <User size={16} style={styles.inputIcon} />
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={registerData.firstName}
                                            onChange={handleChange}
                                            placeholder="Enter first name"
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
                                    <label style={styles.inputLabel}>Last Name</label>
                                    <div style={styles.inputWrapper}>
                                        <User size={16} style={styles.inputIcon} />
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={registerData.lastName}
                                            onChange={handleChange}
                                            placeholder="Enter last name"
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
                            </div>

                            {/* Username */}
                            <div style={styles.inputGroup}>
                                <label style={styles.inputLabel}>Username</label>
                                <div style={styles.inputWrapper}>
                                    <User size={16} style={styles.inputIcon} />
                                    <input
                                        type="text"
                                        name="userName"
                                        value={registerData.userName}
                                        onChange={handleChange}
                                        placeholder="Choose a username"
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

                            {/* Email */}
                            <div style={styles.inputGroup}>
                                <label style={styles.inputLabel}>Email Address</label>
                                <div style={styles.inputWrapper}>
                                    <Mail size={16} style={styles.inputIcon} />
                                    <input
                                        type="email"
                                        name="email"
                                        value={registerData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
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

                            {/* Phone */}
                            <div style={styles.inputGroup}>
                                <label style={styles.inputLabel}>Phone Number</label>
                                <div style={styles.inputWrapper}>
                                    <Phone size={16} style={styles.inputIcon} />
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        value={registerData.phoneNumber}
                                        onChange={handleChange}
                                        placeholder="Enter your phone number"
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

                            {/* Password */}
                            <div style={styles.inputGroup}>
                                <label style={styles.inputLabel}>Password</label>
                                <div style={styles.inputWrapper}>
                                    <Lock size={16} style={styles.inputIcon} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={registerData.password}
                                        onChange={handleChange}
                                        placeholder="Create a password"
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

                            {/* Confirm Password */}
                            <div style={styles.inputGroup}>
                                <label style={styles.inputLabel}>Confirm Password</label>
                                <div style={styles.inputWrapper}>
                                    <Lock size={16} style={styles.inputIcon} />
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={registerData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm your password"
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
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        style={styles.passwordToggle}
                                    >
                                        {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                style={styles.registerBtn}
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
                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        Create Account
                                        <ArrowRight size={17} />
                                    </>
                                )}
                            </button>

                            <div style={styles.loginRow}>
                                Already have an account?
                                <Link to="/login" style={styles.loginLink}>
                                    Login →
                                </Link>
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

                    @media (min-width: 768px) {
                        .register-card {
                            grid-template-columns: repeat(2, 1fr) !important;
                        }
                        .register-left {
                            padding: 40px 32px !important;
                        }
                        .register-right {
                            padding: 40px 32px !important;
                        }
                        .register-image {
                            display: block !important;
                        }
                    }

                    @media (min-width: 1024px) {
                        .register-left {
                            padding: 48px !important;
                        }
                        .register-right {
                            padding: 48px !important;
                        }
                    }

                    @media (max-width: 480px) {
                        .register-left {
                            padding: 24px 20px !important;
                        }
                        .register-right {
                            padding: 24px 20px !important;
                        }
                        .register-card {
                            border-radius: 24px !important;
                        }
                        .register-row {
                            grid-template-columns: 1fr !important;
                        }
                    }
                `}
            </style>
        </div>
    );
}

export default Register;