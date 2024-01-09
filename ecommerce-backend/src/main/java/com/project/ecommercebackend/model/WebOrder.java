package com.project.ecommercebackend.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "web_order")
public class WebOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @OneToMany(mappedBy = "order", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<OrderElement> orderElements = new ArrayList<>();

    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @ManyToOne(optional = false)
    @JoinColumn(name = "address_id", nullable = false)
    private Address address;

    public WebOrder() {
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<OrderElement> getQuantities() {
        return orderElements;
    }

    public void setOrderElements(List<OrderElement> orderElements) {
        this.orderElements = orderElements;
    }

    public Long getId() {
        return id;
    }

    public WebOrder(List<OrderElement> orderElements, String email, Address address, Long id) {
        this.orderElements = orderElements;
        this.email = email;
        this.address = address;
        this.id = id;
    }
}