package com.mycompany.myapp.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ItUser.
 */
@Entity
@Table(name = "it_user")
public class ItUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "it_positon")
    private String itPositon;

    @OneToOne
    @JoinColumn(unique = true)
    private Employee itUser;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getItPositon() {
        return itPositon;
    }

    public ItUser itPositon(String itPositon) {
        this.itPositon = itPositon;
        return this;
    }

    public void setItPositon(String itPositon) {
        this.itPositon = itPositon;
    }

    public Employee getItUser() {
        return itUser;
    }

    public ItUser itUser(Employee employee) {
        this.itUser = employee;
        return this;
    }

    public void setItUser(Employee employee) {
        this.itUser = employee;
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
        ItUser itUser = (ItUser) o;
        if (itUser.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), itUser.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ItUser{" +
            "id=" + getId() +
            ", itPositon='" + getItPositon() + "'" +
            "}";
    }
}
