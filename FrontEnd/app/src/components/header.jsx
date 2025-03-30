import { Link } from "react-router-dom";
import { Home, BarChart2, Menu, X } from "lucide-react";

const Header = ({ menuOpen, setMenuOpen }) => {
    // Función para alternar el menú
    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <>
            {/* Botón de menú hamburguesa SOLO en móviles */}
            <button 
                onClick={toggleMenu} 
                className="fixed top-4 left-4 z-50 bg-blue-600 p-2 rounded-md hover:bg-blue-700 transition lg:hidden"
            >
                {menuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>

            {/* Overlay en móviles */}
            {menuOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={toggleMenu} // Cierra el menú si se hace clic fuera
                ></div>
            )}

            {/* Sidebar */}
            <aside 
                className={`fixed top-0 left-0 w-64 h-screen bg-[#0F172A] text-white p-4 shadow-lg z-50 transition-transform duration-300 
                    flex flex-col
                    ${menuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:w-64`}
            >
                {/* Encabezado con Logo */}
                <div className="flex items-center gap-3 mb-6">
                    <img 
                        src="/assets/img/poste-de-barbero.png" 
                        alt="Logo Estilo Urbano" 
                        className="h-10 w-auto"
                    />
                    <h1 className="text-2xl font-[Rubik_Wet_Paint] tracking-wide text-[var(--color-accent)]">
                        Estilo Urbano
                    </h1>
                </div>

                {/* Menú de navegación */}
                <nav className="flex flex-col gap-2 flex-1">
                    <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#1E293B] transition">
                        <Home className="w-6 h-6" />
                        <span className="text-lg font-medium">Inicio</span>
                    </Link>
                    <Link to="/estadisticas" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#1E293B] transition">
                        <BarChart2 className="w-6 h-6" />
                        <span className="text-lg font-medium">Estadísticas</span>
                    </Link>
                </nav>

                {/* Botón Agendar Turno */}
                <Link 
                    to="/agregar-turno"
                    className="mt-auto bg-[#155dfc] hover:bg-[#71829b] text-white px-5 py-2 rounded-lg shadow-lg transition duration-300 text-center"
                >
                    Agendar Turno
                </Link>
            </aside>
        </>
    );
};

export default Header;

