package com.example.ekonobarserver.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class BranchProductPostDTO {
    @JsonProperty("product")
    private Long productId;

    @JsonProperty("branch")
    private Long branchId;

    @JsonProperty("description")
    private String description;

    @JsonProperty("quantity")
    private Integer quantity;

    @JsonProperty("price")
    private Float price;
}
