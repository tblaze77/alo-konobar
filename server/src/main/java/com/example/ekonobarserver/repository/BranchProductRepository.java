package com.example.ekonobarserver.repository;

import com.example.ekonobarserver.model.BranchProduct;
import com.example.ekonobarserver.model.BranchProductId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BranchProductRepository extends JpaRepository<BranchProduct, BranchProductId> {
}
