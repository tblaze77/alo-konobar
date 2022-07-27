package com.example.ekonobarserver.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@Table(name="customer")
public class Customer {

    @Id
    @GeneratedValue
    @Column(name = "customer_id")
    private long id;

    //@Pattern(regexp="^[a-zA-Z0-9_].{3,50}$",message="length must be at least 3")
    @NotNull
    @Column(name = "first_name")
    private String firstname;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "customer")
    private List<Order> orders = new ArrayList<>();

    @Column(name = "last_name")
    private String lastname;

    @Column(name = "description")
    private String description;

    @Setter(AccessLevel.NONE)
    @NotNull
    @Column(name = "date_created")
    private Date dateCreated=new Date();

    @Setter(AccessLevel.NONE)
    @NotNull
    @Column(name = "date_modified")
    private Date dateModified=new Date();

    //updates date modified filed
    @PreUpdate
    protected void preUpdate() {
        this.dateModified= new Date();
    }
}
