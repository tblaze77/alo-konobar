package com.example.ekonobarserver.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name="branch")
@NoArgsConstructor
public class Branch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "branch_id")
    private Long id;

    //@Pattern(regexp="^[a-zA-Z0-9_].{3,50}$",message="length must be at least 3")
    @NotNull
    @Column(name = "branch_name")
    private String branchName;

    @Column(name = "city")
    private String city;

    @Column(name = "address")
    private String address;

    @Column(name = "description")
    private String description;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "branch", fetch = FetchType.LAZY)
    private List<BranchTable> branchTables = new ArrayList<>();

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "branch", fetch = FetchType.LAZY)
    private List<Employee> employees = new ArrayList<>();

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "branch", fetch = FetchType.LAZY)
    private List<Employee> orders = new ArrayList<>();

    @Setter(AccessLevel.NONE)
    @NotNull
    @Column(name = "date_created")
    private Date datecreated=new Date();

    @Setter(AccessLevel.NONE)
    @NotNull
    @Column(name = "date_modified")
    private Date datemodified=new Date();

    public Branch (String branchName, String city, String address, String description){
        this.branchName = branchName;
        this.city = city;
        this.address = address;
        this.description = description;
    }

    //updates date modified filed
    @PreUpdate
    protected void preUpdate() {
        this.datemodified= new Date();
    }
}
