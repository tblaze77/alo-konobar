package com.example.ekonobarserver.controller;

import com.example.ekonobarserver.controller.endpoints.RestEndpointsParameters;
import com.example.ekonobarserver.model.Order;
import com.example.ekonobarserver.model.dto.OrderGetDTO;
import com.example.ekonobarserver.model.dto.OrderPostDTO;
import com.example.ekonobarserver.model.dto.OrderPostForCheckoutDTO;
import com.example.ekonobarserver.service.api.OrderService;
import com.example.ekonobarserver.service.mapper.MapStructMapper;
import com.example.ekonobarserver.service.mapper.CustomMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("v1/api/order")
public class OrderController {
    @Autowired
    OrderService orderService;

    @Autowired
    CustomMapper customMapper;

    @Autowired
    MapStructMapper mapper;

    // ---------------- GET  v1/api/order/{orderId}  --------------- //
    /**
     * GET endpoint - get specific order by its id.
     * @param id
     * @return
     */


    @GetMapping("/{orderId}")
    public ResponseEntity<OrderGetDTO> getOrderById(@PathVariable("orderId") long id) {
        return new ResponseEntity<>(customMapper.orderToOrderGetDTO(orderService.getOrderById(id)),HttpStatus.OK);
    }

    // ---------------- GET  v1/api/order  --------------- //
    /**
     * GET endpoint - list all orders in database.
     * @return
     */

    @GetMapping()
    public ResponseEntity<List<OrderGetDTO>> getAllOrders(){
        return new ResponseEntity<>(customMapper.ordersToOrderGetDTOs(orderService.getAllOrders()), HttpStatus.OK);
    }

    // ---------------- GET  v1/api/order/byBranch/{branchId}  --------------- //
    /**
     * GET endpoint - list all orders from specific branch.
     * @return
     */

    @GetMapping("byBranch" + RestEndpointsParameters.BRANCH_ID)
    public ResponseEntity<List<OrderGetDTO>> getAllOrdersFromBranch(@PathVariable("branchId") long id){
        return new ResponseEntity<>(customMapper.ordersToOrderGetDTOs(orderService.getOrdersFromBranch(id)), HttpStatus.OK);
    }




    // ---------------- POST  v1/api/order  --------------- //

    /**
     * POST endpoint - create new order with given RequestBody
     *
     * @param order
     * @return
     */
/*
    @PostMapping()
    public ResponseEntity<Order> createNewOrder(@Valid @RequestBody Order order) {

        Order createdOrder = orderService.createOrder(order);


        return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
    }
*/

    // ---------------- POST  v1/api/order  --------------- //
    /**
     * POST endpoint - create new order with given RequestBody
     * @param order
     * @return
     */

    @PostMapping("/new")
    public ResponseEntity<OrderGetDTO> createNewOrder(@Valid @RequestBody OrderPostDTO orderPostDTO) {

        Order order = customMapper.orderPostDTOToOrder(orderPostDTO);

        Order createdOrder= orderService.createOrder(order);

        OrderGetDTO orderGetDTO = customMapper.orderToOrderGetDTO(createdOrder);
        return new ResponseEntity<>(orderGetDTO,HttpStatus.CREATED);
    }

    @PostMapping("/forCheckout")
    public ResponseEntity<OrderGetDTO> createNewOrderForCheckout(@Valid @RequestBody OrderPostForCheckoutDTO orderPostDTO) {

        Order order = customMapper.orderPostDTOForCheckoutToOrder(orderPostDTO);

        Order createdOrder= orderService.createOrder(order);

        OrderGetDTO orderGetDTO = customMapper.orderToOrderGetDTO(createdOrder);
        return new ResponseEntity<>(orderGetDTO,HttpStatus.CREATED);
    }



    // ---------------- GET  v1/api/order?from={dateFrom}&to={dateTo}  --------------- //
    /**
     * POST endpoint - create new order with given RequestBody
     * @param  dateFrom
     * @param dateTo
     * @return
     */

    @GetMapping("/timeRange")
    public ResponseEntity<List<Order>> getOrderFromSpecificRange(
            @RequestParam("dateFrom") String dateFrom,
            @RequestParam("dateTo") String dateTo
    ) {

        return new ResponseEntity<>(orderService.getOrdersFromTimeRange(dateFrom,dateTo),HttpStatus.CREATED);
    }





    // ---------------- PUT  v1/api/order/{orderId}   --------------- //
    /**
     * PUT endpoint - update specific order by given RequestBody
     * @param order
     * @param id
     * @return ResponseEntity<Order>
     */

    @PutMapping("/{orderId}")
    public ResponseEntity<Order> updateOrder(@Valid @RequestBody Order order, @PathVariable("orderId") Long id){

        Order updateOrder = orderService.updateOrder(order,id);

        return new ResponseEntity<>(updateOrder,HttpStatus.OK);
    }

    // ---------------- DELETE  v1/api/category/{categoryId}   --------------- //
    /**
     * DELETE endpoint - delete specific order from database
     * @param id
     * @return
     */

    @DeleteMapping("/{orderId}")
    public ResponseEntity deleteOrder(@PathVariable("{orderId}") long id) {
        orderService.deleteOrder(id);
        return new ResponseEntity(null, HttpStatus.OK);
    }
}
