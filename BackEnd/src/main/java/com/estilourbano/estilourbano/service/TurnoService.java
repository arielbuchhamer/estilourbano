package com.estilourbano.estilourbano.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.estilourbano.estilourbano.model.Turno;
import com.estilourbano.estilourbano.repository.TurnoRepository;

@Service
@Transactional
public class TurnoService implements GenericService<Turno>{

	private final TurnoRepository turnoRepository;
	
	@Autowired
	public TurnoService(TurnoRepository turnoRepository) {
		this.turnoRepository = turnoRepository;
	}
	
	@Override
	public Optional<Turno> findById(String id) {
		return turnoRepository.findById(id);
	}

	@Override
	public List<Turno> findAll() {
		return turnoRepository.findAll();
	}

	@Override
	public Turno save(Turno entity) {
		entity.setId(UUID.randomUUID().toString().split("-")[0]);
		return turnoRepository.save(entity);
	}

	@Override
	public void delete(String id) {
		turnoRepository.deleteById(id);
	}
	
	public Turno updateTurno(String id, Turno nuevoTurno) {
        return turnoRepository.findById(id)
                .map(turnoExistente -> {
                    turnoExistente.setCliente(nuevoTurno.getCliente());
                    turnoExistente.setFecha(nuevoTurno.getFecha());
                    return turnoRepository.save(turnoExistente);
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Turno no encontrado"));
    }

}
