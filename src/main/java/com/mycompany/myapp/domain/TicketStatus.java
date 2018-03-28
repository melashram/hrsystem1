package com.mycompany.myapp.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A TicketStatus.
 */
@Entity
@Table(name = "ticket_status")
public class TicketStatus implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ticket_status")
    private String ticketStatus;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTicketStatus() {
        return ticketStatus;
    }

    public TicketStatus ticketStatus(String ticketStatus) {
        this.ticketStatus = ticketStatus;
        return this;
    }

    public void setTicketStatus(String ticketStatus) {
        this.ticketStatus = ticketStatus;
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
        TicketStatus ticketStatus = (TicketStatus) o;
        if (ticketStatus.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ticketStatus.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TicketStatus{" +
            "id=" + getId() +
            ", ticketStatus='" + getTicketStatus() + "'" +
            "}";
    }
}
