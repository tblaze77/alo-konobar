package com.example.ekonobarserver.repository;

import com.example.ekonobarserver.model.Employee;
import com.example.ekonobarserver.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee,Long> {

    Employee findByUsername (String username);



    @Query(value = "select * from employee e where e.\"role\"=2 and e.branch_id=:branchId", nativeQuery = true)
    List<Employee> getAdministratorsOfSpecificBranch(@Param("branchId") Long branchId);

}
