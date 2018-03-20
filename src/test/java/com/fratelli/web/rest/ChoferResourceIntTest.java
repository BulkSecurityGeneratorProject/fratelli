package com.fratelli.web.rest;

import com.fratelli.FratelliApp;

import com.fratelli.domain.Chofer;
import com.fratelli.repository.ChoferRepository;
import com.fratelli.service.ChoferService;
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
 * Test class for the ChoferResource REST controller.
 *
 * @see ChoferResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FratelliApp.class)
public class ChoferResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final Long DEFAULT_LEGAJO = 1L;
    private static final Long UPDATED_LEGAJO = 2L;

    @Autowired
    private ChoferRepository choferRepository;

    @Autowired
    private ChoferService choferService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restChoferMockMvc;

    private Chofer chofer;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ChoferResource choferResource = new ChoferResource(choferService);
        this.restChoferMockMvc = MockMvcBuilders.standaloneSetup(choferResource)
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
    public static Chofer createEntity(EntityManager em) {
        Chofer chofer = new Chofer()
            .nombre(DEFAULT_NOMBRE)
            .legajo(DEFAULT_LEGAJO);
        return chofer;
    }

    @Before
    public void initTest() {
        chofer = createEntity(em);
    }

    @Test
    @Transactional
    public void createChofer() throws Exception {
        int databaseSizeBeforeCreate = choferRepository.findAll().size();

        // Create the Chofer
        restChoferMockMvc.perform(post("/api/chofers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chofer)))
            .andExpect(status().isCreated());

        // Validate the Chofer in the database
        List<Chofer> choferList = choferRepository.findAll();
        assertThat(choferList).hasSize(databaseSizeBeforeCreate + 1);
        Chofer testChofer = choferList.get(choferList.size() - 1);
        assertThat(testChofer.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testChofer.getLegajo()).isEqualTo(DEFAULT_LEGAJO);
    }

    @Test
    @Transactional
    public void createChoferWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = choferRepository.findAll().size();

        // Create the Chofer with an existing ID
        chofer.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restChoferMockMvc.perform(post("/api/chofers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chofer)))
            .andExpect(status().isBadRequest());

        // Validate the Chofer in the database
        List<Chofer> choferList = choferRepository.findAll();
        assertThat(choferList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllChofers() throws Exception {
        // Initialize the database
        choferRepository.saveAndFlush(chofer);

        // Get all the choferList
        restChoferMockMvc.perform(get("/api/chofers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(chofer.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].legajo").value(hasItem(DEFAULT_LEGAJO.intValue())));
    }

    @Test
    @Transactional
    public void getChofer() throws Exception {
        // Initialize the database
        choferRepository.saveAndFlush(chofer);

        // Get the chofer
        restChoferMockMvc.perform(get("/api/chofers/{id}", chofer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(chofer.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.legajo").value(DEFAULT_LEGAJO.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingChofer() throws Exception {
        // Get the chofer
        restChoferMockMvc.perform(get("/api/chofers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateChofer() throws Exception {
        // Initialize the database
        choferService.save(chofer);

        int databaseSizeBeforeUpdate = choferRepository.findAll().size();

        // Update the chofer
        Chofer updatedChofer = choferRepository.findOne(chofer.getId());
        // Disconnect from session so that the updates on updatedChofer are not directly saved in db
        em.detach(updatedChofer);
        updatedChofer
            .nombre(UPDATED_NOMBRE)
            .legajo(UPDATED_LEGAJO);

        restChoferMockMvc.perform(put("/api/chofers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedChofer)))
            .andExpect(status().isOk());

        // Validate the Chofer in the database
        List<Chofer> choferList = choferRepository.findAll();
        assertThat(choferList).hasSize(databaseSizeBeforeUpdate);
        Chofer testChofer = choferList.get(choferList.size() - 1);
        assertThat(testChofer.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testChofer.getLegajo()).isEqualTo(UPDATED_LEGAJO);
    }

    @Test
    @Transactional
    public void updateNonExistingChofer() throws Exception {
        int databaseSizeBeforeUpdate = choferRepository.findAll().size();

        // Create the Chofer

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restChoferMockMvc.perform(put("/api/chofers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chofer)))
            .andExpect(status().isCreated());

        // Validate the Chofer in the database
        List<Chofer> choferList = choferRepository.findAll();
        assertThat(choferList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteChofer() throws Exception {
        // Initialize the database
        choferService.save(chofer);

        int databaseSizeBeforeDelete = choferRepository.findAll().size();

        // Get the chofer
        restChoferMockMvc.perform(delete("/api/chofers/{id}", chofer.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Chofer> choferList = choferRepository.findAll();
        assertThat(choferList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Chofer.class);
        Chofer chofer1 = new Chofer();
        chofer1.setId(1L);
        Chofer chofer2 = new Chofer();
        chofer2.setId(chofer1.getId());
        assertThat(chofer1).isEqualTo(chofer2);
        chofer2.setId(2L);
        assertThat(chofer1).isNotEqualTo(chofer2);
        chofer1.setId(null);
        assertThat(chofer1).isNotEqualTo(chofer2);
    }
}
