package com.example.ekonobarserver.controller;

import com.example.ekonobarserver.controller.endpoints.RestEndpoints;
import com.example.ekonobarserver.controller.endpoints.RestEndpointsParameters;
import com.example.ekonobarserver.model.Branch;
import com.example.ekonobarserver.model.BranchProduct;
import com.example.ekonobarserver.model.BranchProductId;
import com.example.ekonobarserver.model.dto.BranchProductPostDTO;
import com.example.ekonobarserver.service.api.BranchProductService;
import com.example.ekonobarserver.service.api.OrderRowService;
import com.example.ekonobarserver.service.mapper.CustomMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(RestEndpoints.API_BRANCH_PRODUCT)
public class BranchProductController {

    @Autowired
    BranchProductService branchProductService;

    @Autowired
    OrderRowService orderRowService;

    @Autowired
    CustomMapper customMapper;

    // ---------------- GET  v1/api/branchProduct/branch/{branchId}/product/{productId}  --------------- //
    /**
     * GET endpoint - get specific branch product by its id.
     * @param branchId
     * @param productId
     * @return
     */


    @GetMapping("/branch" + RestEndpointsParameters.BRANCH_ID + "/product" + RestEndpointsParameters.PRODUCT_ID)
    public ResponseEntity<BranchProduct> getBranchProductById(@PathVariable("branchId") long branchId, @PathVariable("productId") long productId) {
        BranchProductId branchProductId = new BranchProductId(branchId, productId);
        return new ResponseEntity<>(branchProductService.getBranchProductById(branchProductId), HttpStatus.OK);
    }

    // ---------------- GET  v1/api/branchProduct  --------------- //
    /**
     * GET endpoint - list all branch products in database.
     * @return List<BranchProduct>
     */

    @GetMapping()
    public ResponseEntity<List<BranchProduct>> getAllBranchProducts(){
        return new ResponseEntity<>(branchProductService.getAllBranchProducts(), HttpStatus.OK);
    }
    /**
     * GET endpoint - list all branch products in database.
     * @return List<BranchProduct>
     */
    @GetMapping("numberOfSoldProducts" + "/branch" + RestEndpointsParameters.BRANCH_ID + "/product" + RestEndpointsParameters.PRODUCT_ID)
    public ResponseEntity<Integer> getNumberOfSoldItemInSpecificBranch(@PathVariable("branchId") long branchId,@PathVariable("productId") long productId ){
        return new ResponseEntity(orderRowService.getNumberOfSoldProductInSpecificBranch(branchId,productId),HttpStatus.OK);
    }

    // ---------------- POST  v1/api/branchProduct  --------------- //
    /**
     * POST endpoint - create new branch product with given RequestBody
     * @param branchProductPostDTO
     * @return
     */

    @PostMapping()
    public ResponseEntity<BranchProduct> createNewBranchProduct(@Valid @RequestBody BranchProductPostDTO branchProductPostDTO) {

        BranchProduct createdBranchProduct= branchProductService.createBranchProduct(customMapper.branchProductPostDTOToBranchProduct(branchProductPostDTO));
        return new ResponseEntity<>(createdBranchProduct,HttpStatus.CREATED);
    }

    // ---------------- PUT  v1/api/branch/{branchId}   --------------- //
    /**
     * PUT endpoint - update specific branch product by given RequestBody
     * @param branchProduct
     * @param branchId
     * @param productId
     * @return ResponseEntity<BranchProduct>
     */

    @PutMapping("/branch" + RestEndpointsParameters.BRANCH_ID + "/product" + RestEndpointsParameters.PRODUCT_ID)
    public ResponseEntity<BranchProduct> updateBranchProduct(@Valid @RequestBody BranchProduct branchProduct, @PathVariable("branchId") Long branchId, @PathVariable("productId") Long productId){

        BranchProductId branchProductId = new BranchProductId(branchId,productId);

        try{
            BranchProduct updatedBranchProduct = branchProductService.updateBranchProduct(branchProduct,branchProductId);
            return new ResponseEntity<>(updatedBranchProduct,HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/branch" + RestEndpointsParameters.BRANCH_ID + "/product"+ RestEndpointsParameters.PRODUCT_ID)
    public ResponseEntity deleteBranchProduct(@PathVariable("branchId") long branchId, @PathVariable("productId") long productId)  {

       BranchProductId branchProductId = new BranchProductId(branchId,productId);
        try{
            branchProductService.deleteBranchProduct(branchProductId);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




}
