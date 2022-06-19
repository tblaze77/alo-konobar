package com.example.ekonobarserver.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity
public class MenuItemGetDTO {
    @JsonProperty("branchId")
    private Long branchId;

    @Id
    @JsonProperty("productId")
    private Long productId;

    @JsonProperty("productName")
    private String productName;

    @JsonProperty("price")
    private Float price;

    @JsonProperty("description")
    private String description;

    @JsonProperty("categoryId")
    private Long categoryId;

    @JsonProperty("categoryName")
    private String fullName;
}
