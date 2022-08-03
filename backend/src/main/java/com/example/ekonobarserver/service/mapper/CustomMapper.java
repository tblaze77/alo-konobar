package com.example.ekonobarserver.service.mapper;

import com.example.ekonobarserver.model.*;
import com.example.ekonobarserver.model.dto.*;
import com.example.ekonobarserver.repository.*;
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

    @Autowired
    EmployeeRepository employeeRepository;


    @Autowired
    MapStructMapper mapper;

    /**
     * custom mapper method to convert orderPostDTO to order entity
     * @param  orderPostDTO
     * @return order
     */
    public Order orderPostDTOToOrder(OrderPostDTO orderPostDTO){

        Order order = new Order();

        //setting default attributes like date and employee
        order.setOrderDate(orderPostDTO.getOrderDate());
        order.setEmployee(
                employeeRepository.findById(
                        orderPostDTO.getEmployeeId()
                ).orElseThrow(
                        () -> new RuntimeException("Employee not exisiting")
                )
        );
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

    /**
     * custom mapper method to convert branchProduct to MenuItemGetDTO that will be represented to user when ordering
     * @param  branchProductList
     * @return menuItemGetDTOList
     */
    public List<MenuItemGetDTO> branchProductListToMenuItemGetDTOs(List<BranchProduct> branchProductList){
        List<MenuItemGetDTO> menuItemGetDTOList = new ArrayList<>();
        for (BranchProduct branchProduct: branchProductList) {
            MenuItemGetDTO menuItemGetDTO = new MenuItemGetDTO();
            menuItemGetDTO.setBranchId(branchProduct.getBranchProductId().getBranchId());
            menuItemGetDTO.setProductId(branchProduct.getBranchProductId().getProductId());
            menuItemGetDTO.setProductName(branchProduct.getProduct().getProductName());
            menuItemGetDTO.setPrice(branchProduct.getPrice());
            menuItemGetDTO.setDescription(branchProduct.getDescription());
            menuItemGetDTO.setQuantity(branchProduct.getQuantity());
            menuItemGetDTO.setCategoryId(branchProduct.getProduct().getCategory().getId());
            menuItemGetDTO.setFullName(branchProduct.getProduct().getCategory().getFullName());
            menuItemGetDTOList.add(menuItemGetDTO);
        }

        return menuItemGetDTOList;
    }

    public OrderGetDTO orderToOrderGetDTO(Order order){
        OrderGetDTO orderGetDTO = new OrderGetDTO();


            orderGetDTO.setId(order.getId());
            orderGetDTO.setTotal(order.getTotal());
            orderGetDTO.setAdditionalInfo(order.getAdditionalInfo());
            orderGetDTO.setStatus(order.getStatus());
            orderGetDTO.setOrderDate(order.getOrderDate());
            orderGetDTO.setDateCreated(order.getDateCreated());
            orderGetDTO.setDateModified(order.getDateModified());
            orderGetDTO.setBranchName(order.getBranch().getBranchName());
            orderGetDTO.setBranchTableNumber(order.getBranchTable().getNumber());
            orderGetDTO.setEmployee(order.getEmployee());
            List<OrderRow> orderRows = order.getOrderRows();
            List<OrderRowGetDTO> orderRowGetDTOS = new ArrayList<>();
        for (OrderRow orderRow:
             orderRows
        ) {
            OrderRowGetDTO orderRowGetDTO;
            orderRowGetDTO = mapper.orderRowToOrderRowGetDto(orderRow);
            System.out.println(orderRowGetDTO);
            orderRowGetDTOS.add(orderRowGetDTO);
        }
        orderGetDTO.setOrderRowsGetDto(orderRowGetDTOS);
            //orderGetDTO.getBranch().setBranchName(order.getBranch().getBranchName());
            //orderGetDTO.getBranchTable().setNumber(order.getBranchTable().getNumber());

            return orderGetDTO;
    }

    public List<OrderGetDTO> ordersToOrderGetDTOs(List<Order> orderList){
        List<OrderGetDTO> orderGetDTOs = new ArrayList<>();
        for (Order order: orderList) {
            OrderGetDTO orderGetDTO = new OrderGetDTO();
            orderGetDTO.setId(order.getId());
            orderGetDTO.setTotal(order.getTotal());
            orderGetDTO.setAdditionalInfo(order.getAdditionalInfo());
            orderGetDTO.setStatus(order.getStatus());
            orderGetDTO.setOrderDate(order.getOrderDate());
            orderGetDTO.setDateCreated(order.getDateCreated());
            orderGetDTO.setDateModified(order.getDateModified());
            orderGetDTO.setBranchName(order.getBranch().getBranchName());
            orderGetDTO.setBranchTableNumber(order.getBranchTable().getNumber());
            List<OrderRow> orderRows = order.getOrderRows();
            List<OrderRowGetDTO> orderRowGetDTOS = new ArrayList<>();
            for (OrderRow orderRow:
                    orderRows
            ) {
                OrderRowGetDTO orderRowGetDTO;
                orderRowGetDTO = mapper.orderRowToOrderRowGetDto(orderRow);
                System.out.println(orderRowGetDTO);
                orderRowGetDTOS.add(orderRowGetDTO);
            }
            orderGetDTO.setOrderRowsGetDto(orderRowGetDTOS);

            orderGetDTOs.add(orderGetDTO);
        }

       return orderGetDTOs;
    }
}
