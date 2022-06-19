package com.example.ekonobarserver.model.dto;

import com.example.ekonobarserver.model.Branch;
import com.example.ekonobarserver.model.Product;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class BranchProductForOrderGetDTO {

    @JsonIncludeProperties("productName")
    private Product product;

    @JsonIncludeProperties("branchName")
    private Branch branch;

    @JsonProperty("unitPrice")
    private Float price;

}
