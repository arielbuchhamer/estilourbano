package com.estilourbano.estilourbano.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.estilourbano.estilourbano.model.Turno;
import com.estilourbano.estilourbano.service.TurnoService;

@RestController
@RequestMapping("/turnos")
public class TurnoController {
	@Autowired
    private TurnoService turnoService;
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Turno crearTurno(@RequestBody Turno turno) {
		return turnoService.save(turno);
	}
	
	@GetMapping
    public List<Turno> obtenerTurnos() {
        return turnoService.findAll();
    }
	
	@GetMapping("/{id}")
	public Optional<Turno> TurnoById(@PathVariable String id) {
        return turnoService.findById(id);
    }
	
	@DeleteMapping("/{id}")
	public void eliminarTurno(@PathVariable String id) {
		turnoService.delete(id);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Turno> actualizarTurno(@PathVariable String id, @RequestBody Turno nuevoTurno) {
	    Turno turnoActualizado = turnoService.updateTurno(id, nuevoTurno);
	    return ResponseEntity.ok(turnoActualizado);
	}
}
