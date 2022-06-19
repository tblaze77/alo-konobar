package com.example.ekonobarserver.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "branch_product")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BranchProduct {
    @EmbeddedId
    private BranchProductId branchProductId = new BranchProductId();

    @JsonIgnoreProperties("orders")
    @ManyToOne
    @MapsId("branchId")
    @JoinColumn(name = "branch_id")
    private  Branch branch;

    @JsonIgnoreProperties("category")
    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private  Product product;
    /*
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "branchProduct", fetch = FetchType.LAZY)
    private List<OrderRow> orderRows = new ArrayList<>();
*/
    @Column(name = "description")
    private String description;

    @Column(name="quantity")
    private Integer quantity;

    @Column(name = "price")
    private Float price;

    @Setter(AccessLevel.NONE)
    @Column(name = "date_created")
    private Date dateCreated = new Date();

    @Setter(AccessLevel.NONE)
    @Column(name = "date_modified")
    private Date dateModified=new Date();

    @PreUpdate
    protected void preUpdate() {
        this.dateModified= new Date();
    }

}
