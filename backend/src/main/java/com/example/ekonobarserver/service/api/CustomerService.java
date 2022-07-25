package com.example.ekonobarserver.service.api;

import com.example.ekonobarserver.model.Customer;
import java.util.List;
import java.util.UUID;

public interface CustomerService {
    // --- CRUD FUNCTIONALITIES ---- //

    List<Customer> getAllCustomers();

    Customer getCustomerById(UUID id);

    Customer createCustomer(Customer customer);

    Customer updateCustomer(Customer customer, UUID id);

    void deleteCustomer(UUID id);

}
