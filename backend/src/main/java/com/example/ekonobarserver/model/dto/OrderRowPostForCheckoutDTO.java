package com.example.ekonobarserver.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderRowPostForCheckoutDTO {
    private String productName;
    private Integer quantity;
}
