package com.example.ekonobarserver.service.api;

import com.example.ekonobarserver.model.Employee;
import com.example.ekonobarserver.model.OrderRow;

import java.util.List;

public interface OrderRowService {

    // --- CRUD FUNCTIONALITIES ---- //

    List<OrderRow> getAllOrderRows();

    OrderRow getOrderRowById(long id);

    OrderRow createOrderRow(OrderRow orderRow);

    OrderRow updateOrderRow(OrderRow orderRow, long id);

    void deleteOrderRow (long id);

    // --- CUSTOM FUNCTIONALITIES --- //
    List<OrderRow> getAllOrderRowsByOrder(long id);

    Integer getNumberOfSoldProductInSpecificBranch(long branchId, long productId);

}
