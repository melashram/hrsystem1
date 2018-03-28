package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.Hrsystem1App;

import com.mycompany.myapp.domain.Ticket;
import com.mycompany.myapp.repository.TicketRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TicketResource REST controller.
 *
 * @see TicketResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Hrsystem1App.class)
public class TicketResourceIntTest {

    private static final String DEFAULT_REASON = "AAAAAAAAAA";
    private static final String UPDATED_REASON = "BBBBBBBBBB";

    private static final String DEFAULT_COMMENT = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CREATIONDATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATIONDATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_REQUEST_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_REQUEST_STATUS = "BBBBBBBBBB";

    private static final Long DEFAULT_TICKET = 1L;
    private static final Long UPDATED_TICKET = 2L;

    private static final String DEFAULT_ASSIGNED_TO = "AAAAAAAAAA";
    private static final String UPDATED_ASSIGNED_TO = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_ACCEPTANCE_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_ACCEPTANCE_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTicketMockMvc;

    private Ticket ticket;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TicketResource ticketResource = new TicketResource(ticketRepository);
        this.restTicketMockMvc = MockMvcBuilders.standaloneSetup(ticketResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ticket createEntity(EntityManager em) {
        Ticket ticket = new Ticket()
            .reason(DEFAULT_REASON)
            .comment(DEFAULT_COMMENT)
            .creationdate(DEFAULT_CREATIONDATE)
            .requestStatus(DEFAULT_REQUEST_STATUS)
            .ticket(DEFAULT_TICKET)
            .assignedTo(DEFAULT_ASSIGNED_TO)
            .acceptanceDate(DEFAULT_ACCEPTANCE_DATE)
            .description(DEFAULT_DESCRIPTION);
        return ticket;
    }

    @Before
    public void initTest() {
        ticket = createEntity(em);
    }

    @Test
    @Transactional
    public void createTicket() throws Exception {
        int databaseSizeBeforeCreate = ticketRepository.findAll().size();

        // Create the Ticket
        restTicketMockMvc.perform(post("/api/tickets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ticket)))
            .andExpect(status().isCreated());

        // Validate the Ticket in the database
        List<Ticket> ticketList = ticketRepository.findAll();
        assertThat(ticketList).hasSize(databaseSizeBeforeCreate + 1);
        Ticket testTicket = ticketList.get(ticketList.size() - 1);
        assertThat(testTicket.getReason()).isEqualTo(DEFAULT_REASON);
        assertThat(testTicket.getComment()).isEqualTo(DEFAULT_COMMENT);
        assertThat(testTicket.getCreationdate()).isEqualTo(DEFAULT_CREATIONDATE);
        assertThat(testTicket.getRequestStatus()).isEqualTo(DEFAULT_REQUEST_STATUS);
        assertThat(testTicket.getTicket()).isEqualTo(DEFAULT_TICKET);
        assertThat(testTicket.getAssignedTo()).isEqualTo(DEFAULT_ASSIGNED_TO);
        assertThat(testTicket.getAcceptanceDate()).isEqualTo(DEFAULT_ACCEPTANCE_DATE);
        assertThat(testTicket.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createTicketWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ticketRepository.findAll().size();

        // Create the Ticket with an existing ID
        ticket.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTicketMockMvc.perform(post("/api/tickets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ticket)))
            .andExpect(status().isBadRequest());

        // Validate the Ticket in the database
        List<Ticket> ticketList = ticketRepository.findAll();
        assertThat(ticketList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTickets() throws Exception {
        // Initialize the database
        ticketRepository.saveAndFlush(ticket);

        // Get all the ticketList
        restTicketMockMvc.perform(get("/api/tickets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ticket.getId().intValue())))
            .andExpect(jsonPath("$.[*].reason").value(hasItem(DEFAULT_REASON.toString())))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT.toString())))
            .andExpect(jsonPath("$.[*].creationdate").value(hasItem(DEFAULT_CREATIONDATE.toString())))
            .andExpect(jsonPath("$.[*].requestStatus").value(hasItem(DEFAULT_REQUEST_STATUS.toString())))
            .andExpect(jsonPath("$.[*].ticket").value(hasItem(DEFAULT_TICKET.intValue())))
            .andExpect(jsonPath("$.[*].assignedTo").value(hasItem(DEFAULT_ASSIGNED_TO.toString())))
            .andExpect(jsonPath("$.[*].acceptanceDate").value(hasItem(DEFAULT_ACCEPTANCE_DATE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getTicket() throws Exception {
        // Initialize the database
        ticketRepository.saveAndFlush(ticket);

        // Get the ticket
        restTicketMockMvc.perform(get("/api/tickets/{id}", ticket.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ticket.getId().intValue()))
            .andExpect(jsonPath("$.reason").value(DEFAULT_REASON.toString()))
            .andExpect(jsonPath("$.comment").value(DEFAULT_COMMENT.toString()))
            .andExpect(jsonPath("$.creationdate").value(DEFAULT_CREATIONDATE.toString()))
            .andExpect(jsonPath("$.requestStatus").value(DEFAULT_REQUEST_STATUS.toString()))
            .andExpect(jsonPath("$.ticket").value(DEFAULT_TICKET.intValue()))
            .andExpect(jsonPath("$.assignedTo").value(DEFAULT_ASSIGNED_TO.toString()))
            .andExpect(jsonPath("$.acceptanceDate").value(DEFAULT_ACCEPTANCE_DATE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTicket() throws Exception {
        // Get the ticket
        restTicketMockMvc.perform(get("/api/tickets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTicket() throws Exception {
        // Initialize the database
        ticketRepository.saveAndFlush(ticket);
        int databaseSizeBeforeUpdate = ticketRepository.findAll().size();

        // Update the ticket
        Ticket updatedTicket = ticketRepository.findOne(ticket.getId());
        // Disconnect from session so that the updates on updatedTicket are not directly saved in db
        em.detach(updatedTicket);
        updatedTicket
            .reason(UPDATED_REASON)
            .comment(UPDATED_COMMENT)
            .creationdate(UPDATED_CREATIONDATE)
            .requestStatus(UPDATED_REQUEST_STATUS)
            .ticket(UPDATED_TICKET)
            .assignedTo(UPDATED_ASSIGNED_TO)
            .acceptanceDate(UPDATED_ACCEPTANCE_DATE)
            .description(UPDATED_DESCRIPTION);

        restTicketMockMvc.perform(put("/api/tickets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTicket)))
            .andExpect(status().isOk());

        // Validate the Ticket in the database
        List<Ticket> ticketList = ticketRepository.findAll();
        assertThat(ticketList).hasSize(databaseSizeBeforeUpdate);
        Ticket testTicket = ticketList.get(ticketList.size() - 1);
        assertThat(testTicket.getReason()).isEqualTo(UPDATED_REASON);
        assertThat(testTicket.getComment()).isEqualTo(UPDATED_COMMENT);
        assertThat(testTicket.getCreationdate()).isEqualTo(UPDATED_CREATIONDATE);
        assertThat(testTicket.getRequestStatus()).isEqualTo(UPDATED_REQUEST_STATUS);
        assertThat(testTicket.getTicket()).isEqualTo(UPDATED_TICKET);
        assertThat(testTicket.getAssignedTo()).isEqualTo(UPDATED_ASSIGNED_TO);
        assertThat(testTicket.getAcceptanceDate()).isEqualTo(UPDATED_ACCEPTANCE_DATE);
        assertThat(testTicket.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingTicket() throws Exception {
        int databaseSizeBeforeUpdate = ticketRepository.findAll().size();

        // Create the Ticket

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTicketMockMvc.perform(put("/api/tickets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ticket)))
            .andExpect(status().isCreated());

        // Validate the Ticket in the database
        List<Ticket> ticketList = ticketRepository.findAll();
        assertThat(ticketList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTicket() throws Exception {
        // Initialize the database
        ticketRepository.saveAndFlush(ticket);
        int databaseSizeBeforeDelete = ticketRepository.findAll().size();

        // Get the ticket
        restTicketMockMvc.perform(delete("/api/tickets/{id}", ticket.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Ticket> ticketList = ticketRepository.findAll();
        assertThat(ticketList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ticket.class);
        Ticket ticket1 = new Ticket();
        ticket1.setId(1L);
        Ticket ticket2 = new Ticket();
        ticket2.setId(ticket1.getId());
        assertThat(ticket1).isEqualTo(ticket2);
        ticket2.setId(2L);
        assertThat(ticket1).isNotEqualTo(ticket2);
        ticket1.setId(null);
        assertThat(ticket1).isNotEqualTo(ticket2);
    }
}
