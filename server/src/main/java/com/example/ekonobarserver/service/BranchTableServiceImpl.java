package com.example.ekonobarserver.service;

import com.example.ekonobarserver.model.Branch;
import com.example.ekonobarserver.model.BranchTable;
import com.example.ekonobarserver.repository.BranchRepository;
import com.example.ekonobarserver.repository.BranchTableRepository;
import com.example.ekonobarserver.service.api.BranchTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("branchTableService")
public class BranchTableServiceImpl implements BranchTableService {

    @Autowired
    BranchTableRepository branchTableRepository;

    @Autowired
    BranchRepository branchRepository;

    @Override
    public List<BranchTable> getAllBranchTables() {
        return branchTableRepository.findAll();
    }

    @Override
    public BranchTable getBranchTableById(long id) {
        return branchTableRepository.findById(id).get();
    }

    @Override
    public BranchTable createBranchTable(BranchTable branchTable) {
        return branchTableRepository.save(branchTable);
    }

    @Override
    public BranchTable updateBranchTable(BranchTable branchTable, long id) {
        Optional<BranchTable> branchTableToUpdate = branchTableRepository.findById(id);

        if(!branchTableToUpdate.isPresent()){
            return null;
        }

        branchTableToUpdate.get().setNumber(branchTable.getNumber());
        branchTableToUpdate.get().setBranch(branchTable.getBranch());

        return branchTableRepository.save(branchTableToUpdate.get());
    }

    @Override
    public void deleteBranchTable(long id) {
         branchTableRepository.deleteById(id);
    }

    @Override
    public List<BranchTable> getAllBranchTablesByBranch(long id) {

        return branchRepository.findById(id).get().getBranchTables();
    }
}
