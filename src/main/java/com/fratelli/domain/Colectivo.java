package com.fratelli.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Colectivo.
 */
@Entity
@Table(name = "colectivo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Colectivo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "numero_interno")
    private Long numeroInterno;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getNumeroInterno() {
        return numeroInterno;
    }

    public Colectivo numeroInterno(Long numeroInterno) {
        this.numeroInterno = numeroInterno;
        return this;
    }

    public void setNumeroInterno(Long numeroInterno) {
        this.numeroInterno = numeroInterno;
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
        Colectivo colectivo = (Colectivo) o;
        if (colectivo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), colectivo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Colectivo{" +
            "id=" + getId() +
            ", numeroInterno='" + getNumeroInterno() + "'" +
            "}";
    }
}
