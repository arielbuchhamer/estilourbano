package com.estilourbano.estilourbano.service;

import java.util.List;
import java.util.Optional;

public interface GenericService<T> {
	Optional<T> findById(Long id);
    List<T> findAll();
    T save(T entity);
    void delete(Long id);
}
