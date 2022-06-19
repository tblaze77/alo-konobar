package com.example.ekonobarserver.service.mapper;

import com.example.ekonobarserver.model.*;
import com.example.ekonobarserver.model.dto.BranchProductPostDTO;
import com.example.ekonobarserver.model.dto.OrderPostDTO;
import com.example.ekonobarserver.model.dto.OrderRowPostDTO;
import com.example.ekonobarserver.repository.BranchProductRepository;
import com.example.ekonobarserver.repository.BranchRepository;
import com.example.ekonobarserver.repository.BranchTableRepository;
import com.example.ekonobarserver.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
public class CustomMapper {

    @Autowired
    BranchTableRepository branchTableRepository;

    @Autowired
    BranchProductRepository branchProductRepository;

    @Autowired
    ProductRepository productRepository;


    @Autowired
    BranchRepository branchRepository;

    /**
     * custom mapper method to convert orderPostDTO to order entity
     * @param  orderPostDTO
     * @return order
     */
    public Order orderPostDTOToOrder(OrderPostDTO orderPostDTO){

        Order order = new Order();

        //setting default attributes like date and employee
        System.out.println(orderPostDTO.getOrderDate());
        order.setOrderDate(orderPostDTO.getOrderDate());
        order.setEmployee(null);
        //setting branch table but first checking if branch table exists
        order.setBranchTable(
                branchTableRepository.findById(
                        orderPostDTO.getTableId()
                ).orElseThrow(
                        ()-> new RuntimeException("Branch table not  existing")
                )
        );
        //setting branch
        order.setBranch(order.getBranchTable().getBranch());

        List<OrderRow> orderRows = new ArrayList<>();

        //converting OrderRowPostDTO to OrderRow entity
        for (OrderRowPostDTO orderRowPostDTO:orderPostDTO.getOrderRows()
             ) {
            OrderRow orderRow = new OrderRow();
            orderRow.setOrder(order);
            orderRow.setQuantity(orderRowPostDTO.getQuantity());
            //creating composite key for branch product to check if valid branch product is inserted
            BranchProductId branchProductId = new BranchProductId(order.getBranch().getId(), orderRowPostDTO.getProductId());
            //final check if branch product exist
            BranchProduct branchProduct = branchProductRepository.findById(branchProductId).orElseThrow(
                    ()-> new RuntimeException("Branch product not  existing")
            );
            //after checking, finally setting branch product
            orderRow.setBranchProduct(branchProduct);
            //adding orderRow to orderRows arrayList
            orderRows.add(orderRow);
        }
        //setting orderRows to order
        order.setOrderRows(orderRows);
        return order;
    }

    /**
     * custom mapper method to convert branchProductPostDTO to brancProduct entity
     * @param  branchProductPostDTO
     * @return branchProduct
     */
    public BranchProduct branchProductPostDTOToBranchProduct(BranchProductPostDTO branchProductPostDTO){
        BranchProduct branchProduct = new BranchProduct();
        Product product = productRepository.findById(branchProductPostDTO.getProductId()).orElseThrow(
                ()-> new RuntimeException(" Product not  existing")
        );
        Branch branch = branchRepository.findById(branchProductPostDTO.getBranchId()).orElseThrow(
                ()-> new RuntimeException(" Product not  existing")
        );
        branchProduct.setProduct(product);
        branchProduct.setBranch(branch);

        branchProduct.setDescription(branchProductPostDTO.getDescription());
        branchProduct.setQuantity(branchProductPostDTO.getQuantity());
        branchProduct.setPrice(branchProductPostDTO.getPrice());

        return branchProduct;
    }

}
