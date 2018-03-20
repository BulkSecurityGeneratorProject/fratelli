package com.fratelli.service;

import com.fratelli.domain.Chofer;
import java.util.List;

/**
 * Service Interface for managing Chofer.
 */
public interface ChoferService {

    /**
     * Save a chofer.
     *
     * @param chofer the entity to save
     * @return the persisted entity
     */
    Chofer save(Chofer chofer);

    /**
     * Get all the chofers.
     *
     * @return the list of entities
     */
    List<Chofer> findAll();

    /**
     * Get the "id" chofer.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Chofer findOne(Long id);

    /**
     * Delete the "id" chofer.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
