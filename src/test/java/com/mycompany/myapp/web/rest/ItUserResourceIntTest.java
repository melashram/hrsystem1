package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.Hrsystem1App;

import com.mycompany.myapp.domain.ItUser;
import com.mycompany.myapp.repository.ItUserRepository;
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
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ItUserResource REST controller.
 *
 * @see ItUserResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Hrsystem1App.class)
public class ItUserResourceIntTest {

    private static final String DEFAULT_IT_POSITON = "AAAAAAAAAA";
    private static final String UPDATED_IT_POSITON = "BBBBBBBBBB";

    @Autowired
    private ItUserRepository itUserRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restItUserMockMvc;

    private ItUser itUser;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ItUserResource itUserResource = new ItUserResource(itUserRepository);
        this.restItUserMockMvc = MockMvcBuilders.standaloneSetup(itUserResource)
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
    public static ItUser createEntity(EntityManager em) {
        ItUser itUser = new ItUser()
            .itPositon(DEFAULT_IT_POSITON);
        return itUser;
    }

    @Before
    public void initTest() {
        itUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createItUser() throws Exception {
        int databaseSizeBeforeCreate = itUserRepository.findAll().size();

        // Create the ItUser
        restItUserMockMvc.perform(post("/api/it-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itUser)))
            .andExpect(status().isCreated());

        // Validate the ItUser in the database
        List<ItUser> itUserList = itUserRepository.findAll();
        assertThat(itUserList).hasSize(databaseSizeBeforeCreate + 1);
        ItUser testItUser = itUserList.get(itUserList.size() - 1);
        assertThat(testItUser.getItPositon()).isEqualTo(DEFAULT_IT_POSITON);
    }

    @Test
    @Transactional
    public void createItUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = itUserRepository.findAll().size();

        // Create the ItUser with an existing ID
        itUser.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restItUserMockMvc.perform(post("/api/it-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itUser)))
            .andExpect(status().isBadRequest());

        // Validate the ItUser in the database
        List<ItUser> itUserList = itUserRepository.findAll();
        assertThat(itUserList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllItUsers() throws Exception {
        // Initialize the database
        itUserRepository.saveAndFlush(itUser);

        // Get all the itUserList
        restItUserMockMvc.perform(get("/api/it-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(itUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].itPositon").value(hasItem(DEFAULT_IT_POSITON.toString())));
    }

    @Test
    @Transactional
    public void getItUser() throws Exception {
        // Initialize the database
        itUserRepository.saveAndFlush(itUser);

        // Get the itUser
        restItUserMockMvc.perform(get("/api/it-users/{id}", itUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(itUser.getId().intValue()))
            .andExpect(jsonPath("$.itPositon").value(DEFAULT_IT_POSITON.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingItUser() throws Exception {
        // Get the itUser
        restItUserMockMvc.perform(get("/api/it-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateItUser() throws Exception {
        // Initialize the database
        itUserRepository.saveAndFlush(itUser);
        int databaseSizeBeforeUpdate = itUserRepository.findAll().size();

        // Update the itUser
        ItUser updatedItUser = itUserRepository.findOne(itUser.getId());
        // Disconnect from session so that the updates on updatedItUser are not directly saved in db
        em.detach(updatedItUser);
        updatedItUser
            .itPositon(UPDATED_IT_POSITON);

        restItUserMockMvc.perform(put("/api/it-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedItUser)))
            .andExpect(status().isOk());

        // Validate the ItUser in the database
        List<ItUser> itUserList = itUserRepository.findAll();
        assertThat(itUserList).hasSize(databaseSizeBeforeUpdate);
        ItUser testItUser = itUserList.get(itUserList.size() - 1);
        assertThat(testItUser.getItPositon()).isEqualTo(UPDATED_IT_POSITON);
    }

    @Test
    @Transactional
    public void updateNonExistingItUser() throws Exception {
        int databaseSizeBeforeUpdate = itUserRepository.findAll().size();

        // Create the ItUser

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restItUserMockMvc.perform(put("/api/it-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itUser)))
            .andExpect(status().isCreated());

        // Validate the ItUser in the database
        List<ItUser> itUserList = itUserRepository.findAll();
        assertThat(itUserList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteItUser() throws Exception {
        // Initialize the database
        itUserRepository.saveAndFlush(itUser);
        int databaseSizeBeforeDelete = itUserRepository.findAll().size();

        // Get the itUser
        restItUserMockMvc.perform(delete("/api/it-users/{id}", itUser.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ItUser> itUserList = itUserRepository.findAll();
        assertThat(itUserList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ItUser.class);
        ItUser itUser1 = new ItUser();
        itUser1.setId(1L);
        ItUser itUser2 = new ItUser();
        itUser2.setId(itUser1.getId());
        assertThat(itUser1).isEqualTo(itUser2);
        itUser2.setId(2L);
        assertThat(itUser1).isNotEqualTo(itUser2);
        itUser1.setId(null);
        assertThat(itUser1).isNotEqualTo(itUser2);
    }
}
