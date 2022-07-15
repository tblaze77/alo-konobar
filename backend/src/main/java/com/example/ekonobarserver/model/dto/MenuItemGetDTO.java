package com.example.ekonobarserver.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
public class MenuItemGetDTO {
    @Id
    @JsonProperty("productId")
    private Long productId;

    @JsonProperty("branchId")
    private Long branchId;

    @JsonProperty("productName")
    private String productName;

    @JsonProperty("price")
    private Float price;

    @JsonProperty("description")
    private String description;

    @JsonProperty("quantity")
    private Integer quantity;

    @JsonProperty("categoryId")
    private Long categoryId;

    @JsonProperty("categoryName")
    private String fullName;
}
