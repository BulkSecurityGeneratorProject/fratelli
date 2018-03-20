package com.fratelli.repository;

import com.fratelli.domain.Chofer;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Chofer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChoferRepository extends JpaRepository<Chofer, Long> {

}
