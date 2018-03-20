package com.fratelli.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fratelli.domain.Chofer;
import com.fratelli.service.ChoferService;
import com.fratelli.web.rest.errors.BadRequestAlertException;
import com.fratelli.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Chofer.
 */
@RestController
@RequestMapping("/api")
public class ChoferResource {

    private final Logger log = LoggerFactory.getLogger(ChoferResource.class);

    private static final String ENTITY_NAME = "chofer";

    private final ChoferService choferService;

    public ChoferResource(ChoferService choferService) {
        this.choferService = choferService;
    }

    /**
     * POST  /chofers : Create a new chofer.
     *
     * @param chofer the chofer to create
     * @return the ResponseEntity with status 201 (Created) and with body the new chofer, or with status 400 (Bad Request) if the chofer has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/chofers")
    @Timed
    public ResponseEntity<Chofer> createChofer(@RequestBody Chofer chofer) throws URISyntaxException {
        log.debug("REST request to save Chofer : {}", chofer);
        if (chofer.getId() != null) {
            throw new BadRequestAlertException("A new chofer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Chofer result = choferService.save(chofer);
        return ResponseEntity.created(new URI("/api/chofers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /chofers : Updates an existing chofer.
     *
     * @param chofer the chofer to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated chofer,
     * or with status 400 (Bad Request) if the chofer is not valid,
     * or with status 500 (Internal Server Error) if the chofer couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/chofers")
    @Timed
    public ResponseEntity<Chofer> updateChofer(@RequestBody Chofer chofer) throws URISyntaxException {
        log.debug("REST request to update Chofer : {}", chofer);
        if (chofer.getId() == null) {
            return createChofer(chofer);
        }
        Chofer result = choferService.save(chofer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, chofer.getId().toString()))
            .body(result);
    }

    /**
     * GET  /chofers : get all the chofers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of chofers in body
     */
    @GetMapping("/chofers")
    @Timed
    public List<Chofer> getAllChofers() {
        log.debug("REST request to get all Chofers");
        return choferService.findAll();
        }

    /**
     * GET  /chofers/:id : get the "id" chofer.
     *
     * @param id the id of the chofer to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the chofer, or with status 404 (Not Found)
     */
    @GetMapping("/chofers/{id}")
    @Timed
    public ResponseEntity<Chofer> getChofer(@PathVariable Long id) {
        log.debug("REST request to get Chofer : {}", id);
        Chofer chofer = choferService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(chofer));
    }

    /**
     * DELETE  /chofers/:id : delete the "id" chofer.
     *
     * @param id the id of the chofer to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/chofers/{id}")
    @Timed
    public ResponseEntity<Void> deleteChofer(@PathVariable Long id) {
        log.debug("REST request to delete Chofer : {}", id);
        choferService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
