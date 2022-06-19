package com.example.ekonobarserver.controller;

import com.example.ekonobarserver.controller.endpoints.RestEndpoints;
import com.example.ekonobarserver.controller.endpoints.RestEndpointsParameters;
import com.example.ekonobarserver.model.Product;
import com.example.ekonobarserver.model.MenuItemGetDTO;
import com.example.ekonobarserver.service.api.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(RestEndpoints.API_PRODUCT)
public class ProductController {

    @Autowired
    ProductService productService;


    // ---------------- GET  v1/api/product/{productId}  --------------- //
    /**
     * GET endpoint - get specific employee by its id.
     * @param id

  * @return
     */
    @GetMapping(RestEndpointsParameters.PRODUCT_ID)
    public ResponseEntity<Product> getProductById(@PathVariable("productId") long id) {
        return new ResponseEntity<>(productService.getProductById(id), HttpStatus.OK);
    }

    // ---------------- GET  v1/api/product  --------------- //
    /**
     * GET endpoint - list all products in database.
     * @return
     */
    @GetMapping()
    public ResponseEntity<List<Product>> getAllProducts(){
        return new ResponseEntity<>(productService.getAllProducts(), HttpStatus.OK);
    }


    // ---------------- GET  v1/api/product/byCategory/{categoryId}  --------------- //
    /**
     * GET endpoint - get specific product from database by category id
     * @param id
     * @return
     */

    @GetMapping("/byCategory" + RestEndpointsParameters.CATEGORY_ID)
    public ResponseEntity getProductsByCategory(@PathVariable("categoryId") long id) {

        List<Product> products = productService.getAllProductsByCategory(id);
        return new ResponseEntity(products, HttpStatus.OK);

    }


    // ---------------- GET  v1/api/product/byCategory/{categoryId}  --------------- //
    /**
     * GET endpoint - get all products from database by branch id
     * @param id
     * @return
     */

    @GetMapping("/byBranch" + RestEndpointsParameters.BRANCH_ID)
    public ResponseEntity getProductsByBranch(@PathVariable("branchId") long id) {

        List<Product> products = productService.getAllProductsByBranch(id);
        return new ResponseEntity(products, HttpStatus.OK);

    }



    // ---------------- GET  v1/api/product/byCategory/{categoryId}  --------------- //
    /**
     * GET endpoint - get most sold products
     * @param
     * @return
     */

    @GetMapping("/mostSoldProduct" )
    public ResponseEntity getMostSoldProduct() {

        return new ResponseEntity(productService.getMostSoldProductOverAll(), HttpStatus.OK);

    }

    // ---------------- GET  v1/api/product/branchMenu/{branchTableId}  --------------- //
    /**
     * GET endpoint - get most sold products
     * @param
     * @return
     */

    @GetMapping("/branchMenu" + RestEndpointsParameters.BRANCH_TABLE_ID)
    public ResponseEntity<List<MenuItemGetDTO>> getBranchMenuByBranchTableId(@PathVariable("branchTableId") long id) {

        return new ResponseEntity(productService.getAllAvaliableProductsByBranch(id), HttpStatus.OK);

    }



    // ---------------- POST  v1/api/product  --------------- //
    /**
     * POST endpoint - create new employee with given RequestBody and also forward data to keycloak endpoint
     * @param
     * @return
     */

    @PostMapping()
    public ResponseEntity<Product> createNewProduct(@Valid @RequestBody Product product) {
        Product createdProduct= productService.createProduct(product);
        return new ResponseEntity<>(createdProduct,HttpStatus.CREATED);
    }

    // ---------------- PUT  v1/api/product/{productId}   --------------- //
    /**
     * PUT endpoint - update specific employee by given RequestBody
     * @param product
     * @param id
     * @return ResponseEntity<Product>
     */

    @PutMapping(RestEndpointsParameters.PRODUCT_ID)
    public ResponseEntity<Product> updateProduct(@Valid @RequestBody Product product, @PathVariable("productId") Long id){

        Product updatedProduct = productService.updateProduct(product,id);

        return new ResponseEntity<>(updatedProduct,HttpStatus.OK);
    }

    // ---------------- DELETE  v1/api/product/{productId}   --------------- //
    /**
     * DELETE endpoint - delete specific employees from database
     * @param id
     * @return
     */

    @DeleteMapping(RestEndpointsParameters.PRODUCT_ID)
    public ResponseEntity deleteProduct(@PathVariable("productId") long id) {

        productService.deleteProduct(id);
        return new ResponseEntity(null, HttpStatus.OK);

    }
}
