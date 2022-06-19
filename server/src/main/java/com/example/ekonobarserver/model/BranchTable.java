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

@Entity
@Data
@Table(name="branch_table")
public class BranchTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "branch_table_id")
    private Long id;

    @Column(name = "number")
    private Integer number;

    @ManyToOne
    @JoinColumn(name = "branch_id", referencedColumnName = "branch_id")
    private Branch branch;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "branchTable", fetch = FetchType.LAZY)
    private List<Order> orders = new ArrayList<>();

    @Setter(AccessLevel.NONE)
    @NotNull
    @Column(name = "date_created")
    private Date dateCreated = new Date();

    @Setter(AccessLevel.NONE)
    @NotNull
    @Column(name = "date_modified")
    private Date dateModified = new Date();
}
