package com.example.ekonobarserver.service.api;

import com.example.ekonobarserver.model.Product;
import com.example.ekonobarserver.model.MenuItemGetDTO;

import java.util.List;

public interface ProductService {

    // --- CRUD FUNCTIONALITIES ---- //

    List<Product> getAllProducts();

    Product getProductById(long id);

    Product createProduct(Product product);

    Product updateProduct(Product product, long id);

    void deleteProduct (long id);

    // --- CUSTOM FUNCTIONALITIES --- //

    List<Product> getAllProductsByCategory(long id);

    List<Product> getAllProductsByBranch(long id);

    Product getMostSoldProductInSpecificBranch(long id);

    Product getMostSoldProductOverAll();

    List<MenuItemGetDTO> getAllAvaliableProductsByBranch(long branchTableId);

}
