package com.example.ekonobarserver.model.dto;

import com.example.ekonobarserver.model.BranchProduct;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class OrderRowGetDTO {

    @JsonProperty("branchProduct")
    private BranchProductForOrderGetDTO branchProduct;

    @JsonProperty("subtotal")
    private Float subtotal;

    @JsonProperty("quantity")
    private Integer quantity;

}
