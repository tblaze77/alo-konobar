package com.example.ekonobarserver.model;

import lombok.Data;

@Data
public class Item {
    private String productName;
    private Integer quantity;
    private Float price;
}
