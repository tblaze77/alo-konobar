package com.example.ekonobarserver.service.api;

import com.example.ekonobarserver.model.Branch;

import java.util.List;

public interface BranchService {

    // --- CRUD FUNCTIONALITIES ---- //

    /**
     * Method used to retreive all branches avaliable in database
     * @return List<Branch>
     */
    List<Branch> getAllBranches();

    Branch getBranchById(long id);

    Branch createBranch(Branch branch);

    void deleteBranch(long id);

    Branch updateBranch(Branch branch, long id);

}
