package com.example.ekonobarserver.service.api;

import com.example.ekonobarserver.model.Category;
import com.example.ekonobarserver.model.Order;
import com.example.ekonobarserver.model.OrderRow;

import java.util.List;

public interface OrderService {
    // --- CRUD FUNCTIONALITIES ---- //

    List<Order> getAllOrders();

    Order getOrderById(long id);

    Order createOrder(Order order);

    Order updateOrder(Order order, long id);

    List<Order> getOrdersFromBranch (long branchId);

    List<Order> getOrdersFromTimeRange(String dateFrom, String dateTo);

    Order updateTotalInOrder(long id, OrderRow orderRow);

    void deleteOrder(long id);
}
