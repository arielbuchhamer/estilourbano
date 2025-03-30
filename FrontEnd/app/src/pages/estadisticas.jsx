import Header from "../components/header";
import React, { useState } from "react";


const Estadisticas = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="flex h-screen bg-[var(--color-bg)] text-white">
            {/* Sidebar (menú lateral) */}
            <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

            {/* Contenido principal */}
            <main 
                className={`flex-1 p-6 transition-all duration-300 
                    ${menuOpen ? "blur-sm lg:blur-0" : ""} lg:ml-64`}
            >   <div className="text-center">
                    <h1>proximamente</h1>
                </div>
                
            </main>
        </div>
    );
};

export default Estadisticas;