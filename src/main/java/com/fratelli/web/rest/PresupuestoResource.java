package com.fratelli.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fratelli.domain.Presupuesto;
import com.fratelli.service.PresupuestoService;
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
 * REST controller for managing Presupuesto.
 */
@RestController
@RequestMapping("/api")
public class PresupuestoResource {

    private final Logger log = LoggerFactory.getLogger(PresupuestoResource.class);

    private static final String ENTITY_NAME = "presupuesto";

    private final PresupuestoService presupuestoService;

    public PresupuestoResource(PresupuestoService presupuestoService) {
        this.presupuestoService = presupuestoService;
    }

    /**
     * POST  /presupuestos : Create a new presupuesto.
     *
     * @param presupuesto the presupuesto to create
     * @return the ResponseEntity with status 201 (Created) and with body the new presupuesto, or with status 400 (Bad Request) if the presupuesto has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/presupuestos")
    @Timed
    public ResponseEntity<Presupuesto> createPresupuesto(@RequestBody Presupuesto presupuesto) throws URISyntaxException {
        log.debug("REST request to save Presupuesto : {}", presupuesto);
        if (presupuesto.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new presupuesto cannot already have an ID")).body(null);
        }
        Presupuesto result = presupuestoService.save(presupuesto);
        return ResponseEntity.created(new URI("/api/presupuestos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /presupuestos : Updates an existing presupuesto.
     *
     * @param presupuesto the presupuesto to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated presupuesto,
     * or with status 400 (Bad Request) if the presupuesto is not valid,
     * or with status 500 (Internal Server Error) if the presupuesto couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/presupuestos")
    @Timed
    public ResponseEntity<Presupuesto> updatePresupuesto(@RequestBody Presupuesto presupuesto) throws URISyntaxException {
        log.debug("REST request to update Presupuesto : {}", presupuesto);
        if (presupuesto.getId() == null) {
            return createPresupuesto(presupuesto);
        }
        Presupuesto result = presupuestoService.save(presupuesto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, presupuesto.getId().toString()))
            .body(result);
    }

    /**
     * GET  /presupuestos : get all the presupuestos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of presupuestos in body
     */
    @GetMapping("/presupuestos")
    @Timed
    public List<Presupuesto> getAllPresupuestos() {
        log.debug("REST request to get all Presupuestos");
        return presupuestoService.findAll();
        }

    /**
     * GET  /presupuestos/:id : get the "id" presupuesto.
     *
     * @param id the id of the presupuesto to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the presupuesto, or with status 404 (Not Found)
     */
    @GetMapping("/presupuestos/{id}")
    @Timed
    public ResponseEntity<Presupuesto> getPresupuesto(@PathVariable Long id) {
        log.debug("REST request to get Presupuesto : {}", id);
        Presupuesto presupuesto = presupuestoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(presupuesto));
    }

    /**
     * DELETE  /presupuestos/:id : delete the "id" presupuesto.
     *
     * @param id the id of the presupuesto to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/presupuestos/{id}")
    @Timed
    public ResponseEntity<Void> deletePresupuesto(@PathVariable Long id) {
        log.debug("REST request to delete Presupuesto : {}", id);
        presupuestoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
