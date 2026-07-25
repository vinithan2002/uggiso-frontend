import { useState } from "react";
import OwnerSidebar from "../components/restaurant/OwnerSidebar";

function OwnerLayout({ children }) {

    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="bg-gray-100 min-h-screen">

            <OwnerSidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            <main
                className="p-8 transition-all duration-300"
                style={{
                    marginLeft: collapsed ? "80px" : "280px"
                }}
            >
                {children}
            </main>

        </div>
    );
}

export default OwnerLayout;