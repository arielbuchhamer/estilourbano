package com.estilourbano.estilourbano.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.estilourbano.estilourbano.model.Turno;
import com.estilourbano.estilourbano.service.TurnoService;

@RestController
@RequestMapping("/turnos")
public class TurnoController {
	@Autowired
    private TurnoService turnoService;
	
	@PostMapping
	public Turno crearTurno(@RequestBody Turno turno) {
		return turnoService.save(turno);
	}
	
	@GetMapping
    public List<Turno> obtenerTurnos() {
        return turnoService.findAll();
    }
}
