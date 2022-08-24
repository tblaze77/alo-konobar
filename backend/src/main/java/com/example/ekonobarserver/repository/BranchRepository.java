package com.example.ekonobarserver.repository;

import com.example.ekonobarserver.model.Branch;
import com.example.ekonobarserver.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BranchRepository extends JpaRepository<Branch, Long> {
    /**
     * Query to get branch by sent branch table id
     * @param branchId
     * @return
     */
    @Query(value = "select * from branch b where b.branch_id=:branchTableId", nativeQuery = true)
    Branch getBranchByBranchTableId(@Param("branchTableId") Long branchId);

}
