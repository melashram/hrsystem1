package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.TicketStatus;

import com.mycompany.myapp.repository.TicketStatusRepository;
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
 * REST controller for managing TicketStatus.
 */
@RestController
@RequestMapping("/api")
public class TicketStatusResource {

    private final Logger log = LoggerFactory.getLogger(TicketStatusResource.class);

    private static final String ENTITY_NAME = "ticketStatus";

    private final TicketStatusRepository ticketStatusRepository;

    public TicketStatusResource(TicketStatusRepository ticketStatusRepository) {
        this.ticketStatusRepository = ticketStatusRepository;
    }

    /**
     * POST  /ticket-statuses : Create a new ticketStatus.
     *
     * @param ticketStatus the ticketStatus to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ticketStatus, or with status 400 (Bad Request) if the ticketStatus has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ticket-statuses")
    @Timed
    public ResponseEntity<TicketStatus> createTicketStatus(@RequestBody TicketStatus ticketStatus) throws URISyntaxException {
        log.debug("REST request to save TicketStatus : {}", ticketStatus);
        if (ticketStatus.getId() != null) {
            throw new BadRequestAlertException("A new ticketStatus cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TicketStatus result = ticketStatusRepository.save(ticketStatus);
        return ResponseEntity.created(new URI("/api/ticket-statuses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ticket-statuses : Updates an existing ticketStatus.
     *
     * @param ticketStatus the ticketStatus to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ticketStatus,
     * or with status 400 (Bad Request) if the ticketStatus is not valid,
     * or with status 500 (Internal Server Error) if the ticketStatus couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ticket-statuses")
    @Timed
    public ResponseEntity<TicketStatus> updateTicketStatus(@RequestBody TicketStatus ticketStatus) throws URISyntaxException {
        log.debug("REST request to update TicketStatus : {}", ticketStatus);
        if (ticketStatus.getId() == null) {
            return createTicketStatus(ticketStatus);
        }
        TicketStatus result = ticketStatusRepository.save(ticketStatus);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ticketStatus.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ticket-statuses : get all the ticketStatuses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of ticketStatuses in body
     */
    @GetMapping("/ticket-statuses")
    @Timed
    public List<TicketStatus> getAllTicketStatuses() {
        log.debug("REST request to get all TicketStatuses");
        return ticketStatusRepository.findAll();
        }

    /**
     * GET  /ticket-statuses/:id : get the "id" ticketStatus.
     *
     * @param id the id of the ticketStatus to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ticketStatus, or with status 404 (Not Found)
     */
    @GetMapping("/ticket-statuses/{id}")
    @Timed
    public ResponseEntity<TicketStatus> getTicketStatus(@PathVariable Long id) {
        log.debug("REST request to get TicketStatus : {}", id);
        TicketStatus ticketStatus = ticketStatusRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(ticketStatus));
    }

    /**
     * DELETE  /ticket-statuses/:id : delete the "id" ticketStatus.
     *
     * @param id the id of the ticketStatus to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ticket-statuses/{id}")
    @Timed
    public ResponseEntity<Void> deleteTicketStatus(@PathVariable Long id) {
        log.debug("REST request to delete TicketStatus : {}", id);
        ticketStatusRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
