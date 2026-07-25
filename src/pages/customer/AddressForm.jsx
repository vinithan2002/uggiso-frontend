import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
    ArrowLeft,
    Home,
    Building,
    MapPin,
    CheckCircle,
    User,
    Mail,
    Phone,
    AlertCircle
} from "lucide-react";

import addressService from "../../services/addressService";

function AddressForm() {

    useEffect(() => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }, []);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState({
        houseNo: "",
        street: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
        addressType: "HOME",
        defaultAddress: false,
        userId: user.userId
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setAddress({
            ...address,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!address.houseNo.trim()) {
            toast.error("Please enter house number");
            return;
        }
        if (!address.street.trim()) {
            toast.error("Please enter street");
            return;
        }
        if (!address.city.trim()) {
            toast.error("Please enter city");
            return;
        }
        if (!address.state.trim()) {
            toast.error("Please enter state");
            return;
        }
        if (!address.pincode.trim() || address.pincode.length < 6) {
            toast.error("Please enter a valid 6-digit pincode");
            return;
        }

        try {
            setLoading(true);
            await addressService.createAddress(address);
            toast.success("Address Added Successfully 🎉");
            navigate("/profile");
        } catch (error) {
            console.error(error);
            toast.error("Unable to save address");
        } finally {
            setLoading(false);
        }
    };

    const styles = {
        container: {
            backgroundColor: '#f8fafc',
            minHeight: '100vh',
            padding: '32px 16px'
        },
        innerContainer: {
            maxWidth: '600px',
            margin: '0 auto'
        },
        backBtn: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#475569',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            padding: '8px 16px',
            borderRadius: '10px',
            transition: 'all 0.3s ease',
            marginBottom: '20px'
        },
        card: {
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            border: '1px solid #f1f5f9'
        },
        header: {
            textAlign: 'center',
            marginBottom: '28px'
        },
        iconWrapper: {
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f97316, #ef4444)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px auto',
            boxShadow: '0 8px 24px rgba(249, 115, 22, 0.3)'
        },
        title: {
            fontSize: '26px',
            fontWeight: '800',
            color: '#0f172a',
            margin: 0
        },
        subtitle: {
            fontSize: '14px',
            color: '#94a3b8',
            marginTop: '4px'
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
        },
        formGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
        },
        label: {
            fontSize: '13px',
            fontWeight: '600',
            color: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
        },
        labelRequired: {
            color: '#ef4444',
            fontSize: '14px'
        },
        input: {
            padding: '12px 16px',
            borderRadius: '12px',
            border: '2px solid #e2e8f0',
            fontSize: '14px',
            outline: 'none',
            transition: 'all 0.3s ease',
            backgroundColor: '#ffffff',
            color: '#0f172a',
            width: '100%',
            boxSizing: 'border-box'
        },
        inputError: {
            padding: '12px 16px',
            borderRadius: '12px',
            border: '2px solid #ef4444',
            fontSize: '14px',
            outline: 'none',
            transition: 'all 0.3s ease',
            backgroundColor: '#fef2f2',
            color: '#0f172a',
            width: '100%',
            boxSizing: 'border-box'
        },
        select: {
            padding: '12px 16px',
            borderRadius: '12px',
            border: '2px solid #e2e8f0',
            fontSize: '14px',
            outline: 'none',
            transition: 'all 0.3s ease',
            backgroundColor: '#ffffff',
            color: '#0f172a',
            width: '100%',
            boxSizing: 'border-box',
            appearance: 'auto',
            cursor: 'pointer'
        },
        checkboxWrapper: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 16px',
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
        },
        checkbox: {
            width: '18px',
            height: '18px',
            accentColor: '#f97316',
            cursor: 'pointer'
        },
        checkboxLabel: {
            fontSize: '14px',
            fontWeight: '500',
            color: '#0f172a',
            cursor: 'pointer'
        },
        checkboxDesc: {
            fontSize: '12px',
            color: '#94a3b8'
        },
        buttonGroup: {
            display: 'flex',
            gap: '12px',
            marginTop: '8px'
        },
        cancelBtn: {
            flex: 1,
            padding: '14px',
            borderRadius: '12px',
            backgroundColor: '#f1f5f9',
            color: '#475569',
            border: 'none',
            fontWeight: '600',
            fontSize: '15px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
        },
        submitBtn: {
            flex: 1,
            padding: '14px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #f97316, #ef4444)',
            color: 'white',
            border: 'none',
            fontWeight: '600',
            fontSize: '15px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 14px rgba(249, 115, 22, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
        },
        submitBtnDisabled: {
            flex: 1,
            padding: '14px',
            borderRadius: '12px',
            backgroundColor: '#94a3b8',
            color: 'white',
            border: 'none',
            fontWeight: '600',
            fontSize: '15px',
            cursor: 'not-allowed',
            opacity: 0.6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
        },
        row: {
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: '16px'
        },
        hint: {
            fontSize: '12px',
            color: '#94a3b8',
            marginTop: '4px'
        },
        errorHint: {
            fontSize: '12px',
            color: '#ef4444',
            marginTop: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.innerContainer}>
                <button
                    style={styles.backBtn}
                    onClick={() => navigate("/profile")}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f1f5f9';
                        e.currentTarget.style.color = '#0f172a';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#475569';
                    }}
                >
                    <ArrowLeft size={18} />
                    Back to Profile
                </button>

                <div style={styles.card}>
                    <div style={styles.header}>
                        <div style={styles.iconWrapper}>
                            <MapPin size={28} color="white" />
                        </div>
                        <h1 style={styles.title}>Add New Address</h1>
                        <p style={styles.subtitle}>Enter your delivery address details</p>
                    </div>

                    <form onSubmit={handleSubmit} style={styles.form}>
                        {/* House No */}
                        <div style={styles.formGroup}>
                            <label style={styles.label}>
                                House / Flat No
                                <span style={styles.labelRequired}>*</span>
                            </label>
                            <input
                                type="text"
                                name="houseNo"
                                value={address.houseNo}
                                onChange={handleChange}
                                placeholder="Enter house or flat number"
                                required
                                style={styles.input}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = '#f97316';
                                    e.currentTarget.style.boxShadow = '0 0 0 4px rgba(249,115,22,0.1)';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = '#e2e8f0';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            />
                        </div>

                        {/* Street */}
                        <div style={styles.formGroup}>
                            <label style={styles.label}>
                                Street / Area
                                <span style={styles.labelRequired}>*</span>
                            </label>
                            <input
                                type="text"
                                name="street"
                                value={address.street}
                                onChange={handleChange}
                                placeholder="Enter street or area name"
                                required
                                style={styles.input}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = '#f97316';
                                    e.currentTarget.style.boxShadow = '0 0 0 4px rgba(249,115,22,0.1)';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = '#e2e8f0';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            />
                        </div>

                        {/* Landmark */}
                        <div style={styles.formGroup}>
                            <label style={styles.label}>
                                Landmark
                                <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '400' }}> (Optional)</span>
                            </label>
                            <input
                                type="text"
                                name="landmark"
                                value={address.landmark}
                                onChange={handleChange}
                                placeholder="Enter landmark (e.g., near temple)"
                                style={styles.input}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = '#f97316';
                                    e.currentTarget.style.boxShadow = '0 0 0 4px rgba(249,115,22,0.1)';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = '#e2e8f0';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            />
                        </div>

                        {/* City & State Row */}
                        <div style={styles.row}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>
                                    City
                                    <span style={styles.labelRequired}>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={address.city}
                                    onChange={handleChange}
                                    placeholder="Enter city"
                                    required
                                    style={styles.input}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = '#f97316';
                                        e.currentTarget.style.boxShadow = '0 0 0 4px rgba(249,115,22,0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = '#e2e8f0';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>
                                    State
                                    <span style={styles.labelRequired}>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="state"
                                    value={address.state}
                                    onChange={handleChange}
                                    placeholder="Enter state"
                                    required
                                    style={styles.input}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = '#f97316';
                                        e.currentTarget.style.boxShadow = '0 0 0 4px rgba(249,115,22,0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = '#e2e8f0';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                />
                            </div>
                        </div>

                        {/* Pincode */}
                        <div style={styles.formGroup}>
                            <label style={styles.label}>
                                Pincode
                                <span style={styles.labelRequired}>*</span>
                            </label>
                            <input
                                type="text"
                                name="pincode"
                                value={address.pincode}
                                onChange={handleChange}
                                placeholder="Enter 6-digit pincode"
                                required
                                maxLength="6"
                                style={address.pincode.length > 0 && address.pincode.length < 6 ? styles.inputError : styles.input}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = '#f97316';
                                    e.currentTarget.style.boxShadow = '0 0 0 4px rgba(249,115,22,0.1)';
                                }}
                                onBlur={(e) => {
                                    if (address.pincode.length > 0 && address.pincode.length < 6) {
                                        e.currentTarget.style.borderColor = '#ef4444';
                                    } else {
                                        e.currentTarget.style.borderColor = '#e2e8f0';
                                    }
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            />
                            {address.pincode.length > 0 && address.pincode.length < 6 && (
                                <div style={styles.errorHint}>
                                    <AlertCircle size={14} />
                                    Pincode must be 6 digits
                                </div>
                            )}
                        </div>

                        {/* Address Type */}
                        <div style={styles.formGroup}>
                            <label style={styles.label}>
                                Address Type
                                <span style={styles.labelRequired}>*</span>
                            </label>
                            <select
                                name="addressType"
                                value={address.addressType}
                                onChange={handleChange}
                                style={styles.select}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = '#f97316';
                                    e.currentTarget.style.boxShadow = '0 0 0 4px rgba(249,115,22,0.1)';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = '#e2e8f0';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <option value="HOME">🏠 Home</option>
                                <option value="WORK">🏢 Work</option>
                                <option value="OTHER">📍 Other</option>
                            </select>
                        </div>

                        {/* Default Address Checkbox */}
                        <div
                            style={styles.checkboxWrapper}
                            onClick={() => setAddress({ ...address, defaultAddress: !address.defaultAddress })}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#f1f5f9';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#f8fafc';
                            }}
                        >
                            <input
                                type="checkbox"
                                name="defaultAddress"
                                checked={address.defaultAddress}
                                onChange={handleChange}
                                style={styles.checkbox}
                                onClick={(e) => e.stopPropagation()}
                            />
                            <div>
                                <div style={styles.checkboxLabel}>
                                    {address.defaultAddress ? '✅ Set as Default Address' : 'Set as Default Address'}
                                </div>
                                <div style={styles.checkboxDesc}>
                                    {address.defaultAddress 
                                        ? 'This address will be used by default for delivery' 
                                        : 'Make this your primary delivery address'}
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div style={styles.buttonGroup}>
                            <button
                                type="button"
                                onClick={() => navigate("/profile")}
                                style={styles.cancelBtn}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#e2e8f0';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#f1f5f9';
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                style={loading ? styles.submitBtnDisabled : styles.submitBtn}
                                onMouseEnter={(e) => {
                                    if (!loading) {
                                        e.currentTarget.style.transform = 'scale(1.02)';
                                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(249, 115, 22, 0.4)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!loading) {
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.boxShadow = '0 4px 14px rgba(249, 115, 22, 0.3)';
                                    }
                                }}
                            >
                                {loading ? (
                                    <>
                                        <div style={{
                                            width: '20px',
                                            height: '20px',
                                            border: '2px solid rgba(255,255,255,0.3)',
                                            borderTop: '2px solid white',
                                            borderRadius: '50%',
                                            animation: 'spin 0.8s linear infinite'
                                        }}></div>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle size={18} />
                                        Save Address
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    @media (min-width: 640px) {
                        .address-row {
                            grid-template-columns: repeat(2, 1fr) !important;
                        }
                    }
                `}
            </style>
        </div>
    );
}

export default AddressForm;