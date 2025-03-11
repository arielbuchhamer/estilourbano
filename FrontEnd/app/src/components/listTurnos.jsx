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
                console.log(response.data);
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
        <div className=" max-w-4xl mx-auto p-6">
            <h2 className="text-center text-2xl font-semibold mb-6">Lista de Turnos</h2>

            {/* Buscar por ID */}
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    className="w-full p-2 border rounded-md outline-none"
                    placeholder="Buscar por ID"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                />
                <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                    onClick={handleSearch}
                >
                    Buscar
                </button>
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 text-left">ID</th>
                            <th className="py-2 px-4 text-left">Cliente</th>
                            <th className="py-2 px-4 text-left">Fecha</th>
                            <th className="py-2 px-4 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTurnos.map(turno => (
                            <tr key={turno.id} className="border-t">
                                <td className="py-2 px-4">{turno.id}</td>
                                <td className="py-2 px-4">{turno.cliente}</td>
                                <td className="py-2 px-4">{turno.fecha.toLocaleDateString()}</td>
                                <td className="py-2 px-4 text-center">
                                    <button 
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md mr-2"
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
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
                <ul className="flex space-x-2">
                    {[...Array(totalPages).keys()].map(number => (
                        <li key={number + 1}>
                            <button 
                                onClick={() => paginate(number + 1)}
                                className={`px-4 py-2 rounded-md ${currentPage === number + 1 ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"}`}
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
