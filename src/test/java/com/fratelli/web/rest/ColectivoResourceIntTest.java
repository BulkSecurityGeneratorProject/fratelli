package com.fratelli.web.rest;

import com.fratelli.FratelliApp;

import com.fratelli.domain.Colectivo;
import com.fratelli.repository.ColectivoRepository;
import com.fratelli.service.ColectivoService;
import com.fratelli.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.fratelli.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ColectivoResource REST controller.
 *
 * @see ColectivoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FratelliApp.class)
public class ColectivoResourceIntTest {

    private static final Long DEFAULT_NUMERO_INTERNO = 1L;
    private static final Long UPDATED_NUMERO_INTERNO = 2L;

    @Autowired
    private ColectivoRepository colectivoRepository;

    @Autowired
    private ColectivoService colectivoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restColectivoMockMvc;

    private Colectivo colectivo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ColectivoResource colectivoResource = new ColectivoResource(colectivoService);
        this.restColectivoMockMvc = MockMvcBuilders.standaloneSetup(colectivoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Colectivo createEntity(EntityManager em) {
        Colectivo colectivo = new Colectivo()
            .numeroInterno(DEFAULT_NUMERO_INTERNO);
        return colectivo;
    }

    @Before
    public void initTest() {
        colectivo = createEntity(em);
    }

    @Test
    @Transactional
    public void createColectivo() throws Exception {
        int databaseSizeBeforeCreate = colectivoRepository.findAll().size();

        // Create the Colectivo
        restColectivoMockMvc.perform(post("/api/colectivos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(colectivo)))
            .andExpect(status().isCreated());

        // Validate the Colectivo in the database
        List<Colectivo> colectivoList = colectivoRepository.findAll();
        assertThat(colectivoList).hasSize(databaseSizeBeforeCreate + 1);
        Colectivo testColectivo = colectivoList.get(colectivoList.size() - 1);
        assertThat(testColectivo.getNumeroInterno()).isEqualTo(DEFAULT_NUMERO_INTERNO);
    }

    @Test
    @Transactional
    public void createColectivoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = colectivoRepository.findAll().size();

        // Create the Colectivo with an existing ID
        colectivo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restColectivoMockMvc.perform(post("/api/colectivos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(colectivo)))
            .andExpect(status().isBadRequest());

        // Validate the Colectivo in the database
        List<Colectivo> colectivoList = colectivoRepository.findAll();
        assertThat(colectivoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllColectivos() throws Exception {
        // Initialize the database
        colectivoRepository.saveAndFlush(colectivo);

        // Get all the colectivoList
        restColectivoMockMvc.perform(get("/api/colectivos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(colectivo.getId().intValue())))
            .andExpect(jsonPath("$.[*].numeroInterno").value(hasItem(DEFAULT_NUMERO_INTERNO.intValue())));
    }

    @Test
    @Transactional
    public void getColectivo() throws Exception {
        // Initialize the database
        colectivoRepository.saveAndFlush(colectivo);

        // Get the colectivo
        restColectivoMockMvc.perform(get("/api/colectivos/{id}", colectivo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(colectivo.getId().intValue()))
            .andExpect(jsonPath("$.numeroInterno").value(DEFAULT_NUMERO_INTERNO.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingColectivo() throws Exception {
        // Get the colectivo
        restColectivoMockMvc.perform(get("/api/colectivos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateColectivo() throws Exception {
        // Initialize the database
        colectivoService.save(colectivo);

        int databaseSizeBeforeUpdate = colectivoRepository.findAll().size();

        // Update the colectivo
        Colectivo updatedColectivo = colectivoRepository.findOne(colectivo.getId());
        // Disconnect from session so that the updates on updatedColectivo are not directly saved in db
        em.detach(updatedColectivo);
        updatedColectivo
            .numeroInterno(UPDATED_NUMERO_INTERNO);

        restColectivoMockMvc.perform(put("/api/colectivos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedColectivo)))
            .andExpect(status().isOk());

        // Validate the Colectivo in the database
        List<Colectivo> colectivoList = colectivoRepository.findAll();
        assertThat(colectivoList).hasSize(databaseSizeBeforeUpdate);
        Colectivo testColectivo = colectivoList.get(colectivoList.size() - 1);
        assertThat(testColectivo.getNumeroInterno()).isEqualTo(UPDATED_NUMERO_INTERNO);
    }

    @Test
    @Transactional
    public void updateNonExistingColectivo() throws Exception {
        int databaseSizeBeforeUpdate = colectivoRepository.findAll().size();

        // Create the Colectivo

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restColectivoMockMvc.perform(put("/api/colectivos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(colectivo)))
            .andExpect(status().isCreated());

        // Validate the Colectivo in the database
        List<Colectivo> colectivoList = colectivoRepository.findAll();
        assertThat(colectivoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteColectivo() throws Exception {
        // Initialize the database
        colectivoService.save(colectivo);

        int databaseSizeBeforeDelete = colectivoRepository.findAll().size();

        // Get the colectivo
        restColectivoMockMvc.perform(delete("/api/colectivos/{id}", colectivo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Colectivo> colectivoList = colectivoRepository.findAll();
        assertThat(colectivoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Colectivo.class);
        Colectivo colectivo1 = new Colectivo();
        colectivo1.setId(1L);
        Colectivo colectivo2 = new Colectivo();
        colectivo2.setId(colectivo1.getId());
        assertThat(colectivo1).isEqualTo(colectivo2);
        colectivo2.setId(2L);
        assertThat(colectivo1).isNotEqualTo(colectivo2);
        colectivo1.setId(null);
        assertThat(colectivo1).isNotEqualTo(colectivo2);
    }
}
