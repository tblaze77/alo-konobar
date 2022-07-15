package com.example.ekonobarserver.service;

import com.example.ekonobarserver.model.OrderRow;
import com.example.ekonobarserver.model.Product;
import com.example.ekonobarserver.model.dto.MenuItemGetDTO;
import com.example.ekonobarserver.repository.CategoryRepository;
import com.example.ekonobarserver.repository.OrderRowRepository;
import com.example.ekonobarserver.repository.ProductRepository;
import com.example.ekonobarserver.service.api.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service("productService")
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    OrderRowRepository orderRowRepository;


    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(long id) {
        return productRepository.findById(id).get();
    }

    @Override
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Product product, long id) {
        Optional<Product> ProductToUpdate = productRepository.findById(id);

        if(!ProductToUpdate.isPresent()){
            return null;
        }
        ProductToUpdate.get().setProductName(product.getProductName());
        ProductToUpdate.get().setCategory(product.getCategory());
        ProductToUpdate.get().setDescription(product.getDescription());
        return productRepository.save(ProductToUpdate.get());
    }

    @Override
    public void deleteProduct(long id) {
        productRepository.deleteById(id);
    }

    @Override
    public List<Product> getAllProductsByCategory(long id) {
        return categoryRepository.findById(id).get().getProducts();
    }

    @Override
    public List<Product> getAllProductsByBranch(long id) {
        return productRepository.listAllProductsByBranchId(id);
    }

    @Override
    public Product getMostSoldProductInSpecificBranch(long id) {
        return null;
    }

    @Override
    public Product getMostSoldProductOverAll() {
        HashMap<Product, Integer> sumsOfProduct = new HashMap<>();
        List<OrderRow> orderRows = orderRowRepository.findAll();
        List<Product> products = productRepository.findAll();
        Integer sumOfSoldProducts = 0;
        for (Product product : products) {
            sumOfSoldProducts = 0;
            for (OrderRow orderRow: orderRows
                 ) {
                if(product.equals(orderRow.getBranchProduct().getProduct())) sumOfSoldProducts=sumOfSoldProducts+orderRow.getQuantity();
            }
            sumsOfProduct.put(product, sumOfSoldProducts);
        }

        Product mostSoldProduct = sumsOfProduct.entrySet().stream().max((entry1, entry2) -> entry1.getValue() > entry2.getValue() ? 1 : -1).get().getKey();
        return mostSoldProduct;
    }
    /*
    @Override
    public List<MenuItemGetDTO> getAllAvaliableProductsByBranch(long branchTableId) {
        List<MenuItemGetDTO> avaliableProducts = menuItemRespository.listAllAvaliableProductsInSpecificBranchByBranchTableId(branchTableId);
        return avaliableProducts;
    }
     */
}
