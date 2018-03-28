package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.HumanResourceUser;

import com.mycompany.myapp.repository.HumanResourceUserRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
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
 * REST controller for managing HumanResourceUser.
 */
@RestController
@RequestMapping("/api")
public class HumanResourceUserResource {

    private final Logger log = LoggerFactory.getLogger(HumanResourceUserResource.class);

    private static final String ENTITY_NAME = "humanResourceUser";

    private final HumanResourceUserRepository humanResourceUserRepository;

    public HumanResourceUserResource(HumanResourceUserRepository humanResourceUserRepository) {
        this.humanResourceUserRepository = humanResourceUserRepository;
    }

    /**
     * POST  /human-resource-users : Create a new humanResourceUser.
     *
     * @param humanResourceUser the humanResourceUser to create
     * @return the ResponseEntity with status 201 (Created) and with body the new humanResourceUser, or with status 400 (Bad Request) if the humanResourceUser has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/human-resource-users")
    @Timed
    public ResponseEntity<HumanResourceUser> createHumanResourceUser(@RequestBody HumanResourceUser humanResourceUser) throws URISyntaxException {
        log.debug("REST request to save HumanResourceUser : {}", humanResourceUser);
        if (humanResourceUser.getId() != null) {
            throw new BadRequestAlertException("A new humanResourceUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HumanResourceUser result = humanResourceUserRepository.save(humanResourceUser);
        return ResponseEntity.created(new URI("/api/human-resource-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /human-resource-users : Updates an existing humanResourceUser.
     *
     * @param humanResourceUser the humanResourceUser to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated humanResourceUser,
     * or with status 400 (Bad Request) if the humanResourceUser is not valid,
     * or with status 500 (Internal Server Error) if the humanResourceUser couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/human-resource-users")
    @Timed
    public ResponseEntity<HumanResourceUser> updateHumanResourceUser(@RequestBody HumanResourceUser humanResourceUser) throws URISyntaxException {
        log.debug("REST request to update HumanResourceUser : {}", humanResourceUser);
        if (humanResourceUser.getId() == null) {
            return createHumanResourceUser(humanResourceUser);
        }
        HumanResourceUser result = humanResourceUserRepository.save(humanResourceUser);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, humanResourceUser.getId().toString()))
            .body(result);
    }

    /**
     * GET  /human-resource-users : get all the humanResourceUsers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of humanResourceUsers in body
     */
    @GetMapping("/human-resource-users")
    @Timed
    public List<HumanResourceUser> getAllHumanResourceUsers() {
        log.debug("REST request to get all HumanResourceUsers");
        return humanResourceUserRepository.findAll();
        }

    /**
     * GET  /human-resource-users/:id : get the "id" humanResourceUser.
     *
     * @param id the id of the humanResourceUser to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the humanResourceUser, or with status 404 (Not Found)
     */
    @GetMapping("/human-resource-users/{id}")
    @Timed
    public ResponseEntity<HumanResourceUser> getHumanResourceUser(@PathVariable Long id) {
        log.debug("REST request to get HumanResourceUser : {}", id);
        HumanResourceUser humanResourceUser = humanResourceUserRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(humanResourceUser));
    }

    /**
     * DELETE  /human-resource-users/:id : delete the "id" humanResourceUser.
     *
     * @param id the id of the humanResourceUser to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/human-resource-users/{id}")
    @Timed
    public ResponseEntity<Void> deleteHumanResourceUser(@PathVariable Long id) {
        log.debug("REST request to delete HumanResourceUser : {}", id);
        humanResourceUserRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
