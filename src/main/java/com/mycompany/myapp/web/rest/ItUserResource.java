package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.ItUser;

import com.mycompany.myapp.repository.ItUserRepository;
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
 * REST controller for managing ItUser.
 */
@RestController
@RequestMapping("/api")
public class ItUserResource {

    private final Logger log = LoggerFactory.getLogger(ItUserResource.class);

    private static final String ENTITY_NAME = "itUser";

    private final ItUserRepository itUserRepository;

    public ItUserResource(ItUserRepository itUserRepository) {
        this.itUserRepository = itUserRepository;
    }

    /**
     * POST  /it-users : Create a new itUser.
     *
     * @param itUser the itUser to create
     * @return the ResponseEntity with status 201 (Created) and with body the new itUser, or with status 400 (Bad Request) if the itUser has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/it-users")
    @Timed
    public ResponseEntity<ItUser> createItUser(@RequestBody ItUser itUser) throws URISyntaxException {
        log.debug("REST request to save ItUser : {}", itUser);
        if (itUser.getId() != null) {
            throw new BadRequestAlertException("A new itUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ItUser result = itUserRepository.save(itUser);
        return ResponseEntity.created(new URI("/api/it-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /it-users : Updates an existing itUser.
     *
     * @param itUser the itUser to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated itUser,
     * or with status 400 (Bad Request) if the itUser is not valid,
     * or with status 500 (Internal Server Error) if the itUser couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/it-users")
    @Timed
    public ResponseEntity<ItUser> updateItUser(@RequestBody ItUser itUser) throws URISyntaxException {
        log.debug("REST request to update ItUser : {}", itUser);
        if (itUser.getId() == null) {
            return createItUser(itUser);
        }
        ItUser result = itUserRepository.save(itUser);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, itUser.getId().toString()))
            .body(result);
    }

    /**
     * GET  /it-users : get all the itUsers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of itUsers in body
     */
    @GetMapping("/it-users")
    @Timed
    public List<ItUser> getAllItUsers() {
        log.debug("REST request to get all ItUsers");
        return itUserRepository.findAll();
        }

    /**
     * GET  /it-users/:id : get the "id" itUser.
     *
     * @param id the id of the itUser to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the itUser, or with status 404 (Not Found)
     */
    @GetMapping("/it-users/{id}")
    @Timed
    public ResponseEntity<ItUser> getItUser(@PathVariable Long id) {
        log.debug("REST request to get ItUser : {}", id);
        ItUser itUser = itUserRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(itUser));
    }

    /**
     * DELETE  /it-users/:id : delete the "id" itUser.
     *
     * @param id the id of the itUser to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/it-users/{id}")
    @Timed
    public ResponseEntity<Void> deleteItUser(@PathVariable Long id) {
        log.debug("REST request to delete ItUser : {}", id);
        itUserRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
