import { useEffect, useState } from "react";
import {
    User,
    MapPin,
    Plus,
    Pencil,
    Trash2,
    Mail,
    Phone,
    ShoppingBag,
    LogOut,
    Home,
    Building,
    CheckCircle,
    Calendar,
    AtSign,
    Smartphone,
    Briefcase,
    Edit,
    Save,
    X
} from "lucide-react";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import addressService from "../../services/addressService";
import userService from "../../services/userService";
import { useAuth } from "../../context/AuthContext";

function Profile() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, []);
    const { logout } = useAuth();
    const user = JSON.parse(localStorage.getItem("user"));
    const [addresses, setAddresses] = useState([]);
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const userData = await userService.getProfile();
            setUserDetails(userData);
            setEditData(userData);
            const addressData = await addressService.getAddressesByUser(user.userId);
            setAddresses(addressData);
        } catch (error) {
            console.error(error);
            toast.error("Unable to load profile data");
        } finally {
            setLoading(false);
        }
    };

    const deleteAddress = async (id) => {
        if (!window.confirm("Delete this address?")) return;
        try {
            await addressService.deleteAddress(id);
            toast.success("Address Deleted");
            loadData();
        } catch (error) {
            console.error(error);
            toast.error("Unable to delete address");
        }
    };

    const getAddressTypeIcon = (type) => {
        if (type?.toLowerCase().includes('home')) return <Home size={16} />;
        if (type?.toLowerCase().includes('work') || type?.toLowerCase().includes('office')) return <Building size={16} />;
        return <MapPin size={16} />;
    };

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            logout();
            navigate("/login");
        }
    };

    const handleEdit = () => {
        setEditData(userDetails);
        setEditing(true);
    };

    const handleCancelEdit = () => {
        setEditing(false);
        setEditData(userDetails);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData({
            ...editData,
            [name]: value
        });
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            const updatedUser = await userService.updateProfile(editData);
            setUserDetails(updatedUser);
            setEditing(false);
            toast.success("Profile updated successfully!");
            const storedUser = JSON.parse(localStorage.getItem("user"));
            const updatedStoredUser = {
                ...storedUser,
                username: updatedUser.username,
                email: updatedUser.email,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                phoneNumber: updatedUser.phoneNumber
            };
            localStorage.setItem("user", JSON.stringify(updatedStoredUser));
        } catch (error) {
            console.error(error);
            toast.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    const getInitials = (firstName, lastName) => {
        if (firstName && lastName) {
            return `${firstName[0]}${lastName[0]}`.toUpperCase();
        }
        if (firstName) {
            return firstName[0].toUpperCase();
        }
        return "U";
    };

    const styles = {
        container: {
            backgroundColor: '#f8fafc',
            minHeight: '100vh',
            padding: '24px',
            display: 'flex',
            justifyContent: 'center'
        },
        innerContainer: {
            maxWidth: '900px',
            width: '100%',
            margin: '0 auto'
        },
        profileCard: {
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            border: '1px solid #f1f5f9',
            marginBottom: '32px'
        },
        profileHeader: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
        },
        avatar: {
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f97316, #ef4444)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 8px 24px rgba(249, 115, 22, 0.3)',
            marginBottom: '16px',
            fontSize: '40px',
            fontWeight: 'bold'
        },
        userName: {
            fontSize: '26px',
            fontWeight: '800',
            color: '#0f172a',
            margin: 0
        },
        userUsername: {
            fontSize: '15px',
            color: '#94a3b8',
            margin: '4px 0 0 0'
        },
        userInfoGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
            marginTop: '20px',
            width: '100%',
            maxWidth: '700px',
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        userInfoItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 16px',
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #f1f5f9'
        },
        userInfoIcon: {
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fef3c7',
            color: '#f97316',
            flexShrink: 0
        },
        userInfoLabel: {
            fontSize: '11px',
            color: '#94a3b8',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontWeight: '500'
        },
        userInfoValue: {
            fontSize: '14px',
            fontWeight: '600',
            color: '#0f172a'
        },
        userInfoInput: {
            fontSize: '14px',
            fontWeight: '600',
            color: '#0f172a',
            border: '2px solid #e2e8f0',
            borderRadius: '8px',
            padding: '6px 10px',
            width: '100%',
            outline: 'none',
            transition: 'border-color 0.3s ease',
            backgroundColor: '#f8fafc'
        },
        actionButtons: {
            display: 'flex',
            gap: '12px',
            marginTop: '20px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '100%'
        },
        editBtn: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 24px',
            borderRadius: '12px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            fontWeight: '600',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
        },
        saveBtn: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 24px',
            borderRadius: '12px',
            backgroundColor: '#22c55e',
            color: 'white',
            border: 'none',
            fontWeight: '600',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
        },
        cancelBtn: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 24px',
            borderRadius: '12px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            fontWeight: '600',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
        },
        logoutBtn: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 24px',
            borderRadius: '12px',
            backgroundColor: '#fef2f2',
            color: '#ef4444',
            border: '1px solid #fee2e2',
            fontWeight: '600',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            marginTop: '16px'
        },
        sectionHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '20px'
        },
        sectionTitle: {
            fontSize: '22px',
            fontWeight: '700',
            color: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            margin: 0
        },
        addBtn: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '12px',
            backgroundColor: '#f97316',
            color: 'white',
            border: 'none',
            fontWeight: '600',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
        },
        addressGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px'
        },
        addressCard: {
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            border: '1px solid #f1f5f9',
            transition: 'all 0.3s ease',
            position: 'relative'
        },
        addressHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '8px'
        },
        addressType: {
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '14px',
            fontWeight: '600',
            color: '#0f172a'
        },
        defaultBadge: {
            fontSize: '11px',
            fontWeight: '600',
            color: '#22c55e',
            backgroundColor: '#dcfce7',
            padding: '2px 12px',
            borderRadius: '50px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
        },
        addressText: {
            fontSize: '14px',
            color: '#475569',
            lineHeight: '1.6',
            marginTop: '8px'
        },
        addressActions: {
            display: 'flex',
            gap: '10px',
            marginTop: '14px',
            paddingTop: '14px',
            borderTop: '1px solid #f1f5f9'
        },
        editAddressBtn: {
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 18px',
            borderRadius: '10px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            fontWeight: '500',
            fontSize: '13px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
        },
        deleteBtn: {
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 18px',
            borderRadius: '10px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            fontWeight: '500',
            fontSize: '13px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
        },
        emptyContainer: {
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '48px 24px',
            textAlign: 'center',
            border: '1px solid #f1f5f9'
        },
        emptyIcon: {
            fontSize: '56px',
            opacity: 0.3,
            marginBottom: '12px'
        },
        emptyTitle: {
            fontSize: '20px',
            fontWeight: '700',
            color: '#0f172a',
            margin: 0
        },
        emptySub: {
            color: '#94a3b8',
            marginTop: '4px'
        },
        loadingContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh'
        },
        loadingSpinner: {
            width: '48px',
            height: '48px',
            border: '4px solid #e2e8f0',
            borderTop: '4px solid #f97316',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
        }
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={{ textAlign: 'center' }}>
                    <div style={styles.loadingSpinner}></div>
                    <p style={{ color: '#94a3b8', marginTop: '16px' }}>Loading Profile...</p>
                </div>
            </div>
        );
    }

    const userData = userDetails || user;
    const fullName = userData?.firstName && userData?.lastName 
        ? `${userData.firstName} ${userData.lastName}` 
        : userData?.username || "User";

    return (
        <div style={styles.container}>
            <div style={styles.innerContainer}>
                {/* Profile Card */}
                <div style={styles.profileCard}>
                    <div style={styles.profileHeader}>
                        <div style={styles.avatar}>
                            {getInitials(userData?.firstName, userData?.lastName)}
                        </div>
                        {!editing ? (
                            <>
                                <h1 style={styles.userName}>{fullName}</h1>
                                <p style={styles.userUsername}>@{userData?.username}</p>
                            </>
                        ) : (
                            <>
                                <div style={{ width: '100%', maxWidth: '400px' }}>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={editData?.firstName || ''}
                                        onChange={handleInputChange}
                                        placeholder="First Name"
                                        style={{
                                            ...styles.userInfoInput, 
                                            marginBottom: '8px'
                                        }}
                                        onFocus={(e) => e.currentTarget.style.borderColor = '#f97316'}
                                        onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                                    />
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={editData?.lastName || ''}
                                        onChange={handleInputChange}
                                        placeholder="Last Name"
                                        style={styles.userInfoInput}
                                        onFocus={(e) => e.currentTarget.style.borderColor = '#f97316'}
                                        onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                                    />
                                </div>
                            </>
                        )}

                        {/* User Details Grid */}
                        <div style={styles.userInfoGrid}>
                            <div style={styles.userInfoItem}>
                                <div style={styles.userInfoIcon}>
                                    <User size={16} />
                                </div>
                                <div style={{ flex: 1, textAlign: 'left' }}>
                                    <div style={styles.userInfoLabel}>Full Name</div>
                                    {!editing ? (
                                        <div style={styles.userInfoValue}>{fullName}</div>
                                    ) : (
                                        <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={editData?.firstName || ''}
                                                onChange={handleInputChange}
                                                placeholder="First Name"
                                                style={styles.userInfoInput}
                                                onFocus={(e) => e.currentTarget.style.borderColor = '#f97316'}
                                                onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                                            />
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={editData?.lastName || ''}
                                                onChange={handleInputChange}
                                                placeholder="Last Name"
                                                style={styles.userInfoInput}
                                                onFocus={(e) => e.currentTarget.style.borderColor = '#f97316'}
                                                onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div style={styles.userInfoItem}>
                                <div style={styles.userInfoIcon}>
                                    <AtSign size={16} />
                                </div>
                                <div style={{ flex: 1, textAlign: 'left' }}>
                                    <div style={styles.userInfoLabel}>Username</div>
                                    {!editing ? (
                                        <div style={styles.userInfoValue}>@{userData?.username}</div>
                                    ) : (
                                        <input
                                            type="text"
                                            name="username"
                                            value={editData?.username || ''}
                                            onChange={handleInputChange}
                                            style={styles.userInfoInput}
                                            onFocus={(e) => e.currentTarget.style.borderColor = '#f97316'}
                                            onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                                        />
                                    )}
                                </div>
                            </div>
                            <div style={styles.userInfoItem}>
                                <div style={styles.userInfoIcon}>
                                    <Mail size={16} />
                                </div>
                                <div style={{ flex: 1, textAlign: 'left' }}>
                                    <div style={styles.userInfoLabel}>Email Address</div>
                                    {!editing ? (
                                        <div style={styles.userInfoValue}>{userData?.email}</div>
                                    ) : (
                                        <input
                                            type="email"
                                            name="email"
                                            value={editData?.email || ''}
                                            onChange={handleInputChange}
                                            style={styles.userInfoInput}
                                            onFocus={(e) => e.currentTarget.style.borderColor = '#f97316'}
                                            onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                                        />
                                    )}
                                </div>
                            </div>
                            <div style={styles.userInfoItem}>
                                <div style={styles.userInfoIcon}>
                                    <Smartphone size={16} />
                                </div>
                                <div style={{ flex: 1, textAlign: 'left' }}>
                                    <div style={styles.userInfoLabel}>Phone Number</div>
                                    {!editing ? (
                                        <div style={styles.userInfoValue}>{userData?.phoneNumber || 'Not provided'}</div>
                                    ) : (
                                        <input
                                            type="text"
                                            name="phoneNumber"
                                            value={editData?.phoneNumber || ''}
                                            onChange={handleInputChange}
                                            placeholder="Phone Number"
                                            style={styles.userInfoInput}
                                            onFocus={(e) => e.currentTarget.style.borderColor = '#f97316'}
                                            onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                                        />
                                    )}
                                </div>
                            </div>
                            <div style={styles.userInfoItem}>
                                <div style={styles.userInfoIcon}>
                                    <Briefcase size={16} />
                                </div>
                                <div style={{ flex: 1, textAlign: 'left' }}>
                                    <div style={styles.userInfoLabel}>Role</div>
                                    <div style={styles.userInfoValue}>
                                        {userData?.role?.startsWith('ROLE_') 
                                            ? userData.role.substring(5) 
                                            : userData?.role || 'Customer'}
                                    </div>
                                </div>
                            </div>
                            {userData?.createdAt && (
                                <div style={styles.userInfoItem}>
                                    <div style={styles.userInfoIcon}>
                                        <Calendar size={16} />
                                    </div>
                                    <div style={{ flex: 1, textAlign: 'left' }}>
                                        <div style={styles.userInfoLabel}>Member Since</div>
                                        <div style={styles.userInfoValue}>
                                            {new Date(userData.createdAt).toLocaleDateString('en-IN', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div style={styles.actionButtons}>
                            {!editing ? (
                                <button
                                    style={styles.editBtn}
                                    onClick={handleEdit}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#2563eb';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#3b82f6';
                                    }}
                                >
                                    <Edit size={18} />
                                    Edit Profile
                                </button>
                            ) : (
                                <>
                                    <button
                                        style={styles.saveBtn}
                                        onClick={handleSave}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#16a34a';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = '#22c55e';
                                        }}
                                    >
                                        <Save size={18} />
                                        Save Changes
                                    </button>
                                    <button
                                        style={styles.cancelBtn}
                                        onClick={handleCancelEdit}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#dc2626';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = '#ef4444';
                                        }}
                                    >
                                        <X size={18} />
                                        Cancel
                                    </button>
                                </>
                            )}
                        </div>

                        <button
                            style={styles.logoutBtn}
                            onClick={handleLogout}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#fee2e2';
                                e.currentTarget.style.borderColor = '#fecaca';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#fef2f2';
                                e.currentTarget.style.borderColor = '#fee2e2';
                            }}
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                </div>

                {/* Address Section */}
                <div style={styles.sectionHeader}>
                    <h2 style={styles.sectionTitle}>
                        <MapPin size={24} color="#f97316" />
                        Saved Addresses
                    </h2>
                    <button
                        style={styles.addBtn}
                        onClick={() => navigate("/address/new")}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#ea580c';
                            e.currentTarget.style.transform = 'scale(1.02)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#f97316';
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        <Plus size={18} />
                        Add New Address
                    </button>
                </div>

                {addresses.length === 0 ? (
                    <div style={styles.emptyContainer}>
                        <div style={styles.emptyIcon}>📍</div>
                        <h2 style={styles.emptyTitle}>No Address Found</h2>
                        <p style={styles.emptySub}>Add your first delivery address.</p>
                    </div>
                ) : (
                    <div style={styles.addressGrid}>
                        {addresses.map((address) => (
                            <div
                                key={address.id}
                                style={styles.addressCard}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)';
                                    e.currentTarget.style.borderColor = '#fed7aa';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
                                    e.currentTarget.style.borderColor = '#f1f5f9';
                                }}
                            >
                                <div style={styles.addressHeader}>
                                    <div style={styles.addressType}>
                                        {getAddressTypeIcon(address.addressType)}
                                        {address.addressType || 'Address'}
                                    </div>
                                    {address.defaultAddress && (
                                        <span style={styles.defaultBadge}>
                                            <CheckCircle size={12} />
                                            Default
                                        </span>
                                    )}
                                </div>
                                <div style={styles.addressText}>
                                    {address.houseNo}, {address.street}
                                    {address.landmark && `, ${address.landmark}`}
                                    <br />
                                    {address.city}, {address.state} - {address.pincode}
                                </div>
                                <div style={styles.addressActions}>
                                    <button
                                        style={styles.editAddressBtn}
                                        onClick={() => navigate(`/address/edit/${address.id}`)}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#2563eb';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = '#3b82f6';
                                        }}
                                    >
                                        <Pencil size={15} />
                                        Edit
                                    </button>
                                    <button
                                        style={styles.deleteBtn}
                                        onClick={() => deleteAddress(address.id)}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#dc2626';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = '#ef4444';
                                        }}
                                    >
                                        <Trash2 size={15} />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    @media (max-width: 768px) {
                        .user-info-grid {
                            grid-template-columns: 1fr !important;
                        }
                        .address-grid {
                            grid-template-columns: 1fr !important;
                        }
                        .profile-card {
                            padding: 20px !important;
                        }
                    }
                `}
            </style>
        </div>
    );
}

export default Profile;