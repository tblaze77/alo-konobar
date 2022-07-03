package com.example.ekonobarserver.service.api;

import com.example.ekonobarserver.model.BranchProduct;
import com.example.ekonobarserver.model.BranchProductId;

import java.util.List;

public interface BranchProductService {
    // --- CRUD FUNCTIONALITIES ---- //

    /**
     * Method used to retreive all branch products avaliable in database
     * @return List<Branch>
     */
    List<BranchProduct> getAllBranchProducts();

    BranchProduct getBranchProductById(BranchProductId id);

    BranchProduct getBranchProductByBranchIdAndProductName(long branchId, String productName);

    BranchProduct createBranchProduct(BranchProduct branchProduct);

    void deleteBranchProduct(BranchProductId id);

    BranchProduct updateBranchProduct(BranchProduct branchProduct, BranchProductId id);

}
