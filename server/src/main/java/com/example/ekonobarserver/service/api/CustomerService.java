package com.example.ekonobarserver.service.api;

import com.example.ekonobarserver.model.Customer;
import java.util.List;

public interface CustomerService {
    // --- CRUD FUNCTIONALITIES ---- //

    List<Customer> getAllCustomers();

    Customer getCustomerById(long id);

    Customer createCustomer(Customer customer);

    Customer updateCustomer(Customer customer, long id);

    void deleteCustomer(long id);

}
