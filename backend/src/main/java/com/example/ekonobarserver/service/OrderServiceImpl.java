package com.example.ekonobarserver.service;

import com.example.ekonobarserver.model.Branch;
import com.example.ekonobarserver.model.Order;
import com.example.ekonobarserver.model.OrderRow;
import com.example.ekonobarserver.model.enums.PaymentMethod;
import com.example.ekonobarserver.repository.OrderRepository;
import com.example.ekonobarserver.service.api.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service("orderService")
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order getOrderById(long id) {
        return orderRepository.findById(id).get();
    }

    @Override
    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public List<Order> getOrdersFromTimeRange(String dateFrom, String dateTo) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate parsedDateFrom = LocalDate.parse(dateFrom,formatter);
        LocalDate parsedDateTo = LocalDate.parse(dateTo,formatter);
        List<Order> orders=orderRepository.getAllOrdersInSpecificTimePeriod(parsedDateFrom,parsedDateTo);
        return orders;
    }

    @Override
    public List<Order> getOrdersFromBranch(long branchId) {
        return orderRepository.getAllOrdersFromBranch(branchId);
    }

    @Override
    public Order updateOrder(Order order, long id) {
        Optional<Order> orderToUpdate = orderRepository.findById(id);

        if(!orderToUpdate.isPresent()){
            return null;
        }

        orderToUpdate.get().setTotal(order.getTotal());
        orderToUpdate.get().setBranchTable(order.getBranchTable());
        orderToUpdate.get().setOrderDate(order.getOrderDate());
        orderToUpdate.get().setStatus(order.getStatus());
        orderToUpdate.get().setAdditionalInfo(order.getAdditionalInfo());
        orderToUpdate.get().setStatus(order.getStatus());

        return orderRepository.save(orderToUpdate.get());
    }

    @Override
    public Order updateOrdersPaymentMethod(String paymentMethod, long id) {
        Optional<Order> orderToUpdate = orderRepository.findById(id);
        System.out.println("dosa san do ovdi");
        if(!orderToUpdate.isPresent()){
            return null;
        }
        if(PaymentMethod.CARD.toString().equals(paymentMethod)) orderToUpdate.get().setPaymentMethod(PaymentMethod.CARD);
        else orderToUpdate.get().setPaymentMethod(PaymentMethod.ONLINE);

        return orderRepository.save(orderToUpdate.get());
    }

    @Override
    public void deleteOrder(long id) {
        orderRepository.deleteById(id);
    }

    @Override
    public Order updateTotalInOrder(long id, OrderRow orderRow) {
        Order orderToUpdate = orderRepository.findById(id).get();
        orderToUpdate.setTotal(orderToUpdate.getTotal() + orderRow.getSubtotal());
        return orderRepository.save(orderToUpdate);
    }
}
