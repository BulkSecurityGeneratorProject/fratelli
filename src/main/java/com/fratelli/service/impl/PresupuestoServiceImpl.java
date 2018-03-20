package com.fratelli.service.impl;

import com.fratelli.service.PresupuestoService;
import com.fratelli.domain.Presupuesto;
import com.fratelli.repository.PresupuestoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Presupuesto.
 */
@Service
@Transactional
public class PresupuestoServiceImpl implements PresupuestoService{

    private final Logger log = LoggerFactory.getLogger(PresupuestoServiceImpl.class);

    private final PresupuestoRepository presupuestoRepository;

    public PresupuestoServiceImpl(PresupuestoRepository presupuestoRepository) {
        this.presupuestoRepository = presupuestoRepository;
    }

    /**
     * Save a presupuesto.
     *
     * @param presupuesto the entity to save
     * @return the persisted entity
     */
    @Override
    public Presupuesto save(Presupuesto presupuesto) {
        log.debug("Request to save Presupuesto : {}", presupuesto);
        return presupuestoRepository.save(presupuesto);
    }

    /**
     *  Get all the presupuestos.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Presupuesto> findAll() {
        log.debug("Request to get all Presupuestos");
        return presupuestoRepository.findAll();
    }

    /**
     *  Get one presupuesto by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Presupuesto findOne(Long id) {
        log.debug("Request to get Presupuesto : {}", id);
        return presupuestoRepository.findOne(id);
    }

    /**
     *  Delete the  presupuesto by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Presupuesto : {}", id);
        presupuestoRepository.delete(id);
    }
}
