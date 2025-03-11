import axios from "axios";

const API_URL = ""; // Link backend

class TurnoService {
  getAllTurnos() {
    return axios.get(API_URL);
  }

  getTurnoById(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  createTurno(turno) {
    return axios.post(API_URL, turno, {
      headers: { "Content-Type": "application/json" },
    });
  }

  updateTurno(id, turno) {
    return axios.put(`${API_URL}/${id}`, turno, {
      headers: { "Content-Type": "application/json" },
    });
  }

  deleteTurno(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
}

export default new TurnoService();
