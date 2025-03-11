import { Link } from "react-router-dom";
import { FaCut } from "react-icons/fa";

const Header = () => {
    return (
        <header className="bg-gray-900 text-white py-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center px-4">
                <div className="flex items-center gap-2">
                    <FaCut className="text-red-500 text-2xl" />
                    <h1 className="text-2xl font-bold tracking-wide">EstiloUrbano</h1>
                </div>

                <nav>
                    <ul className="flex space-x-6 text-lg">
                        <li>
                            <Link to="/" className="hover:text-red-400 transition">
                               
                            </Link>
                        </li>
                    </ul>
                </nav>

                <Link
                    to="/agregar-turno"
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition"
                >
                    Agendar Turno
                </Link>
            </div>
        </header>
    );
};

export default Header;
