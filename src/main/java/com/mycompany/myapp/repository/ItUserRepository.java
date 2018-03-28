package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ItUser;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ItUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ItUserRepository extends JpaRepository<ItUser, Long> {

}
