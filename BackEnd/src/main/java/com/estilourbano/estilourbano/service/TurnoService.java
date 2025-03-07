package com.estilourbano.estilourbano.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.estilourbano.estilourbano.model.Turno;
import com.estilourbano.estilourbano.repository.TurnoRepository;

;

@Service
@Transactional
public class TurnoService implements GenericService<Turno>{

	private final TurnoRepository turnoRepository;
	
	@Autowired
	public TurnoService(TurnoRepository turnoRepository) {
		this.turnoRepository = turnoRepository;
	}
	
	@Override
	public Optional<Turno> findById(Long id) {
		// TODO Auto-generated method stub
		return turnoRepository.findById(id);
	}

	@Override
	public List<Turno> findAll() {
		// TODO Auto-generated method stub
		return turnoRepository.findAll();
	}

	@Override
	public Turno save(Turno entity) {
		return turnoRepository.save(entity);
	}

	@Override
	public void delete(Long id) {
		turnoRepository.deleteById(id);
	}

}
