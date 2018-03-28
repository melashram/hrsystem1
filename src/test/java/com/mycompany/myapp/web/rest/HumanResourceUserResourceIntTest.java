package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.Hrsystem1App;

import com.mycompany.myapp.domain.HumanResourceUser;
import com.mycompany.myapp.repository.HumanResourceUserRepository;
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
 * Test class for the HumanResourceUserResource REST controller.
 *
 * @see HumanResourceUserResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Hrsystem1App.class)
public class HumanResourceUserResourceIntTest {

    private static final String DEFAULT_HUMAN_RESOURCES_POSITION = "AAAAAAAAAA";
    private static final String UPDATED_HUMAN_RESOURCES_POSITION = "BBBBBBBBBB";

    @Autowired
    private HumanResourceUserRepository humanResourceUserRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restHumanResourceUserMockMvc;

    private HumanResourceUser humanResourceUser;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HumanResourceUserResource humanResourceUserResource = new HumanResourceUserResource(humanResourceUserRepository);
        this.restHumanResourceUserMockMvc = MockMvcBuilders.standaloneSetup(humanResourceUserResource)
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
    public static HumanResourceUser createEntity(EntityManager em) {
        HumanResourceUser humanResourceUser = new HumanResourceUser()
            .humanResourcesPosition(DEFAULT_HUMAN_RESOURCES_POSITION);
        return humanResourceUser;
    }

    @Before
    public void initTest() {
        humanResourceUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createHumanResourceUser() throws Exception {
        int databaseSizeBeforeCreate = humanResourceUserRepository.findAll().size();

        // Create the HumanResourceUser
        restHumanResourceUserMockMvc.perform(post("/api/human-resource-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(humanResourceUser)))
            .andExpect(status().isCreated());

        // Validate the HumanResourceUser in the database
        List<HumanResourceUser> humanResourceUserList = humanResourceUserRepository.findAll();
        assertThat(humanResourceUserList).hasSize(databaseSizeBeforeCreate + 1);
        HumanResourceUser testHumanResourceUser = humanResourceUserList.get(humanResourceUserList.size() - 1);
        assertThat(testHumanResourceUser.getHumanResourcesPosition()).isEqualTo(DEFAULT_HUMAN_RESOURCES_POSITION);
    }

    @Test
    @Transactional
    public void createHumanResourceUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = humanResourceUserRepository.findAll().size();

        // Create the HumanResourceUser with an existing ID
        humanResourceUser.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHumanResourceUserMockMvc.perform(post("/api/human-resource-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(humanResourceUser)))
            .andExpect(status().isBadRequest());

        // Validate the HumanResourceUser in the database
        List<HumanResourceUser> humanResourceUserList = humanResourceUserRepository.findAll();
        assertThat(humanResourceUserList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllHumanResourceUsers() throws Exception {
        // Initialize the database
        humanResourceUserRepository.saveAndFlush(humanResourceUser);

        // Get all the humanResourceUserList
        restHumanResourceUserMockMvc.perform(get("/api/human-resource-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(humanResourceUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].humanResourcesPosition").value(hasItem(DEFAULT_HUMAN_RESOURCES_POSITION.toString())));
    }

    @Test
    @Transactional
    public void getHumanResourceUser() throws Exception {
        // Initialize the database
        humanResourceUserRepository.saveAndFlush(humanResourceUser);

        // Get the humanResourceUser
        restHumanResourceUserMockMvc.perform(get("/api/human-resource-users/{id}", humanResourceUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(humanResourceUser.getId().intValue()))
            .andExpect(jsonPath("$.humanResourcesPosition").value(DEFAULT_HUMAN_RESOURCES_POSITION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingHumanResourceUser() throws Exception {
        // Get the humanResourceUser
        restHumanResourceUserMockMvc.perform(get("/api/human-resource-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHumanResourceUser() throws Exception {
        // Initialize the database
        humanResourceUserRepository.saveAndFlush(humanResourceUser);
        int databaseSizeBeforeUpdate = humanResourceUserRepository.findAll().size();

        // Update the humanResourceUser
        HumanResourceUser updatedHumanResourceUser = humanResourceUserRepository.findOne(humanResourceUser.getId());
        // Disconnect from session so that the updates on updatedHumanResourceUser are not directly saved in db
        em.detach(updatedHumanResourceUser);
        updatedHumanResourceUser
            .humanResourcesPosition(UPDATED_HUMAN_RESOURCES_POSITION);

        restHumanResourceUserMockMvc.perform(put("/api/human-resource-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHumanResourceUser)))
            .andExpect(status().isOk());

        // Validate the HumanResourceUser in the database
        List<HumanResourceUser> humanResourceUserList = humanResourceUserRepository.findAll();
        assertThat(humanResourceUserList).hasSize(databaseSizeBeforeUpdate);
        HumanResourceUser testHumanResourceUser = humanResourceUserList.get(humanResourceUserList.size() - 1);
        assertThat(testHumanResourceUser.getHumanResourcesPosition()).isEqualTo(UPDATED_HUMAN_RESOURCES_POSITION);
    }

    @Test
    @Transactional
    public void updateNonExistingHumanResourceUser() throws Exception {
        int databaseSizeBeforeUpdate = humanResourceUserRepository.findAll().size();

        // Create the HumanResourceUser

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restHumanResourceUserMockMvc.perform(put("/api/human-resource-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(humanResourceUser)))
            .andExpect(status().isCreated());

        // Validate the HumanResourceUser in the database
        List<HumanResourceUser> humanResourceUserList = humanResourceUserRepository.findAll();
        assertThat(humanResourceUserList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteHumanResourceUser() throws Exception {
        // Initialize the database
        humanResourceUserRepository.saveAndFlush(humanResourceUser);
        int databaseSizeBeforeDelete = humanResourceUserRepository.findAll().size();

        // Get the humanResourceUser
        restHumanResourceUserMockMvc.perform(delete("/api/human-resource-users/{id}", humanResourceUser.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<HumanResourceUser> humanResourceUserList = humanResourceUserRepository.findAll();
        assertThat(humanResourceUserList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HumanResourceUser.class);
        HumanResourceUser humanResourceUser1 = new HumanResourceUser();
        humanResourceUser1.setId(1L);
        HumanResourceUser humanResourceUser2 = new HumanResourceUser();
        humanResourceUser2.setId(humanResourceUser1.getId());
        assertThat(humanResourceUser1).isEqualTo(humanResourceUser2);
        humanResourceUser2.setId(2L);
        assertThat(humanResourceUser1).isNotEqualTo(humanResourceUser2);
        humanResourceUser1.setId(null);
        assertThat(humanResourceUser1).isNotEqualTo(humanResourceUser2);
    }
}
