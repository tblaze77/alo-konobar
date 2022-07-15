package com.example.ekonobarserver.service;

import com.example.ekonobarserver.model.Employee;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import com.example.ekonobarserver.repository.BranchRepository;
import com.example.ekonobarserver.repository.EmployeeRepository;
import com.example.ekonobarserver.service.api.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service("EmployeeService")
public class EmployeeServiceImpl implements EmployeeService, UserDetailsService {
    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    BranchRepository branchRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
         Employee employee = employeeRepository.findByUsername(username);
         if(employee == null){
             System.out.println("user not found in database");
             throw new UsernameNotFoundException("user not found in database");
         }else {
             System.out.println("user found in database"+ username);
         }
         //convert employee role to simpleGrantedAuthority format
         Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
         authorities.add(new SimpleGrantedAuthority(employee.getRole().getName()));

         return new User(employee.getUsername(), employee.getPassword(), authorities);
    }

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
        employee.setPassword(passwordEncoder.encode(employee.getPassword()));
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
        employeeToUpdate.get().setRole(employee.getRole());
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
