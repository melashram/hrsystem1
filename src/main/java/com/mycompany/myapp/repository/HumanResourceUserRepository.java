package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.HumanResourceUser;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the HumanResourceUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HumanResourceUserRepository extends JpaRepository<HumanResourceUser, Long> {

}
