package com.estilourbano.estilourbano.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.estilourbano.estilourbano.model.Turno;

@Repository
public interface TurnoRepository extends JpaRepository<Turno, Long> {

}
