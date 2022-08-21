package com.example.ekonobarserver.model;

import com.example.ekonobarserver.model.enums.EmployeeRole;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "employee")
@NoArgsConstructor
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employee_id")
    private Long id;

    @NotNull
    @Column(name = "firstname")
    private String firstname;

    @NotNull
    @Column(name = "lastname")
    private String lastname;

    @NotNull
    @Column(name = "username")
    private String username;

    @Column(name = "description")
    private String description;


    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "employee", fetch = FetchType.LAZY)
    private List<Order> orders = new ArrayList<>();

    @Column(name = "password")
    private String password;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="role", nullable = false)
    private Role role;

    @ManyToOne
    @JoinColumn(name = "branch_id", referencedColumnName = "branch_id")
    private Branch branch;

    @Setter(AccessLevel.NONE)
    @NotNull
    @Column(name = "date_created")
    private Date dateCreated=new Date();

    @Setter(AccessLevel.NONE)
    @NotNull
    @Column(name = "date_modified")
    private Date dateModified=new Date();

    public Employee(String firstName, String lastName, String userName, String password, String description, Branch branch, Role role){
        this.firstname = firstName;
        this.lastname = lastName;
        this.username = userName;
        this.password = password;
        this.description = description;
        this.branch = branch;
        this.setRole(role);
    }

    //updates date modified filed
    @PreUpdate
    protected void preUpdate() {
        this.dateModified= new Date();
    }
}
