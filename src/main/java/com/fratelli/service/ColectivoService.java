package com.fratelli.service;

import com.fratelli.domain.Colectivo;
import java.util.List;

/**
 * Service Interface for managing Colectivo.
 */
public interface ColectivoService {

    /**
     * Save a colectivo.
     *
     * @param colectivo the entity to save
     * @return the persisted entity
     */
    Colectivo save(Colectivo colectivo);

    /**
     * Get all the colectivos.
     *
     * @return the list of entities
     */
    List<Colectivo> findAll();

    /**
     * Get the "id" colectivo.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Colectivo findOne(Long id);

    /**
     * Delete the "id" colectivo.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
