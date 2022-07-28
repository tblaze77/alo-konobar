package com.example.ekonobarserver.repository;

import com.example.ekonobarserver.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {
    @Query(value = "select * from product p where p.product_id in (select product_id from branch_product bp where bp.branch_id=:id)", nativeQuery = true)
    List<Product> listAllProductsByBranchId (long id);

}
