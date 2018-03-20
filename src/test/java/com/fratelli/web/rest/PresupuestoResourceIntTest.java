package com.fratelli.web.rest;

import com.fratelli.FratelliApp;

import com.fratelli.domain.Presupuesto;
import com.fratelli.repository.PresupuestoRepository;
import com.fratelli.service.PresupuestoService;
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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.fratelli.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fratelli.domain.enumeration.EstadoPresupuestoEnum;
/**
 * Test class for the PresupuestoResource REST controller.
 *
 * @see PresupuestoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FratelliApp.class)
public class PresupuestoResourceIntTest {

    private static final Long DEFAULT_MONTO = 1L;
    private static final Long UPDATED_MONTO = 2L;

    private static final Long DEFAULT_CANTIDAD_PASAJEROS = 1L;
    private static final Long UPDATED_CANTIDAD_PASAJEROS = 2L;

    private static final String DEFAULT_ORIGEN = "AAAAAAAAAA";
    private static final String UPDATED_ORIGEN = "BBBBBBBBBB";

    private static final String DEFAULT_DESTINO = "AAAAAAAAAA";
    private static final String UPDATED_DESTINO = "BBBBBBBBBB";

    private static final Long DEFAULT_CANTIDAD_DIAS = 1L;
    private static final Long UPDATED_CANTIDAD_DIAS = 2L;

    private static final Boolean DEFAULT_HAY_MOVIMINETO = false;
    private static final Boolean UPDATED_HAY_MOVIMINETO = true;

    private static final ZonedDateTime DEFAULT_FECHA_VIAJE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA_VIAJE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Long DEFAULT_KILOMETROS = 1L;
    private static final Long UPDATED_KILOMETROS = 2L;

    private static final EstadoPresupuestoEnum DEFAULT_ESTADO = EstadoPresupuestoEnum.NO_CONFIRMADO;
    private static final EstadoPresupuestoEnum UPDATED_ESTADO = EstadoPresupuestoEnum.CONFIRMADO;

    @Autowired
    private PresupuestoRepository presupuestoRepository;

    @Autowired
    private PresupuestoService presupuestoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPresupuestoMockMvc;

    private Presupuesto presupuesto;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PresupuestoResource presupuestoResource = new PresupuestoResource(presupuestoService);
        this.restPresupuestoMockMvc = MockMvcBuilders.standaloneSetup(presupuestoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Presupuesto createEntity(EntityManager em) {
        Presupuesto presupuesto = new Presupuesto()
            .monto(DEFAULT_MONTO)
            .cantidadPasajeros(DEFAULT_CANTIDAD_PASAJEROS)
            .origen(DEFAULT_ORIGEN)
            .destino(DEFAULT_DESTINO)
            .cantidadDias(DEFAULT_CANTIDAD_DIAS)
            .hayMovimineto(DEFAULT_HAY_MOVIMINETO)
            .fechaViaje(DEFAULT_FECHA_VIAJE)
            .kilometros(DEFAULT_KILOMETROS)
            .estado(DEFAULT_ESTADO);
        return presupuesto;
    }

    @Before
    public void initTest() {
        presupuesto = createEntity(em);
    }

    @Test
    @Transactional
    public void createPresupuesto() throws Exception {
        int databaseSizeBeforeCreate = presupuestoRepository.findAll().size();

        // Create the Presupuesto
        restPresupuestoMockMvc.perform(post("/api/presupuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(presupuesto)))
            .andExpect(status().isCreated());

        // Validate the Presupuesto in the database
        List<Presupuesto> presupuestoList = presupuestoRepository.findAll();
        assertThat(presupuestoList).hasSize(databaseSizeBeforeCreate + 1);
        Presupuesto testPresupuesto = presupuestoList.get(presupuestoList.size() - 1);
        assertThat(testPresupuesto.getMonto()).isEqualTo(DEFAULT_MONTO);
        assertThat(testPresupuesto.getCantidadPasajeros()).isEqualTo(DEFAULT_CANTIDAD_PASAJEROS);
        assertThat(testPresupuesto.getOrigen()).isEqualTo(DEFAULT_ORIGEN);
        assertThat(testPresupuesto.getDestino()).isEqualTo(DEFAULT_DESTINO);
        assertThat(testPresupuesto.getCantidadDias()).isEqualTo(DEFAULT_CANTIDAD_DIAS);
        assertThat(testPresupuesto.isHayMovimineto()).isEqualTo(DEFAULT_HAY_MOVIMINETO);
        assertThat(testPresupuesto.getFechaViaje()).isEqualTo(DEFAULT_FECHA_VIAJE);
        assertThat(testPresupuesto.getKilometros()).isEqualTo(DEFAULT_KILOMETROS);
        assertThat(testPresupuesto.getEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    public void createPresupuestoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = presupuestoRepository.findAll().size();

        // Create the Presupuesto with an existing ID
        presupuesto.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPresupuestoMockMvc.perform(post("/api/presupuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(presupuesto)))
            .andExpect(status().isBadRequest());

        // Validate the Presupuesto in the database
        List<Presupuesto> presupuestoList = presupuestoRepository.findAll();
        assertThat(presupuestoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPresupuestos() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList
        restPresupuestoMockMvc.perform(get("/api/presupuestos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(presupuesto.getId().intValue())))
            .andExpect(jsonPath("$.[*].monto").value(hasItem(DEFAULT_MONTO.intValue())))
            .andExpect(jsonPath("$.[*].cantidadPasajeros").value(hasItem(DEFAULT_CANTIDAD_PASAJEROS.intValue())))
            .andExpect(jsonPath("$.[*].origen").value(hasItem(DEFAULT_ORIGEN.toString())))
            .andExpect(jsonPath("$.[*].destino").value(hasItem(DEFAULT_DESTINO.toString())))
            .andExpect(jsonPath("$.[*].cantidadDias").value(hasItem(DEFAULT_CANTIDAD_DIAS.intValue())))
            .andExpect(jsonPath("$.[*].hayMovimineto").value(hasItem(DEFAULT_HAY_MOVIMINETO.booleanValue())))
            .andExpect(jsonPath("$.[*].fechaViaje").value(hasItem(sameInstant(DEFAULT_FECHA_VIAJE))))
            .andExpect(jsonPath("$.[*].kilometros").value(hasItem(DEFAULT_KILOMETROS.intValue())))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO.toString())));
    }

    @Test
    @Transactional
    public void getPresupuesto() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get the presupuesto
        restPresupuestoMockMvc.perform(get("/api/presupuestos/{id}", presupuesto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(presupuesto.getId().intValue()))
            .andExpect(jsonPath("$.monto").value(DEFAULT_MONTO.intValue()))
            .andExpect(jsonPath("$.cantidadPasajeros").value(DEFAULT_CANTIDAD_PASAJEROS.intValue()))
            .andExpect(jsonPath("$.origen").value(DEFAULT_ORIGEN.toString()))
            .andExpect(jsonPath("$.destino").value(DEFAULT_DESTINO.toString()))
            .andExpect(jsonPath("$.cantidadDias").value(DEFAULT_CANTIDAD_DIAS.intValue()))
            .andExpect(jsonPath("$.hayMovimineto").value(DEFAULT_HAY_MOVIMINETO.booleanValue()))
            .andExpect(jsonPath("$.fechaViaje").value(sameInstant(DEFAULT_FECHA_VIAJE)))
            .andExpect(jsonPath("$.kilometros").value(DEFAULT_KILOMETROS.intValue()))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPresupuesto() throws Exception {
        // Get the presupuesto
        restPresupuestoMockMvc.perform(get("/api/presupuestos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePresupuesto() throws Exception {
        // Initialize the database
        presupuestoService.save(presupuesto);

        int databaseSizeBeforeUpdate = presupuestoRepository.findAll().size();

        // Update the presupuesto
        Presupuesto updatedPresupuesto = presupuestoRepository.findOne(presupuesto.getId());
        updatedPresupuesto
            .monto(UPDATED_MONTO)
            .cantidadPasajeros(UPDATED_CANTIDAD_PASAJEROS)
            .origen(UPDATED_ORIGEN)
            .destino(UPDATED_DESTINO)
            .cantidadDias(UPDATED_CANTIDAD_DIAS)
            .hayMovimineto(UPDATED_HAY_MOVIMINETO)
            .fechaViaje(UPDATED_FECHA_VIAJE)
            .kilometros(UPDATED_KILOMETROS)
            .estado(UPDATED_ESTADO);

        restPresupuestoMockMvc.perform(put("/api/presupuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPresupuesto)))
            .andExpect(status().isOk());

        // Validate the Presupuesto in the database
        List<Presupuesto> presupuestoList = presupuestoRepository.findAll();
        assertThat(presupuestoList).hasSize(databaseSizeBeforeUpdate);
        Presupuesto testPresupuesto = presupuestoList.get(presupuestoList.size() - 1);
        assertThat(testPresupuesto.getMonto()).isEqualTo(UPDATED_MONTO);
        assertThat(testPresupuesto.getCantidadPasajeros()).isEqualTo(UPDATED_CANTIDAD_PASAJEROS);
        assertThat(testPresupuesto.getOrigen()).isEqualTo(UPDATED_ORIGEN);
        assertThat(testPresupuesto.getDestino()).isEqualTo(UPDATED_DESTINO);
        assertThat(testPresupuesto.getCantidadDias()).isEqualTo(UPDATED_CANTIDAD_DIAS);
        assertThat(testPresupuesto.isHayMovimineto()).isEqualTo(UPDATED_HAY_MOVIMINETO);
        assertThat(testPresupuesto.getFechaViaje()).isEqualTo(UPDATED_FECHA_VIAJE);
        assertThat(testPresupuesto.getKilometros()).isEqualTo(UPDATED_KILOMETROS);
        assertThat(testPresupuesto.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    public void updateNonExistingPresupuesto() throws Exception {
        int databaseSizeBeforeUpdate = presupuestoRepository.findAll().size();

        // Create the Presupuesto

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPresupuestoMockMvc.perform(put("/api/presupuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(presupuesto)))
            .andExpect(status().isCreated());

        // Validate the Presupuesto in the database
        List<Presupuesto> presupuestoList = presupuestoRepository.findAll();
        assertThat(presupuestoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePresupuesto() throws Exception {
        // Initialize the database
        presupuestoService.save(presupuesto);

        int databaseSizeBeforeDelete = presupuestoRepository.findAll().size();

        // Get the presupuesto
        restPresupuestoMockMvc.perform(delete("/api/presupuestos/{id}", presupuesto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Presupuesto> presupuestoList = presupuestoRepository.findAll();
        assertThat(presupuestoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Presupuesto.class);
        Presupuesto presupuesto1 = new Presupuesto();
        presupuesto1.setId(1L);
        Presupuesto presupuesto2 = new Presupuesto();
        presupuesto2.setId(presupuesto1.getId());
        assertThat(presupuesto1).isEqualTo(presupuesto2);
        presupuesto2.setId(2L);
        assertThat(presupuesto1).isNotEqualTo(presupuesto2);
        presupuesto1.setId(null);
        assertThat(presupuesto1).isNotEqualTo(presupuesto2);
    }
}
