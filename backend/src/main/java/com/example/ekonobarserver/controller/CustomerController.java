package com.example.ekonobarserver.controller;

import com.example.ekonobarserver.controller.endpoints.RestEndpoints;
import com.example.ekonobarserver.controller.endpoints.RestEndpointsParameters;
import com.example.ekonobarserver.model.Customer;
import com.example.ekonobarserver.service.api.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(RestEndpoints.API_CUSTOMER)
public class CustomerController {
    @Autowired
    CustomerService customerService;


    // ---------------- GET  v1/api/customer/{customerId}  --------------- //
    /**
     * GET endpoint - get specific customer by its id.
     * @param id
     * @return
     */


    @GetMapping(RestEndpointsParameters.CUSTOMER_ID)
    public ResponseEntity<Customer> getCustomerById(@PathVariable("customerId") long id) {
        return new ResponseEntity<>(customerService.getCustomerById(id), HttpStatus.OK);
    }

    // ---------------- GET  v1/api/customer  --------------- //
    /**
     * GET endpoint - list all customers in database.
     * @return
     */

    @GetMapping()
    public ResponseEntity<List<Customer>> getAllCustomers(){
        return new ResponseEntity<>(customerService.getAllCustomers(), HttpStatus.OK);
    }



    // ---------------- POST  v1/api/customer  --------------- //
    /**
     * POST endpoint - create new customer with given RequestBody
     * @param customer
     * @return
     */

    @PostMapping()
    public ResponseEntity<Customer> createNewCustomer(@Valid @RequestBody Customer customer) {

        Customer createdCustomer= customerService.createCustomer(customer);


        return new ResponseEntity<>(createdCustomer,HttpStatus.CREATED);
    }

    // ---------------- PUT  v1/api/customer/{customerId}   --------------- //
    /**
     * PUT endpoint - update specific customer by given RequestBody
     * @param customer
     * @param id
     * @return ResponseEntity<Customer>
     */

    @PutMapping(RestEndpointsParameters.CUSTOMER_ID)
    public ResponseEntity<Customer> updateCustomer(@Valid @RequestBody Customer customer, @PathVariable("customerId") long id){

        Customer updatedCustomer = customerService.updateCustomer(customer,id);

        return new ResponseEntity<>(updatedCustomer,HttpStatus.OK);
    }

    // ---------------- DELETE  v1/api/customer/{customerId}   --------------- //
    /**
     * DELETE endpoint - delete specific customers from database
     * @param id
     * @return
     */

    @DeleteMapping(RestEndpointsParameters.CUSTOMER_ID)
    public ResponseEntity deleteCustomer(@PathVariable("customerId") long id) {

        customerService.deleteCustomer(id);
        return new ResponseEntity(null, HttpStatus.OK);

    }

}
