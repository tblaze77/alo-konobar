package com.example.ekonobarserver.repository;

import com.example.ekonobarserver.model.BranchTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BranchTableRepository extends JpaRepository<BranchTable, Long> {
}
