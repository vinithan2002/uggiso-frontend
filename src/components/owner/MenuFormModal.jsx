import { useState, useEffect } from "react";
import { X, Upload, Coffee, Tag, Clock, IndianRupee, Utensils, CheckCircle, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

import menuService from "../../services/menuService";

function MenuFormModal({
    restaurantId,
    categories,
    editingItem,
    onClose,
    onSuccess
}) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        foodType: "VEG",
        available: true,
        preparationTime: "",
        categoryId: ""
    });
    const [imagePreview, setImagePreview] = useState("");

    useEffect(() => {

    if (editingItem) {

        setFormData({
            name: editingItem.name,
            description: editingItem.description,
            price: editingItem.price,
            imageUrl: editingItem.imageUrl,
            foodType: editingItem.foodType,
            available: editingItem.available,
            preparationTime: editingItem.preparationTime,
            categoryId: editingItem.categoryId
        });

        setImagePreview(editingItem.imageUrl);

    }

}, [editingItem]);
    
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleImageChange = (e) => {
        const url = e.target.value;
        setFormData({
            ...formData,
            imageUrl: url
        });
        setImagePreview(url);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.name.trim()) {
            toast.error("Please enter item name");
            return;
        }
        if (!formData.price || formData.price <= 0) {
            toast.error("Please enter a valid price");
            return;
        }
        if (!formData.categoryId) {
            toast.error("Please select a category");
            return;
        }

        try {
            setLoading(true);
            const request = {
    ...formData,
    restaurantId,
    price: Number(formData.price),
    preparationTime: Number(formData.preparationTime),
    categoryId: Number(formData.categoryId)
};

if (editingItem) {

    await menuService.updateMenuItem(editingItem.id, request);

    toast.success("Menu Item Updated Successfully 🎉");

} else {

    await menuService.createMenuItem(request);

    toast.success("Menu Item Added Successfully 🎉");

}
            onSuccess();
            onClose();
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data ||
                "Failed to add menu item"
            );
        } finally {
            setLoading(false);
        }
    };

    const styles = {
        overlay: {
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '16px',
            animation: 'fadeIn 0.3s ease'
        },
        modal: {
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '560px',
            maxHeight: '90vh',
            overflow: 'hidden',
            boxShadow: '0 25px 80px rgba(0,0,0,0.2)',
            animation: 'slideUp 0.3s ease'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '24px 28px',
            borderBottom: '1px solid #f1f5f9',
            background: '#fafafa'
        },
        headerLeft: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
        },
        headerIcon: {
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #f97316, #ef4444)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
        },
        title: {
            fontSize: '20px',
            fontWeight: '700',
            color: '#0f172a',
            margin: 0
        },
        subtitle: {
            fontSize: '13px',
            color: '#94a3b8',
            margin: 0
        },
        closeBtn: {
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: '#f1f5f9',
            color: '#64748b',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
        },
        form: {
            padding: '28px',
            overflowY: 'auto',
            maxHeight: 'calc(90vh - 120px)'
        },
        formGroup: {
            marginBottom: '18px'
        },
        label: {
            display: 'block',
            fontSize: '13px',
            fontWeight: '600',
            color: '#0f172a',
            marginBottom: '6px'
        },
        labelRequired: {
            color: '#ef4444',
            marginLeft: '2px'
        },
        input: {
            width: '100%',
            padding: '12px 16px',
            borderRadius: '12px',
            border: '2px solid #e2e8f0',
            fontSize: '14px',
            outline: 'none',
            transition: 'all 0.3s ease',
            backgroundColor: '#fafafa',
            color: '#0f172a',
            boxSizing: 'border-box',
            fontFamily: 'inherit'
        },
        textarea: {
            width: '100%',
            padding: '12px 16px',
            borderRadius: '12px',
            border: '2px solid #e2e8f0',
            fontSize: '14px',
            outline: 'none',
            transition: 'all 0.3s ease',
            backgroundColor: '#fafafa',
            color: '#0f172a',
            boxSizing: 'border-box',
            minHeight: '80px',
            resize: 'vertical',
            fontFamily: 'inherit'
        },
        select: {
            width: '100%',
            padding: '12px 16px',
            borderRadius: '12px',
            border: '2px solid #e2e8f0',
            fontSize: '14px',
            outline: 'none',
            transition: 'all 0.3s ease',
            backgroundColor: '#fafafa',
            color: '#0f172a',
            boxSizing: 'border-box',
            fontFamily: 'inherit',
            appearance: 'auto',
            cursor: 'pointer'
        },
        row: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '14px'
        },
        checkboxWrapper: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 16px',
            backgroundColor: '#fafafa',
            borderRadius: '12px',
            border: '2px solid #e2e8f0',
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
        imagePreview: {
            marginTop: '8px',
            width: '100%',
            height: '120px',
            borderRadius: '12px',
            objectFit: 'cover',
            backgroundColor: '#f1f5f9',
            border: '2px dashed #e2e8f0'
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
            fontWeight: '700',
            fontSize: '15px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 14px rgba(249,115,22,0.3)',
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
            fontWeight: '700',
            fontSize: '15px',
            cursor: 'not-allowed',
            opacity: 0.6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
        },
        foodTypeGroup: {
            display: 'flex',
            gap: '10px'
        },
        foodTypeBtn: (selected, type) => ({
            flex: 1,
            padding: '10px',
            borderRadius: '10px',
            border: `2px solid ${selected ? '#f97316' : '#e2e8f0'}`,
            backgroundColor: selected ? '#fff7ed' : '#fafafa',
            color: selected ? '#f97316' : '#64748b',
            fontWeight: selected ? '600' : '500',
            fontSize: '13px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
        })
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <div style={styles.headerIcon}>
                            <Utensils size={20} />
                        </div>
                        <div>
                            <h2 style={styles.title}>Add Menu Item</h2>
                            <p style={styles.subtitle}>Create a new dish for your restaurant</p>
                        </div>
                    </div>
                    <button
                        style={styles.closeBtn}
                        onClick={onClose}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#fee2e2';
                            e.currentTarget.style.color = '#ef4444';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#f1f5f9';
                            e.currentTarget.style.color = '#64748b';
                        }}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} style={styles.form}>
                    {/* Item Name */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>
                            Item Name <span style={styles.labelRequired}>*</span>
                        </label>
                        <input
                            name="name"
                            placeholder="e.g., Margherita Pizza"
                            style={styles.input}
                            value={formData.name}
                            onChange={handleChange}
                            required
                            onFocus={(e) => {
                                e.currentTarget.style.borderColor = '#f97316';
                                e.currentTarget.style.backgroundColor = '#ffffff';
                                e.currentTarget.style.boxShadow = '0 0 0 4px rgba(249,115,22,0.1)';
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = '#e2e8f0';
                                e.currentTarget.style.backgroundColor = '#fafafa';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    {/* Description */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Description</label>
                        <textarea
                            name="description"
                            placeholder="Describe your dish..."
                            style={styles.textarea}
                            rows="3"
                            value={formData.description}
                            onChange={handleChange}
                            onFocus={(e) => {
                                e.currentTarget.style.borderColor = '#f97316';
                                e.currentTarget.style.backgroundColor = '#ffffff';
                                e.currentTarget.style.boxShadow = '0 0 0 4px rgba(249,115,22,0.1)';
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = '#e2e8f0';
                                e.currentTarget.style.backgroundColor = '#fafafa';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    {/* Price & Time */}
                    <div style={styles.row}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>
                                Price <span style={styles.labelRequired}>*</span>
                            </label>
                            <input
                                name="price"
                                type="number"
                                placeholder="₹ 299"
                                style={styles.input}
                                value={formData.price}
                                onChange={handleChange}
                                required
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = '#f97316';
                                    e.currentTarget.style.backgroundColor = '#ffffff';
                                    e.currentTarget.style.boxShadow = '0 0 0 4px rgba(249,115,22,0.1)';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = '#e2e8f0';
                                    e.currentTarget.style.backgroundColor = '#fafafa';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>
                                Prep Time <span style={styles.labelRequired}>*</span>
                            </label>
                            <input
                                name="preparationTime"
                                type="number"
                                placeholder="20 min"
                                style={styles.input}
                                value={formData.preparationTime}
                                onChange={handleChange}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = '#f97316';
                                    e.currentTarget.style.backgroundColor = '#ffffff';
                                    e.currentTarget.style.boxShadow = '0 0 0 4px rgba(249,115,22,0.1)';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = '#e2e8f0';
                                    e.currentTarget.style.backgroundColor = '#fafafa';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>
                            Category <span style={styles.labelRequired}>*</span>
                        </label>
                        <select
                            name="categoryId"
                            style={styles.select}
                            value={formData.categoryId}
                            onChange={handleChange}
                            required
                            onFocus={(e) => {
                                e.currentTarget.style.borderColor = '#f97316';
                                e.currentTarget.style.backgroundColor = '#ffffff';
                                e.currentTarget.style.boxShadow = '0 0 0 4px rgba(249,115,22,0.1)';
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = '#e2e8f0';
                                e.currentTarget.style.backgroundColor = '#fafafa';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Food Type */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Food Type</label>
                        <div style={styles.foodTypeGroup}>
                            <button
                                type="button"
                                style={styles.foodTypeBtn(formData.foodType === "VEG", "VEG")}
                                onClick={() => setFormData({ ...formData, foodType: "VEG" })}
                            >
                                🟢 Veg
                            </button>
                            <button
                                type="button"
                                style={styles.foodTypeBtn(formData.foodType === "NON_VEG", "NON_VEG")}
                                onClick={() => setFormData({ ...formData, foodType: "NON_VEG" })}
                            >
                                🔴 Non Veg
                            </button>
                        </div>
                    </div>

                    {/* Image URL */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Image URL</label>
                        <input
                            name="imageUrl"
                            placeholder="https://example.com/image.jpg"
                            style={styles.input}
                            value={formData.imageUrl}
                            onChange={handleImageChange}
                            onFocus={(e) => {
                                e.currentTarget.style.borderColor = '#f97316';
                                e.currentTarget.style.backgroundColor = '#ffffff';
                                e.currentTarget.style.boxShadow = '0 0 0 4px rgba(249,115,22,0.1)';
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = '#e2e8f0';
                                e.currentTarget.style.backgroundColor = '#fafafa';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        />
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                style={styles.imagePreview}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        )}
                    </div>

                    {/* Available Checkbox */}
                    <div
                        style={styles.checkboxWrapper}
                        onClick={() => setFormData({ ...formData, available: !formData.available })}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#f1f5f9';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#fafafa';
                        }}
                    >
                        <input
                            type="checkbox"
                            name="available"
                            checked={formData.available}
                            onChange={handleChange}
                            style={styles.checkbox}
                            onClick={(e) => e.stopPropagation()}
                        />
                        <div>
                            <div style={styles.checkboxLabel}>
                                {formData.available ? '✅ Available' : 'Available'}
                            </div>
                            <div style={styles.checkboxDesc}>
                                {formData.available 
                                    ? 'Item is visible to customers' 
                                    : 'Item will be hidden from customers'}
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div style={styles.buttonGroup}>
                        <button
                            type="button"
                            style={styles.cancelBtn}
                            onClick={onClose}
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
                                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(249,115,22,0.4)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!loading) {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(249,115,22,0.3)';
                                }
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
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <CheckCircle size={18} />
                                    Save Menu Item
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    @keyframes slideUp {
                        from { 
                            opacity: 0;
                            transform: translateY(30px);
                        }
                        to { 
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    );
}

export default MenuFormModal;