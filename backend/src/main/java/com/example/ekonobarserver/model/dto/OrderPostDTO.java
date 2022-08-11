package com.example.ekonobarserver.model.dto;

import com.example.ekonobarserver.model.enums.PaymentMethod;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class OrderPostDTO {
    private Long branchId;
    private Long tableId;
    private List<OrderRowPostDTO> orderRows= new ArrayList<>();

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm", timezone = "Europe/Zagreb")
    @NotNull
    @JsonProperty("orderDate")
    private Date orderDate;
    private Long employeeId;
    public OrderPostDTO() {
    }

    public OrderPostDTO(Long branchId, Long tableId, List<OrderRowPostDTO> orderRows) {
        this.branchId = branchId;
        this.tableId = tableId;
        this.orderRows = orderRows;
        this.employeeId = employeeId;
    }

    public Long getBranchId() {
        return branchId;
    }

    public void setBranchId(Long branchId) {
        this.branchId = branchId;
    }

    public Long getTableId() {
        return tableId;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {this.employeeId = employeeId;}

    public void setTableId(Long tableId) {
        this.tableId = tableId;
    }

    public List<OrderRowPostDTO> getOrderRows() {
        return orderRows;
    }

    public void setOrderRows(List<OrderRowPostDTO> orderRows) {
        this.orderRows = orderRows;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate=orderDate;
    }

    public Date getOrderDate() {return orderDate;}

}
