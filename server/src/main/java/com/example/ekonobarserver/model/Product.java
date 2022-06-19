package com.example.ekonobarserver.model;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Data
@Table(name="product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long id;

    //@Pattern(regexp="^[a-zA-Z0-9_].{3,50}$",message="length must be at least 3")
    @NotNull
    @Column(name = "product_name")
    private String productName;

    @ManyToOne
    @JoinColumn(name="category_id", referencedColumnName = "category_id")
    private Category category;

    @Setter(AccessLevel.NONE)
    @NotNull
    @Column(name = "date_created")
    private Date dateCreated=new Date();

    @Setter(AccessLevel.NONE)
    @NotNull
    @Column(name = "date_modified")
    private Date dateModified=new Date();

    @Column(name = "description")
    private String description;

    //todo - add branch_id

    //updates date modified filed
    @PreUpdate
    protected void preUpdate() {
        this.dateModified= new Date();
    }
}
