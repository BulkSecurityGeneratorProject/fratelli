package com.fratelli.service;

import com.fratelli.domain.Presupuesto;
import java.util.List;

/**
 * Service Interface for managing Presupuesto.
 */
public interface PresupuestoService {

    /**
     * Save a presupuesto.
     *
     * @param presupuesto the entity to save
     * @return the persisted entity
     */
    Presupuesto save(Presupuesto presupuesto);

    /**
     * Get all the presupuestos.
     *
     * @return the list of entities
     */
    List<Presupuesto> findAll();

    /**
     * Get the "id" presupuesto.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Presupuesto findOne(Long id);

    /**
     * Delete the "id" presupuesto.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
