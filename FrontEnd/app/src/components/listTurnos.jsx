import React, { useEffect, useState } from 'react';
import TurnoService from '../service/TurnoService';

const ListTurnos = () => {
    const [turnos, setTurnos] = useState([]);
    const [searchId, setSearchId] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const turnosPerPage = 8;

    useEffect(() => {
        listarTurnos();
    }, []);

    const listarTurnos = () => {
        TurnoService.getAllTurnos()
            .then(response => {
                const turnosWithFormattedDates = response.data.map(turno => ({
                    ...turno,
                    fecha: new Date(turno.fecha)
                }));
                setTurnos(turnosWithFormattedDates);
            })
            .catch(error => console.error('Error fetching turnos:', error));
    };

    const handleSearch = () => {
        if (!searchId) {
            alert('Por favor ingresa un ID');
            return;
        }
        TurnoService.getTurnoById(searchId)
            .then(response => {
                const turno = response.data;
                if (turno) {
                    alert(`ID: ${turno.id}\nCliente: ${turno.cliente}\nFecha: ${new Date(turno.fecha).toLocaleDateString()}`);
                } else {
                    alert('Turno no encontrado');
                }
            })
            .catch(error => {
                console.error('Error fetching turno:', error);
                alert('Error al buscar el turno');
            });
    };

    // Paginación
    const indexOfLastTurno = currentPage * turnosPerPage;
    const indexOfFirstTurno = indexOfLastTurno - turnosPerPage;
    const currentTurnos = turnos.slice(indexOfFirstTurno, indexOfLastTurno);
    const totalPages = Math.ceil(turnos.length / turnosPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Eliminar turno
    const deleteTurno = (id) => {
        TurnoService.deleteTurno(id)
            .then(() => listarTurnos())
            .catch(error => console.log(error));
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-center text-2xl font-semibold mb-6">Lista de Turnos</h2>

            {/* Buscar por ID */}
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    className="w-full p-2 border border-gray-700 rounded-md outline-none focus:ring-2 focus:ring-blue-600 bg-gray-800 text-white"
                    placeholder="Buscar por ID"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()} // Buscar con Enter
                />
                <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-all duration-200"
                    onClick={handleSearch}
                >
                    Buscar
                </button>
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-700 shadow-lg rounded-lg">
                    <thead className="bg-gray-900 text-white">
                        <tr>
                            <th className="py-3 px-4 text-left">ID</th>
                            <th className="py-3 px-4 text-left">Cliente</th>
                            <th className="py-3 px-4 text-left">Fecha</th>
                            <th className="py-3 px-4 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTurnos.map(turno => (
                            <tr key={turno.id} className="border-t border-gray-700 even:bg-gray-800">
                                <td className="py-3 px-4">{turno.id}</td>
                                <td className="py-3 px-4">{turno.cliente}</td>
                                <td className="py-3 px-4">{turno.fecha.toLocaleDateString()}</td>
                                <td className="py-3 px-4 text-center">
                                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition-all duration-200 mr-2">
                                        Editar
                                    </button>
                                    <button 
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-all duration-200"
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
            <div className="flex justify-center mt-4">
                <ul className="flex space-x-2 flex-wrap">
                    {[...Array(totalPages).keys()].map(number => (
                        <li key={number + 1}>
                            <button 
                                onClick={() => paginate(number + 1)}
                                className={`px-4 py-2 rounded-md cursor-pointer transition-all duration-200 ${currentPage === number + 1 ? "bg-blue-600 text-white scale-105" : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105"}`}
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
