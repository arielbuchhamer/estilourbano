import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="bg-[#1E1E1E] text-[#EAEAEA] py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center px-6">
                {/* Logo personalizado */}
                <div className="flex items-center gap-3">
                    <img 
                        src="/assets/img/poste-de-barbero.png" 
                        alt="Logo Estilo Urbano" 
                        className="h-12 w-auto"
                    />
                    <h1 className="text-3xl font-[Rubik_Wet_Paint] tracking-wide text-[var(--color-accent)]">
                        Estilo Urbano
                    </h1>

                </div>

                {/* Botón Agendar Turno */}
                <Link
                    to="/agregar-turno"
                    className="bg-[#155dfc] hover:bg-[#71829b] text-white px-5 py-2 rounded-lg shadow-lg transition duration-300"
                >
                    Agendar Turno
                </Link>
            </div>
        </header>
    );
};

export default Header;
