package com.example.ekonobarserver.repository;

import com.example.ekonobarserver.model.BranchProduct;
import com.example.ekonobarserver.model.BranchProductId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BranchProductRepository extends JpaRepository<BranchProduct, BranchProductId> {
    @Query(value = "select * from public.branch_product bp where bp.branch_id=:branchId and bp.product_id = (select p.product_id from product p where p.product_name like :productName)", nativeQuery = true)
    BranchProduct findBranchProductOnBranchIdAndProductName(@Param("branchId") long branchId, @Param("productName") String productName);

    /**
     * Query to get all branch products from branch where specified branch_table_id belong
     * @param branchTableId
     * @return
     */
    @Query(value="select * from branch_product bp join branch_table bt on bp.branch_id=bt.branch_id where bt.branch_table_id=:branchTableId", nativeQuery = true)
    List<BranchProduct> findBranchProductsOnBranchTableId(@Param("branchTableId") long branchTableId);

    /**
     * Query to get all branch products from specific branch
     * @param branchId
     * @return
     */
    @Query(value="select * from branch_product bp where bp.branch_id=:branchId", nativeQuery = true)
    List<BranchProduct> findBranchProductsFromSpecificBranch(@Param("branchId") long branchId);

}
