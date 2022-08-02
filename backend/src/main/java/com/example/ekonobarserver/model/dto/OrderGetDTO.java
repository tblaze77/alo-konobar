package com.example.ekonobarserver.model.dto;

import com.example.ekonobarserver.model.Branch;
import com.example.ekonobarserver.model.BranchTable;
import com.example.ekonobarserver.model.Employee;
import com.example.ekonobarserver.model.OrderRow;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class OrderGetDTO {
    @Id
    private Long id;

    private Float total;

    private String additionalInfo;

    private String status;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm", timezone = "Europe/Zagreb")
    @JsonProperty("orderDate")
    private Date orderDate;

    private Date dateCreated=new Date();

    private Date dateModified=new Date();

    //@JsonIncludeProperties({"quantity","branchProduct.productName"})
    private List<OrderRowGetDTO> orderRowsGetDto;

    private String branchName;

    private Employee employee;

    //@JsonIncludeProperties("number")
    private Integer branchTableNumber;
}
