package com.example.ekonobarserver.service.api;

import com.example.ekonobarserver.model.BranchTable;

import java.util.List;

public interface BranchTableService {

    // --- CRUD FUNCTIONALITIES ---- //

    List<BranchTable> getAllBranchTables();

    BranchTable getBranchTableById(long id);

    BranchTable createBranchTable(BranchTable branchTable);

    BranchTable updateBranchTable(BranchTable branchTable, long id);

    void deleteBranchTable(long id);

    // --- CUSTOM FUNCTIONALITIES --- //

    List<BranchTable> getAllBranchTablesByBranch(long id);


}
