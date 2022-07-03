package com.example.ekonobarserver.repository;

import com.example.ekonobarserver.model.BranchProduct;
import com.example.ekonobarserver.model.BranchProductId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BranchProductRepository extends JpaRepository<BranchProduct, BranchProductId> {
    @Query(value = "select * from public.branch_product bp where bp.branch_id=:branchId and bp.product_id = (select p.product_id from product p where p.product_name like :productName)", nativeQuery = true)
    BranchProduct findBranchProductOnBranchIdAndProductName(@Param("branchId") long branchId, @Param("productName") String productName);
}
