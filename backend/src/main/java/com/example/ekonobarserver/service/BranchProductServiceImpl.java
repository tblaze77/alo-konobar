package com.example.ekonobarserver.service;

import com.example.ekonobarserver.model.BranchProduct;
import com.example.ekonobarserver.model.BranchProductId;
import com.example.ekonobarserver.model.dto.MenuItemGetDTO;
import com.example.ekonobarserver.repository.BranchProductRepository;
import com.example.ekonobarserver.service.api.BranchProductService;
import com.example.ekonobarserver.service.mapper.CustomMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("branchProductServiceImpl")
public class BranchProductServiceImpl implements BranchProductService {
    @Autowired
    BranchProductRepository branchProductRepository;

    @Autowired
    CustomMapper customMapper;

    @Override
    public List<BranchProduct> getAllBranchProducts() {
        return branchProductRepository.findAll();
    }

    @Override
    public BranchProduct getBranchProductById(BranchProductId id) {
        return branchProductRepository.findById(id).get();
    }

    @Override
    public BranchProduct createBranchProduct(BranchProduct branchProduct) {
        return branchProductRepository.save(branchProduct);
    }

    @Override
    public void deleteBranchProduct(BranchProductId id) {
        branchProductRepository.deleteById(id);
    }

    @Override
    public BranchProduct updateBranchProduct(BranchProduct branchProduct, BranchProductId id) {
        Optional<BranchProduct> branchProductToUpdate = branchProductRepository.findById(id);

        if(!branchProductToUpdate.isPresent()) {
            // todo exception
        }

        if(branchProduct.getDescription() != null)branchProductToUpdate.get().setDescription(branchProduct.getDescription());
        if(branchProduct.getPrice() != null) branchProductToUpdate.get().setPrice(branchProduct.getPrice());
        if(branchProduct.getQuantity()!= null) branchProductToUpdate.get().setQuantity(branchProduct.getQuantity());

        return branchProductRepository.save(branchProductToUpdate.get());
    }

    @Override
    public BranchProduct getBranchProductByBranchIdAndProductName(long branchId, String productName) {
        return branchProductRepository.findBranchProductOnBranchIdAndProductName(branchId, productName);
    }

    @Override
    public List<MenuItemGetDTO> getAllBranchProductsOnBranchTableId(long branchTableId) {
        return customMapper.branchProductListToMenuItemGetDTOs(branchProductRepository.findBranchProductsOnBranchTableId(branchTableId));
    }
}
