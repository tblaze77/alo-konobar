package com.example.ekonobarserver.service;

import com.example.ekonobarserver.model.Employee;
import com.example.ekonobarserver.repository.BranchRepository;
import com.example.ekonobarserver.repository.EmployeeRepository;
import com.example.ekonobarserver.service.api.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("EmployeeService")
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    BranchRepository branchRepository;

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee getEmployeeById(long id) {
        return employeeRepository.findById(id).get();
    }

    @Override
    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public Employee updateEmployee(Employee employee, long id) {
        Optional<Employee> employeeToUpdate = employeeRepository.findById(id);

        if(!employeeToUpdate.isPresent()){
            return null;
        }
        employeeToUpdate.get().setFirstname(employee.getFirstname());
        employeeToUpdate.get().setLastname(employee.getLastname());
        employeeToUpdate.get().setUsername(employee.getUsername());
        employeeToUpdate.get().setDescription(employee.getDescription());
        employeeToUpdate.get().setBranch(employee.getBranch());

        return employeeRepository.save(employeeToUpdate.get());
    }

    @Override
    public void deleteEmployee(long id) {
        employeeRepository.deleteById(id);
    }

    @Override
    public List<Employee> getAllEmployeesByBranch(long id) {
        return branchRepository.findById(id).get().getEmployees();
    }

}
