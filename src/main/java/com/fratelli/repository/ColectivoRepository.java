package com.fratelli.repository;

import com.fratelli.domain.Colectivo;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Colectivo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ColectivoRepository extends JpaRepository<Colectivo, Long> {

}
