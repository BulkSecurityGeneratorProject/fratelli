package com.fratelli.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

import com.fratelli.domain.enumeration.EstadoPresupuestoEnum;

/**
 * A Presupuesto.
 */
@Entity
@Table(name = "presupuesto")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Presupuesto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "monto")
    private Long monto;

    @Column(name = "cantidad_pasajeros")
    private Long cantidadPasajeros;

    @Column(name = "origen")
    private String origen;

    @Column(name = "destino")
    private String destino;

    @Column(name = "cantidad_dias")
    private Long cantidadDias;

    @Column(name = "hay_movimineto")
    private Boolean hayMovimineto;

    @Column(name = "fecha_viaje")
    private ZonedDateTime fechaViaje;

    @Column(name = "kilometros")
    private Long kilometros;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado")
    private EstadoPresupuestoEnum estado;

    @ManyToOne
    private Cliente cliente;

    @ManyToOne
    private Chofer chofer;

    @ManyToOne
    private Colectivo colectivo;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMonto() {
        return monto;
    }

    public Presupuesto monto(Long monto) {
        this.monto = monto;
        return this;
    }

    public void setMonto(Long monto) {
        this.monto = monto;
    }

    public Long getCantidadPasajeros() {
        return cantidadPasajeros;
    }

    public Presupuesto cantidadPasajeros(Long cantidadPasajeros) {
        this.cantidadPasajeros = cantidadPasajeros;
        return this;
    }

    public void setCantidadPasajeros(Long cantidadPasajeros) {
        this.cantidadPasajeros = cantidadPasajeros;
    }

    public String getOrigen() {
        return origen;
    }

    public Presupuesto origen(String origen) {
        this.origen = origen;
        return this;
    }

    public void setOrigen(String origen) {
        this.origen = origen;
    }

    public String getDestino() {
        return destino;
    }

    public Presupuesto destino(String destino) {
        this.destino = destino;
        return this;
    }

    public void setDestino(String destino) {
        this.destino = destino;
    }

    public Long getCantidadDias() {
        return cantidadDias;
    }

    public Presupuesto cantidadDias(Long cantidadDias) {
        this.cantidadDias = cantidadDias;
        return this;
    }

    public void setCantidadDias(Long cantidadDias) {
        this.cantidadDias = cantidadDias;
    }

    public Boolean isHayMovimineto() {
        return hayMovimineto;
    }

    public Presupuesto hayMovimineto(Boolean hayMovimineto) {
        this.hayMovimineto = hayMovimineto;
        return this;
    }

    public void setHayMovimineto(Boolean hayMovimineto) {
        this.hayMovimineto = hayMovimineto;
    }

    public ZonedDateTime getFechaViaje() {
        return fechaViaje;
    }

    public Presupuesto fechaViaje(ZonedDateTime fechaViaje) {
        this.fechaViaje = fechaViaje;
        return this;
    }

    public void setFechaViaje(ZonedDateTime fechaViaje) {
        this.fechaViaje = fechaViaje;
    }

    public Long getKilometros() {
        return kilometros;
    }

    public Presupuesto kilometros(Long kilometros) {
        this.kilometros = kilometros;
        return this;
    }

    public void setKilometros(Long kilometros) {
        this.kilometros = kilometros;
    }

    public EstadoPresupuestoEnum getEstado() {
        return estado;
    }

    public Presupuesto estado(EstadoPresupuestoEnum estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(EstadoPresupuestoEnum estado) {
        this.estado = estado;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public Presupuesto cliente(Cliente cliente) {
        this.cliente = cliente;
        return this;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Chofer getChofer() {
        return chofer;
    }

    public Presupuesto chofer(Chofer chofer) {
        this.chofer = chofer;
        return this;
    }

    public void setChofer(Chofer chofer) {
        this.chofer = chofer;
    }

    public Colectivo getColectivo() {
        return colectivo;
    }

    public Presupuesto colectivo(Colectivo colectivo) {
        this.colectivo = colectivo;
        return this;
    }

    public void setColectivo(Colectivo colectivo) {
        this.colectivo = colectivo;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Presupuesto presupuesto = (Presupuesto) o;
        if (presupuesto.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), presupuesto.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Presupuesto{" +
            "id=" + getId() +
            ", monto=" + getMonto() +
            ", cantidadPasajeros=" + getCantidadPasajeros() +
            ", origen='" + getOrigen() + "'" +
            ", destino='" + getDestino() + "'" +
            ", cantidadDias=" + getCantidadDias() +
            ", hayMovimineto='" + isHayMovimineto() + "'" +
            ", fechaViaje='" + getFechaViaje() + "'" +
            ", kilometros=" + getKilometros() +
            ", estado='" + getEstado() + "'" +
            "}";
    }
}
