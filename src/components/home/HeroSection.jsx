  import React from 'react';
  import { Search, Star, Truck, Leaf, Ticket } from 'lucide-react';

  const Hero = ({ search, setSearch }) => {
    return (
      <section className="hero-section">
        <div className="hero-container">
          {/* Left Content */}
          <div className="hero-content">
            <div className="badge-wrapper">
              <span className="badge-icon">⭐</span>
              <span className="badge-text">Trusted by 10,000+ food lovers</span>
            </div>

            <h1 className="hero-title">
              You Can Eat Any
              <br />
              <span className="highlight">Tasty Food</span> You Like
            </h1>

            <p className="hero-subtitle">
              Discover amazing food delivered right to your doorstep.
            </p>

            {/* Search Bar */}
            <div className="search-wrapper">
              <Search className="search-icon" size={20} />
              <input
    type="text"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search for restaurants or dishes..."
    className="search-input"
  />
            </div>
          </div>

          {/* Right Image */}
          <div className="hero-image-wrapper">
            <div className="hero-image">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop"
                alt="Delicious food platter"
              />
              {/* Floating Badge */}
              <div className="floating-badge top-right">
                <span className="emoji">🍕</span>
                <div>
                  <strong>50+</strong>
                  <p>Restaurants</p>
                </div>
              </div>
              <div className="floating-badge bottom-left">
                <span className="emoji">⏱️</span>
                <div>
                  <strong>30 min</strong>
                  <p>Avg. Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <div className="feature-card">
            <div className="feature-icon truck">
              <Truck size={22} />
            </div>
            <div>
              <h4>Fast Home Delivery</h4>
              <p>Get your food in 30 minutes or less</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon leaf">
              <Leaf size={22} />
            </div>
            <div>
              <h4>Fresh Healthy Food</h4>
              <p>100% fresh ingredients, always</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon ticket">
              <Ticket size={22} />
            </div>
            <div>
              <h4>Discount Voucher</h4>
              <p>Save up to 40% on your first order</p>
            </div>
          </div>
        </div>

        <style jsx>{`
          .hero-section {
            background: linear-gradient(135deg, #fff8f0 0%, #ffffff 100%);
            padding: 40px 120px 20px 120px;
            min-height: 100vh;
            width: 100%;
          }

          .hero-container {
            max-width: 1600px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 100px;
            padding: 30px 0 50px 0;
            width: 100%;
          }

          /* LEFT CONTENT */
          .hero-content {
            flex: 1.3;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
            max-width: 700px;
          }

          .badge-wrapper {
            display: flex;
            align-items: center;
            gap: 8px;
            background: #fef3c7;
            padding: 8px 22px 8px 14px;
            border-radius: 50px;
            font-size: 14px;
            font-weight: 500;
            color: #92400e;
            margin-bottom: 24px;
          }

          .badge-icon {
            font-size: 16px;
          }

          .badge-text {
            font-size: 14px;
          }

          .hero-title {
            font-size: 68px;
            font-weight: 800;
            line-height: 1.1;
            margin: 0 0 16px 0;
            color: #1a1a1a;
            letter-spacing: -0.02em;
          }

          .highlight {
            background: linear-gradient(135deg, #f97316, #ea580c);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .hero-subtitle {
            font-size: 20px;
            color: #6b7280;
            line-height: 1.7;
            margin: 0 0 32px 0;
            max-width: 480px;
          }

          /* SEARCH */
          .search-wrapper {
            width: 100%;
            max-width: 560px;
            position: relative;
          }

          .search-icon {
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            color: #9ca3af;
          }

          .search-input {
            width: 100%;
            padding: 18px 24px 18px 56px;
            border: 2px solid #e5e7eb;
            border-radius: 60px;
            font-size: 16px;
            outline: none;
            transition: all 0.3s ease;
            background: white;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          }

          .search-input:focus {
            border-color: #f97316;
            box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.1);
          }

          .search-input::placeholder {
            color: #9ca3af;
          }

          /* RIGHT IMAGE */
          .hero-image-wrapper {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
          }

          .hero-image {
            position: relative;
            width: 100%;
            max-width: 900px;
          }

          .hero-image img {
            width: 100%;
            height: auto;
            border-radius: 30px;
            object-fit: cover;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
          }

          .floating-badge {
            position: absolute;
            background: white;
            padding: 14px 22px;
            border-radius: 18px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            gap: 14px;
            backdrop-filter: blur(8px);
            background: rgba(255, 255, 255, 0.95);
          }

          .floating-badge .emoji {
            font-size: 28px;
          }

          .floating-badge strong {
            font-size: 18px;
            color: #1a1a1a;
            display: block;
          }

          .floating-badge p {
            font-size: 13px;
            color: #6b7280;
            margin: 0;
          }

          .top-right {
            top: -15px;
            right: -15px;
          }

          .bottom-left {
            bottom: -15px;
            left: -15px;
          }

          /* FEATURES */
          .features-section {
            max-width: 1600px;
            margin: 50px auto 0 auto;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
            padding: 30px 0 0 0;
            border-top: 2px solid #f3f4f6;
          }

          .feature-card {
            display: flex;
            align-items: center;
            gap: 18px;
            padding: 20px 28px;
            border-radius: 18px;
            transition: all 0.3s ease;
            background: white;
          }

          .feature-card:hover {
            background: #fafafa;
            transform: translateY(-3px);
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
          }

          .feature-icon {
            width: 52px;
            height: 52px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }

          .feature-icon.truck {
            background: #fef3c7;
            color: #d97706;
          }

          .feature-icon.leaf {
            background: #d1fae5;
            color: #059669;
          }

          .feature-icon.ticket {
            background: #fce4ec;
            color: #dc2626;
          }

          .feature-card h4 {
            font-size: 17px;
            font-weight: 600;
            margin: 0 0 3px 0;
            color: #1a1a1a;
          }

          .feature-card p {
            font-size: 14px;
            color: #6b7280;
            margin: 0;
          }

          /* RESPONSIVE */
          @media (max-width: 1400px) {
            .hero-section {
              padding: 30px 80px 20px 80px;
            }

            .hero-container {
              gap: 60px;
            }

            .hero-title {
              font-size: 56px;
            }

            .hero-image {
              max-width: 550px;
            }
          }

          @media (max-width: 1200px) {
            .hero-section {
              padding: 30px 60px 20px 60px;
            }

            .hero-container {
              gap: 40px;
            }

            .hero-title {
              font-size: 48px;
            }

            .hero-content {
              max-width: 550px;
            }

            .hero-image {
              max-width: 480px;
            }
          }

          @media (max-width: 1024px) {
            .hero-section {
              padding: 30px 40px 20px 40px;
            }

            .hero-title {
              font-size: 40px;
            }

            .hero-content {
              max-width: 450px;
            }
          }

          @media (max-width: 768px) {
            .hero-section {
              padding: 20px 20px;
            }

            .hero-container {
              flex-direction: column;
              gap: 40px;
              padding: 10px 0;
            }

            .hero-content {
              align-items: center;
              text-align: center;
              max-width: 100%;
            }

            .hero-title {
              font-size: 36px;
            }

            .hero-subtitle {
              max-width: 100%;
              font-size: 17px;
            }

            .search-wrapper {
              max-width: 100%;
            }

            .hero-image-wrapper {
              width: 100%;
            }

            .hero-image {
              max-width: 100%;
            }

            .floating-badge {
              padding: 10px 16px;
            }

            .floating-badge .emoji {
              font-size: 20px;
            }

            .floating-badge strong {
              font-size: 15px;
            }

            .top-right {
              top: -10px;
              right: -10px;
            }

            .bottom-left {
              bottom: -10px;
              left: -10px;
            }

            .features-section {
              grid-template-columns: 1fr;
              gap: 14px;
              margin-top: 30px;
            }

            .feature-card {
              justify-content: center;
              padding: 16px 20px;
            }
          }

          @media (max-width: 480px) {
            .hero-title {
              font-size: 28px;
            }

            .badge-wrapper {
              font-size: 12px;
              padding: 4px 14px 4px 10px;
            }

            .search-input {
              padding: 14px 18px 14px 48px;
              font-size: 14px;
            }

            .feature-card h4 {
              font-size: 15px;
            }

            .feature-card p {
              font-size: 13px;
            }

            .floating-badge {
              padding: 8px 12px;
            }

            .floating-badge .emoji {
              font-size: 16px;
            }

            .floating-badge strong {
              font-size: 13px;
            }

            .floating-badge p {
              font-size: 11px;
            }
          }
        `}</style>
      </section>
    );
  };

  export default Hero;