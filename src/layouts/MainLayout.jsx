import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

function MainLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">

            {/* Navbar */}

            <Navbar />

            {/* Main Content */}

            <main className="flex-1">

                {children}

            </main>

            {/* Footer */}

            <Footer />

        </div>
    );
}

export default MainLayout;