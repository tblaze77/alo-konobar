package com.example.ekonobarserver.controller;

import com.example.ekonobarserver.controller.endpoints.RestEndpoints;
import com.example.ekonobarserver.controller.endpoints.RestEndpointsParameters;
import com.example.ekonobarserver.model.OrderRow;
import com.example.ekonobarserver.model.dto.OrderRowGetDTO;
import com.example.ekonobarserver.service.api.OrderRowService;
import com.example.ekonobarserver.service.mapper.MapStructMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(RestEndpoints.API_ORDER_ROW)
public class OrderRowController {

    @Autowired
    OrderRowService orderRowService;

    @Autowired
    MapStructMapper mapper;

    // ---------------- GET  v1/api/orderRow/{orderRowId}  --------------- //
    /**
     * GET endpoint - get specific order row by its id.
     * @param orderRowId
     * @return
     */


    @GetMapping(RestEndpointsParameters.ORDER_ROW_ID)
    public ResponseEntity<OrderRowGetDTO> getOrderRowById(@PathVariable("orderRowId") long orderRowId) {
        OrderRow orderRow = orderRowService.getOrderRowById(orderRowId);
        System.out.println(orderRow.getBranchProduct().getBranch().getBranchName());
        return new ResponseEntity<>(mapper.orderRowToOrderRowGetDto(orderRow), HttpStatus.OK);
    }

    // ---------------- GET  v1/api/orderRow  --------------- //
    /**
     * GET endpoint - list all order rows in database.
     * @return List<OrderRow>
     */

    @GetMapping()
    public ResponseEntity<List<OrderRow>> getAllOrderRow(){
        return new ResponseEntity<>(orderRowService.getAllOrderRows(), HttpStatus.OK);
    }

    // ---------------- GET  v1/api/orderRow/byOrder/{orderId}  --------------- //
    /**
     * GET endpoint - list all order rows by order id in database.
     * @param
     * @return List<OrderRow>
     */

    @GetMapping("/byOrder" + RestEndpointsParameters.ORDER_ID)
    public ResponseEntity<List<OrderRow>> getAllOrderRowsByOrderId(@PathVariable("orderId") long orderId){
        return new ResponseEntity<>(orderRowService.getAllOrderRowsByOrder(orderId), HttpStatus.OK);
    }


    // ---------------- POST  v1/api/orderRow  --------------- //
    /**
     * POST endpoint - create new order row with given RequestBody
     * @param orderRow
     * @return
     */

    @PostMapping()
    public ResponseEntity<OrderRow> createNewOrderRow(@Valid @RequestBody OrderRow orderRow) {

        OrderRow createdOrderRow= orderRowService.createOrderRow(orderRow);

        return new ResponseEntity<>(createdOrderRow,HttpStatus.CREATED);
    }

    // ---------------- PUT  v1/api/orderRow/{orderRowId}   --------------- //
    /**
     * PUT endpoint - update specific order row by given RequestBody
     * @param orderRow
     * @param id
     * @return ResponseEntity<BranchProduct>
     */

    @PutMapping(RestEndpointsParameters.ORDER_ROW_ID)
    public ResponseEntity<OrderRow> updateOrderRow(@Valid @RequestBody OrderRow orderRow, @PathVariable("orderRowId") Long id){


        try{
            OrderRow updateOrderRow = orderRowService.updateOrderRow(orderRow, id);
            return new ResponseEntity<>(updateOrderRow,HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @DeleteMapping(RestEndpointsParameters.ORDER_ROW_ID)
    public ResponseEntity deleteOrderRow(@PathVariable("orderRowId") long id)  {


        try{
        orderRowService.deleteOrderRow(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
