package com.estilourbano.estilourbano.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.estilourbano.estilourbano.model.Turno;

@Repository
public interface TurnoRepository extends MongoRepository<Turno, String> {

}
