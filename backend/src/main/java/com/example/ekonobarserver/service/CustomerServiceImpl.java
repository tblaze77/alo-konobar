package com.example.ekonobarserver.service;

import com.example.ekonobarserver.model.Customer;
import com.example.ekonobarserver.repository.CustomerRepository;
import com.example.ekonobarserver.service.api.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service(value = "CustomerService")
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    CustomerRepository customerRepository;

    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public Customer getCustomerById(long id) {
        return customerRepository.findById(id).get();
    }

    @Override
    public Customer createCustomer(Customer employee) {
        return customerRepository.save(employee);
    }

    @Override
    public Customer updateCustomer(Customer employee, long id) {
        Optional<Customer> customerToUpdate = customerRepository.findById(id);

        if(!customerToUpdate.isPresent()){
            return null;
        }
        customerToUpdate.get().setFirstname(employee.getFirstname());
        customerToUpdate.get().setLastname(employee.getLastname());
        customerToUpdate.get().setDescription(employee.getDescription());


        return customerRepository.save(customerToUpdate.get());
    }

    @Override
    public void deleteCustomer(long id) {
        customerRepository.deleteById(id);
    }
}
