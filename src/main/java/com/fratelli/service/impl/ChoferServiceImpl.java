package com.fratelli.service.impl;

import com.fratelli.service.ChoferService;
import com.fratelli.domain.Chofer;
import com.fratelli.repository.ChoferRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Chofer.
 */
@Service
@Transactional
public class ChoferServiceImpl implements ChoferService {

    private final Logger log = LoggerFactory.getLogger(ChoferServiceImpl.class);

    private final ChoferRepository choferRepository;

    public ChoferServiceImpl(ChoferRepository choferRepository) {
        this.choferRepository = choferRepository;
    }

    /**
     * Save a chofer.
     *
     * @param chofer the entity to save
     * @return the persisted entity
     */
    @Override
    public Chofer save(Chofer chofer) {
        log.debug("Request to save Chofer : {}", chofer);
        return choferRepository.save(chofer);
    }

    /**
     * Get all the chofers.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Chofer> findAll() {
        log.debug("Request to get all Chofers");
        return choferRepository.findAll();
    }

    /**
     * Get one chofer by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Chofer findOne(Long id) {
        log.debug("Request to get Chofer : {}", id);
        return choferRepository.findOne(id);
    }

    /**
     * Delete the chofer by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Chofer : {}", id);
        choferRepository.delete(id);
    }
}
