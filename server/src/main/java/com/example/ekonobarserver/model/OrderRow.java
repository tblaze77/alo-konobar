package com.example.ekonobarserver.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Data
@Table(name = "order_row")
public class OrderRow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_row_id")
    private Long id;

    @JsonIgnoreProperties({"employee","branch","branchTable"})
    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "order_id")
    private Order order;

    @JoinColumns({
            @JoinColumn(name="branch_id", referencedColumnName="branch_id"),
            @JoinColumn(name="product_id", referencedColumnName="product_id")
    })
    @ManyToOne
    private BranchProduct branchProduct;

    @Column(name="quantity")
    private Integer quantity;

    //TODO @Transient annotation for subtotal calculation
    @Column(name = "subtotal")
    private Float subtotal;

    @Setter(AccessLevel.NONE)
    @NotNull
    @Column(name = "date_created")
    private Date dateCreated=new Date();

    @Setter(AccessLevel.NONE)
    @NotNull
    @Column(name = "date_modified")
    private Date dateModified=new Date();

    @PreUpdate
    protected void preUpdate() {
        this.dateModified= new Date();
    }

    @PrePersist
    protected void prePersist() {
        this.subtotal = this.quantity * this.branchProduct.getPrice();
    }

}
