package com.example.ekonobarserver.service;

import com.example.ekonobarserver.model.Branch;
import com.example.ekonobarserver.repository.BranchRepository;
import com.example.ekonobarserver.service.api.BranchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("branchService")
public class BranchServiceImpl implements BranchService {

    @Autowired
    BranchRepository branchRepository;

    @Override
    public List<Branch> getAllBranches() {
        return branchRepository.findAll();
    }

    @Override
    public Branch getBranchById(long id) {
        return branchRepository.findById(id).get();
    }

    @Override
    public Branch createBranch(Branch branch) {
        return branchRepository.save(branch);
    }

    @Override
    public void deleteBranch(long id) {
         branchRepository.deleteById(id);
    }

    @Override
    public Branch updateBranch(Branch branch, long id) {
        Optional<Branch> branchToUpdate = branchRepository.findById(id);

        if(!branchToUpdate.isPresent()){
            return null;
        }

        branchToUpdate.get().setBranchName(branch.getBranchName());
        branchToUpdate.get().setAddress(branch.getAddress());
        branchToUpdate.get().setCity(branch.getCity());
        branchToUpdate.get().setDescription(branch.getDescription());

        return branchRepository.save(branchToUpdate.get());
    }
}
