package com.example.ekonobarserver.repository;

import com.example.ekonobarserver.model.Employee;
import com.example.ekonobarserver.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee,Long> {

    Employee findByUsername (String username);

}
