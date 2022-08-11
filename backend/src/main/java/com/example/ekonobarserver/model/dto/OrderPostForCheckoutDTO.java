package com.example.ekonobarserver.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderPostForCheckoutDTO {
    private Long branchId;
    private Long tableId;
    private List<OrderRowPostForCheckoutDTO> orderRows = new ArrayList<>();

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm", timezone = "Europe/Zagreb")
    @NotNull
    @JsonProperty("orderDate")
    private Date orderDate;
    private Long employeeId;
}
