package com.fratelli.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fratelli.domain.Colectivo;
import com.fratelli.service.ColectivoService;
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
 * REST controller for managing Colectivo.
 */
@RestController
@RequestMapping("/api")
public class ColectivoResource {

    private final Logger log = LoggerFactory.getLogger(ColectivoResource.class);

    private static final String ENTITY_NAME = "colectivo";

    private final ColectivoService colectivoService;

    public ColectivoResource(ColectivoService colectivoService) {
        this.colectivoService = colectivoService;
    }

    /**
     * POST  /colectivos : Create a new colectivo.
     *
     * @param colectivo the colectivo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new colectivo, or with status 400 (Bad Request) if the colectivo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/colectivos")
    @Timed
    public ResponseEntity<Colectivo> createColectivo(@RequestBody Colectivo colectivo) throws URISyntaxException {
        log.debug("REST request to save Colectivo : {}", colectivo);
        if (colectivo.getId() != null) {
            throw new BadRequestAlertException("A new colectivo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Colectivo result = colectivoService.save(colectivo);
        return ResponseEntity.created(new URI("/api/colectivos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /colectivos : Updates an existing colectivo.
     *
     * @param colectivo the colectivo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated colectivo,
     * or with status 400 (Bad Request) if the colectivo is not valid,
     * or with status 500 (Internal Server Error) if the colectivo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/colectivos")
    @Timed
    public ResponseEntity<Colectivo> updateColectivo(@RequestBody Colectivo colectivo) throws URISyntaxException {
        log.debug("REST request to update Colectivo : {}", colectivo);
        if (colectivo.getId() == null) {
            return createColectivo(colectivo);
        }
        Colectivo result = colectivoService.save(colectivo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, colectivo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /colectivos : get all the colectivos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of colectivos in body
     */
    @GetMapping("/colectivos")
    @Timed
    public List<Colectivo> getAllColectivos() {
        log.debug("REST request to get all Colectivos");
        return colectivoService.findAll();
        }

    /**
     * GET  /colectivos/:id : get the "id" colectivo.
     *
     * @param id the id of the colectivo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the colectivo, or with status 404 (Not Found)
     */
    @GetMapping("/colectivos/{id}")
    @Timed
    public ResponseEntity<Colectivo> getColectivo(@PathVariable Long id) {
        log.debug("REST request to get Colectivo : {}", id);
        Colectivo colectivo = colectivoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(colectivo));
    }

    /**
     * DELETE  /colectivos/:id : delete the "id" colectivo.
     *
     * @param id the id of the colectivo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/colectivos/{id}")
    @Timed
    public ResponseEntity<Void> deleteColectivo(@PathVariable Long id) {
        log.debug("REST request to delete Colectivo : {}", id);
        colectivoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
