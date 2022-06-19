package com.example.ekonobarserver.service.mapper;

import com.example.ekonobarserver.model.BranchProduct;
import com.example.ekonobarserver.model.Order;
import com.example.ekonobarserver.model.OrderRow;
import com.example.ekonobarserver.model.dto.BranchProductForOrderGetDTO;
import com.example.ekonobarserver.model.dto.OrderGetDTO;
import com.example.ekonobarserver.model.dto.OrderRowGetDTO;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MapStructMapper {

    //------ Order model DTOs --- //
    OrderGetDTO orderToOrderGetDto(Order order);
    Order orderGetDTOToOrder(OrderGetDTO orderGetDTO);
    List<OrderGetDTO> ordersToOrderGetDTOs(List<Order> orders);

    // ---- Branch product model DTOs ---//
    BranchProductForOrderGetDTO branchProductToBranchProductGetDTO(BranchProduct branchProduct);
    BranchProduct branchProductGetDTOToBranchProduct(BranchProductForOrderGetDTO branchProductGetDTO);

    //------ Order Row model DTOs --- //
    OrderRowGetDTO orderRowToOrderRowGetDto(OrderRow orderRow);
    Order orderRowGetDTOToOrderRow(OrderGetDTO orderGetDTO);
    List<OrderRowGetDTO> OrderRowsToOrderRowGetDTOs(List<OrderRow> orderRows);
}
