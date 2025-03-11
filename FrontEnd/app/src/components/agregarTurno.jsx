import React, { useState, useEffect } from 'react';
import TurnoService from '../service/TurnoService';
import { useNavigate, useParams } from 'react-router-dom';

const AgregarTurno = () => {
    const [cliente, setCliente] = useState('');
    const [fecha, setFecha] = useState('');
    const { id } = useParams(); // Si hay un ID en la URL, significa que estamos editando un turno
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            TurnoService.getTurnoById(id)
                .then(response => {
                    const turno = response.data;
                    setCliente(turno.cliente);
                    setFecha(turno.fecha);
                })
                .catch(error => console.error('Error al obtener el turno:', error));
        }
    }, [id]);

    const saveTurno = (e) => {
        e.preventDefault();
        const turno = { id: id ? parseInt(id) : null, cliente, fecha };

        if (id) {
            // Actualizar turno existente
            TurnoService.updateTurno(turno)
                .then(() => {
                    alert('Turno actualizado correctamente');
                    navigate('/');
                })
                .catch(error => console.error('Error al actualizar el turno:', error));
        } else {
            // Registrar nuevo turno
            TurnoService.createTurno(turno)
                .then(() => {
                    alert('Turno registrado correctamente');
                    navigate('/');
                })
                .catch(error => console.error('Error al registrar el turno:', error));
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-center text-2xl font-semibold mb-6">{id ? 'Editar Turno' : 'Agendar Turno'}</h2>
            <form onSubmit={saveTurno}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Cliente</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md outline-none"
                        placeholder="Nombre del cliente"
                        value={cliente}
                        onChange={(e) => setCliente(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Fecha</label>
                    <input
                        type="datetime-local"
                        className="w-full p-2 border rounded-md outline-none"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                    />
                </div>

                <div className="flex justify-between">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                        {id ? 'Actualizar' : 'Registrar'}
                    </button>
                    <button type="button" onClick={() => navigate('/')} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AgregarTurno;
