import axios from 'axios';

const TURNO_BASE_RES_API_URL = "http://localhost:8090/turnos"; 

class TurnoService {
    getAllTurnos() {
        return axios.get(TURNO_BASE_RES_API_URL);
    }

    createTurno(turno) {
        return axios.post(TURNO_BASE_RES_API_URL, turno, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

export default new TurnoService();
