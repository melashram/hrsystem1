package com.mycompany.myapp.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A HumanResourceUser.
 */
@Entity
@Table(name = "human_resource_user")
public class HumanResourceUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "human_resources_position")
    private String humanResourcesPosition;

    @OneToOne
    @JoinColumn(unique = true)
    private Employee humanResourceUser;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHumanResourcesPosition() {
        return humanResourcesPosition;
    }

    public HumanResourceUser humanResourcesPosition(String humanResourcesPosition) {
        this.humanResourcesPosition = humanResourcesPosition;
        return this;
    }

    public void setHumanResourcesPosition(String humanResourcesPosition) {
        this.humanResourcesPosition = humanResourcesPosition;
    }

    public Employee getHumanResourceUser() {
        return humanResourceUser;
    }

    public HumanResourceUser humanResourceUser(Employee employee) {
        this.humanResourceUser = employee;
        return this;
    }

    public void setHumanResourceUser(Employee employee) {
        this.humanResourceUser = employee;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        HumanResourceUser humanResourceUser = (HumanResourceUser) o;
        if (humanResourceUser.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), humanResourceUser.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "HumanResourceUser{" +
            "id=" + getId() +
            ", humanResourcesPosition='" + getHumanResourcesPosition() + "'" +
            "}";
    }
}
