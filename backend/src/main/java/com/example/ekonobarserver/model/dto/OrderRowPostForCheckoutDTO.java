package com.example.ekonobarserver.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderRowPostForCheckoutDTO {
    private Long productName;
    private Integer quantity;
}
