package com.example.ekonobarserver.service.api;

import com.example.ekonobarserver.model.Employee;
import com.example.ekonobarserver.model.Product;

import java.util.List;

public interface EmployeeService {

    // --- CRUD FUNCTIONALITIES ---- //

    List<Employee> getAllEmployees();

    Employee getEmployeeById(long id);

    Employee createEmployee(Employee employee);

    Employee updateEmployee(Employee employee, long id);

    void deleteEmployee (long id);

    // --- CUSTOM FUNCTIONALITIES --- //

    List<Employee> getAllEmployeesByBranch(long id);
}
