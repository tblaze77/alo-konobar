package com.example.ekonobarserver.model;

import com.example.ekonobarserver.model.enums.EmployeeRole;
import com.example.ekonobarserver.model.enums.PaymentMethod;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
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
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long id;

    @NotNull
    @Column(name = "total")
    private Float total = 0.0f;

    @Column(name = "additional_info")
    private String additionalInfo;

    @Column(name="status")
    private String status;


        //Date formatting
        @JsonFormat(pattern = "dd/MM/yyyy HH:mm", timezone = "Europe/Zagreb")
        @NotNull
        @Column(name = "order_date")
        private Date orderDate;

        @Setter(AccessLevel.NONE)
        @NotNull
        @Column(name = "date_created")
        private Date dateCreated=new Date();

        @Setter(AccessLevel.NONE)
        @NotNull
        @Column(name = "date_modified")
        private Date dateModified=new Date();

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "order", fetch = FetchType.LAZY)
    private List<OrderRow> orderRows = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "customer_id")
    private Customer customer;

    @JsonIncludeProperties({"firstname","lastname"})
    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "employee_id")
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "branch_id", referencedColumnName = "branch_id")
    private Branch branch;

    @JsonIncludeProperties("number")
    @ManyToOne
    @JoinColumn(name = "branch_table_id", referencedColumnName = "branch_table_id")
    private BranchTable branchTable;

    @Enumerated(EnumType.STRING)
    @Column(name="payment_method")
    private PaymentMethod paymentMethod = PaymentMethod.CASH;

    @PrePersist
    protected void prePersist(){
        for (OrderRow orderRow: this.orderRows
             ) {
            this.total = this.total + orderRow.getQuantity()*orderRow.getBranchProduct().getPrice();
        }
    }

    //updates date modified filed
    @PreUpdate
    protected void preUpdate() {
        this.dateModified= new Date();
    }


}
