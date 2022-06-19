package com.example.ekonobarserver.service;

import com.example.ekonobarserver.model.BranchProductId;
import com.example.ekonobarserver.model.OrderRow;
import com.example.ekonobarserver.model.Product;
import com.example.ekonobarserver.repository.BranchProductRepository;
import com.example.ekonobarserver.repository.OrderRepository;
import com.example.ekonobarserver.repository.OrderRowRepository;
import com.example.ekonobarserver.service.api.BranchProductService;
import com.example.ekonobarserver.service.api.OrderRowService;
import com.example.ekonobarserver.service.api.OrderService;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("OrderRowService")
public class OrderRowServiceImpl implements OrderRowService {
    @Autowired
    OrderRowRepository orderRowRepository;

    @Autowired
    BranchProductRepository branchProductRepository;

    @Autowired
    OrderService orderService;

    @Override
    public List<OrderRow> getAllOrderRows() {
        return orderRowRepository.findAll();
    }

    @Override
    public OrderRow getOrderRowById(long id) {
        return orderRowRepository.findById(id).get();
    }

    @Override
    public OrderRow createOrderRow(OrderRow orderRow) {

        Float price = branchProductRepository.findById(orderRow.getBranchProduct().getBranchProductId()).get().getPrice();
        orderRow.setSubtotal(price*orderRow.getQuantity());
        orderService.updateTotalInOrder(orderRow.getOrder().getId(),orderRow);
        return orderRowRepository.save(orderRow);
    }

    @Override
    public OrderRow updateOrderRow(OrderRow orderRow, long id) {
        Optional<OrderRow> orderRowToUpdate = orderRowRepository.findById(id);

        if(!orderRowToUpdate.isPresent()){
            return null;
        }

        orderRowToUpdate.get().setOrder(orderRow.getOrder());
        orderRowToUpdate.get().setBranchProduct(orderRow.getBranchProduct());
        orderRowToUpdate.get().setQuantity(orderRow.getQuantity());
        orderRowToUpdate.get().setSubtotal(orderRow.getSubtotal());

        return orderRowRepository.save(orderRowToUpdate.get());
    }

    @Override
    public void deleteOrderRow(long id) {
         orderRowRepository.deleteById(id);
    }

    @Override
    public List<OrderRow> getAllOrderRowsByOrder(long id) {
        return orderRowRepository.listAllOrderRowsByOrderId(id);
    }

    @Override
    public Integer getNumberOfSoldProductInSpecificBranch(long branchId, long productId) {
    List<OrderRow> orderRows = orderRowRepository.findAll();
    Integer sumOfSoldProducts = 0;
    BranchProductId branchProductId = new BranchProductId(branchId, productId);
    for (OrderRow orderRow: orderRows) {
            if(orderRow.getBranchProduct().getBranchProductId().equals(branchProductId)){
                                sumOfSoldProducts = sumOfSoldProducts + orderRow.getQuantity();
            }
        }
        return sumOfSoldProducts;
    }
}
