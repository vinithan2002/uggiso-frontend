import {
    MapPin,
    Phone,
    Mail,
    ArrowUp
} from "lucide-react";

import {
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaLinkedin
} from "react-icons/fa";

function Footer() {
    const currentYear = new Date().getFullYear();

    const styles = {
        footer: {
            backgroundColor: '#0d0d0d',
            color: '#e5e5e5',
            padding: '50px 0 0 0',
            borderTop: '1px solid rgba(255,255,255,0.06)'
        },
        container: {
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '0 20px'
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: '30px',
            paddingBottom: '30px'
        },
        brandSection: {
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
        },
        logo: {
            fontSize: '24px',
            fontWeight: '700',
            color: '#ffffff',
            letterSpacing: '1px',
            margin: 0
        },
        brandDesc: {
            color: '#8a8a8a',
            fontSize: '13px',
            lineHeight: '1.6',
            maxWidth: '350px',
            margin: 0
        },
        socialIcons: {
            display: 'flex',
            gap: '10px',
            marginTop: '4px'
        },
        socialIcon: {
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            color: '#8a8a8a'
        },
        linksGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '30px'
        },
        linkGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
        },
        groupTitle: {
            color: '#ffffff',
            fontSize: '13px',
            fontWeight: '600',
            marginBottom: '6px',
            letterSpacing: '0.5px'
        },
        linkItem: {
            color: '#8a8a8a',
            fontSize: '12px',
            cursor: 'pointer',
            transition: 'color 0.3s ease',
            padding: '2px 0'
        },
        bottomBar: {
            borderTop: '1px solid rgba(255,255,255,0.06)',
            padding: '16px 0',
            marginTop: '10px'
        },
        bottomContainer: {
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '0 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px'
        },
        copyright: {
            color: '#6b6b6b',
            fontSize: '12px',
            margin: 0
        },
        backToTop: {
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: '#8a8a8a',
            fontSize: '12px',
            cursor: 'pointer',
            transition: 'color 0.3s ease',
            background: 'none',
            border: 'none',
            fontWeight: '600',
            letterSpacing: '0.5px'
        }
    };

    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr',
                    gap: '30px',
                    paddingBottom: '30px'
                }} className="md:grid-cols-2 lg:grid-cols-12">
                    
                    {/* Brand */}
                    <div className="lg:col-span-4">
                        <div style={styles.brandSection}>
                            <h2 style={styles.logo}>UGGISO</h2>
                            <p style={styles.brandDesc}>
                                Empowering food lovers with advanced results-oriented 
                                tools to improve dining experiences and patient outcomes.
                            </p>
                            <div style={styles.socialIcons}>
                                <div 
                                    style={styles.socialIcon}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#1877f2';
                                        e.currentTarget.style.borderColor = '#1877f2';
                                        e.currentTarget.style.color = '#ffffff';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                                        e.currentTarget.style.color = '#8a8a8a';
                                    }}
                                >
                                    <FaFacebook size={14} />
                                </div>
                                <div 
                                    style={styles.socialIcon}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#e4405f';
                                        e.currentTarget.style.borderColor = '#e4405f';
                                        e.currentTarget.style.color = '#ffffff';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                                        e.currentTarget.style.color = '#8a8a8a';
                                    }}
                                >
                                    <FaInstagram size={14} />
                                </div>
                                <div 
                                    style={styles.socialIcon}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#1da1f2';
                                        e.currentTarget.style.borderColor = '#1da1f2';
                                        e.currentTarget.style.color = '#ffffff';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                                        e.currentTarget.style.color = '#8a8a8a';
                                    }}
                                >
                                    <FaTwitter size={14} />
                                </div>
                                <div 
                                    style={styles.socialIcon}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#0a66c2';
                                        e.currentTarget.style.borderColor = '#0a66c2';
                                        e.currentTarget.style.color = '#ffffff';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                                        e.currentTarget.style.color = '#8a8a8a';
                                    }}
                                >
                                    <FaLinkedin size={14} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="lg:col-span-8">
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '30px'
                        }} className="sm:grid-cols-3">
                            
                            <div style={styles.linkGroup}>
                                <h4 style={styles.groupTitle}>Site Map</h4>
                                <span style={styles.linkItem}>Home</span>
                                <span style={styles.linkItem}>Restaurants</span>
                                <span style={styles.linkItem}>Offers</span>
                                <span style={styles.linkItem}>How It Works</span>
                            </div>

                            <div style={styles.linkGroup}>
                                <h4 style={styles.groupTitle}>Legal</h4>
                                <span style={styles.linkItem}>Privacy Policy</span>
                                <span style={styles.linkItem}>Terms of Services</span>
                                <span style={styles.linkItem}>Refund Policy</span>
                                <span style={styles.linkItem}>Cookie Policy</span>
                            </div>

                            <div style={styles.linkGroup}>
                                <h4 style={styles.groupTitle}>Information</h4>
                                <span style={styles.linkItem}>Careers</span>
                                <span style={styles.linkItem}>Contact Us</span>
                                <span style={styles.linkItem}>Partner Portal</span>
                                <span style={styles.linkItem}>Blog</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div style={styles.bottomBar}>
                <div style={styles.bottomContainer}>
                    <p style={styles.copyright}>
                        © {currentYear} UGGISO. All Rights Reserved.
                    </p>
                    <button 
                        style={styles.backToTop}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#f97316'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#8a8a8a'}
                    >
                        <ArrowUp size={14} />
                        BACK TO TOP
                    </button>
                </div>
            </div>
        </footer>
    );
}

export default Footer;