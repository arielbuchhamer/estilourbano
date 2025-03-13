import React, { useEffect, useState } from "react";
import TurnoService from "../service/TurnoService";

const ListTurnos = () => {
    const [turnos, setTurnos] = useState([]);
    const [searchId, setSearchId] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const turnosPerPage = 10;

    useEffect(() => {
        listarTurnos();
    }, []);

    const listarTurnos = () => {
        TurnoService.getAllTurnos()
            .then((response) => {
                const turnosWithFormattedDates = response.data.map((turno) => ({
                    ...turno,
                    fecha: new Date(turno.fecha),
                }));
                setTurnos(turnosWithFormattedDates);
            })
            .catch((error) => console.error("Error fetching turnos:", error));
    };

    const handleSearch = () => {
        if (!searchId) {
            alert("Por favor ingresa un ID");
            return;
        }
        TurnoService.getTurnoById(searchId)
            .then((response) => {
                const turno = response.data;
                if (turno) {
                    alert(
                        `ID: ${turno.id}\nCliente: ${turno.cliente}\nFecha: ${new Date(turno.fecha).toLocaleDateString()}`
                    );
                } else {
                    alert("Turno no encontrado");
                }
            })
            .catch((error) => {
                console.error("Error fetching turno:", error);
                alert("Error al buscar el turno");
            });
    };

    const indexOfLastTurno = currentPage * turnosPerPage;
    const indexOfFirstTurno = indexOfLastTurno - turnosPerPage;
    const currentTurnos = turnos.slice(indexOfFirstTurno, indexOfLastTurno);
    const totalPages = Math.ceil(turnos.length / turnosPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const deleteTurno = (id) => {
        TurnoService.deleteTurno(id)
            .then(() => listarTurnos())
            .catch((error) => console.log(error));
    };

    return (
        <div className="flex flex-col items-center w-full h-full p- sm:p-8 ">
            <h2 className="text-center text-2xl sm:mt-6 sm:text-3xl font-bold mb-4 sm:mb-6">Lista de Turnos</h2>

            {/* Buscar por ID */}
            <div className="flex flex-col sm:flex-row gap-2 mb-4 sm:mb-6 w-full max-w-md">
                <input
                    type="text"
                    className="flex-1 p-2 sm:p-3 border border-gray-700 rounded-md outline-none focus:ring-2 focus:ring-blue-600 bg-gray-800 text-white"
                    placeholder="Buscar por ID"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-5 py-2 sm:py-3 rounded-md transition-all duration-200"
                    onClick={handleSearch}
                >
                    Buscar
                </button>
            </div>

            {/* Tabla responsiva */}
            <div className="w-full max-w-4xl overflow-x-auto">
                <table className="w-full border-collapse border border-gray-700 text-sm sm:text-lg">
                    <thead className="bg-gray-900 text-white">
                        <tr>
                            <th className="py-2 sm:py-4 px-2 sm:px-6 text-left">ID</th>
                            <th className="py-2 sm:py-4 px-2 sm:px-6 text-left">Cliente</th>
                            <th className="py-2 sm:py-4 px-2 sm:px-6 text-left">Fecha</th>
                            <th className="py-2 sm:py-4 px-2 sm:px-6 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTurnos.map((turno) => (
                            <tr key={turno.id} className="border-t border-gray-700 even:bg-gray-800 text-sm sm:text-lg">
                                <td className="py-2 sm:py-4 px-2 sm:px-6">{turno.id}</td>
                                <td className="py-2 sm:py-4 px-2 sm:px-6">{turno.cliente}</td>
                                <td className="py-2 sm:py-4 px-2 sm:px-6">{turno.fecha.toLocaleDateString()}</td>
                                <td className="py-2 sm:py-4 px-2 sm:px-6 text-center">
                                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 sm:px-5 py-1 sm:py-2 rounded-md transition-all duration-200 mr-2 sm:mr-3">
                                        Editar
                                    </button>
                                    <button
                                        className="bg-red-600 hover:bg-red-700 text-white px-3 sm:px-5 py-1 sm:py-2 rounded-md transition-all duration-200"
                                        onClick={() => deleteTurno(turno.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            <div className="flex justify-center mt-4 sm:mt-6">
                <ul className="flex space-x-1 sm:space-x-3 flex-wrap">
                    {[...Array(totalPages).keys()].map((number) => (
                        <li key={number + 1}>
                            <button
                                onClick={() => paginate(number + 1)}
                                className={`px-3 sm:px-5 py-2 sm:py-3 rounded-md cursor-pointer transition-all duration-200 ${
                                    currentPage === number + 1
                                        ? "bg-blue-600 text-white scale-105"
                                        : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105"
                                }`}
                            >
                                {number + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ListTurnos;
