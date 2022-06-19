package com.example.ekonobarserver.repository;

import com.example.ekonobarserver.model.OrderRow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRowRepository extends JpaRepository<OrderRow,Long> {

    @Query(value = "select * from order_row or2 where or2.order_id =:id", nativeQuery = true)
    List<OrderRow> listAllOrderRowsByOrderId (long id);


    //i.e. get number of sold coca-cola's in some bar all time
    @Query(value = "SELECT SUM(quantity) FROM order_row or2 WHERE or2.product_id =:productId and or2.branch_id=:branchId", nativeQuery = true)
    Integer getNumberOfSalesForSpecificProductInBranch(long productId, long branchId);
}
