package com.example.ekonobarserver.repository;

import com.example.ekonobarserver.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    //i.e. get all orders from certain time period
    @Query(value = "SELECT * FROM orders o WHERE o.order_date >=:dateFrom and o.order_date <=:dateTo", nativeQuery = true)
    List<Order> getAllOrdersInSpecificTimePeriod(@Param("dateFrom") LocalDate dateFrom, @Param("dateTo") LocalDate dateTo);

    //Method that retreives all orders from certain branch
    @Query(value = "select * from orders o where o.branch_id=:branchId", nativeQuery = true)
    List<Order> getAllOrdersFromBranch(@Param("branchId") Long branchId);
}
