package com.fratelli.service.impl;

import com.fratelli.service.ColectivoService;
import com.fratelli.domain.Colectivo;
import com.fratelli.repository.ColectivoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Colectivo.
 */
@Service
@Transactional
public class ColectivoServiceImpl implements ColectivoService{

    private final Logger log = LoggerFactory.getLogger(ColectivoServiceImpl.class);

    private final ColectivoRepository colectivoRepository;

    public ColectivoServiceImpl(ColectivoRepository colectivoRepository) {
        this.colectivoRepository = colectivoRepository;
    }

    /**
     * Save a colectivo.
     *
     * @param colectivo the entity to save
     * @return the persisted entity
     */
    @Override
    public Colectivo save(Colectivo colectivo) {
        log.debug("Request to save Colectivo : {}", colectivo);
        return colectivoRepository.save(colectivo);
    }

    /**
     *  Get all the colectivos.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Colectivo> findAll() {
        log.debug("Request to get all Colectivos");
        return colectivoRepository.findAll();
    }

    /**
     *  Get one colectivo by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Colectivo findOne(Long id) {
        log.debug("Request to get Colectivo : {}", id);
        return colectivoRepository.findOne(id);
    }

    /**
     *  Delete the  colectivo by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Colectivo : {}", id);
        colectivoRepository.delete(id);
    }
}
