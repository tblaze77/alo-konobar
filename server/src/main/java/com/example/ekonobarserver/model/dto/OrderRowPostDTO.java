package com.example.ekonobarserver.model.dto;

public class OrderRowPostDTO {

    private Long productId;
    private Integer quantity;

    public OrderRowPostDTO() {
    }

    public OrderRowPostDTO(Long productId, Integer quantity) {
        this.productId = productId;
        this.quantity = quantity;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
