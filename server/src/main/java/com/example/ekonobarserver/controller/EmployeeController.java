package com.example.ekonobarserver.controller;

import com.example.ekonobarserver.controller.endpoints.RestEndpoints;
import com.example.ekonobarserver.controller.endpoints.RestEndpointsParameters;
import com.example.ekonobarserver.model.Employee;
import com.example.ekonobarserver.model.Product;
import com.example.ekonobarserver.service.api.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(RestEndpoints.API_EMPLOYEE)
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;


    // ---------------- GET  v1/api/employee/{employeeId}  --------------- //
    /**
     * GET endpoint - get specific employee by its id.
     * @param id
     * @return
     */


    @GetMapping(RestEndpointsParameters.EMPLOYEE_ID)
    public ResponseEntity<Employee> getEmployeeById(@PathVariable("employeeId") long id) {
        return new ResponseEntity<>(employeeService.getEmployeeById(id), HttpStatus.OK);
    }

    // ---------------- GET  v1/api/employee  --------------- //
    /**
     * GET endpoint - list all employees in database.
     * @return
     */

    @GetMapping()
    public ResponseEntity<List<Employee>> getAllEmployees(){
        return new ResponseEntity<>(employeeService.getAllEmployees(), HttpStatus.OK);
    }

    // ---------------- GET  v1/api/employee/byBranch/{branchId}   --------------- //
    /**
     * DELETE endpoint - delete specific employees from database
     * @param id
     * @return
     */

    @GetMapping("/byBranch" + RestEndpointsParameters.BRANCH_ID)
    public ResponseEntity getEmployeesByBranch(@PathVariable("branchId") long id) {

        List<Employee> employees = employeeService.getAllEmployeesByBranch(id);
        return new ResponseEntity<>(employees, HttpStatus.OK);

    }



    // ---------------- POST  v1/api/employee  --------------- //
    /**
     * POST endpoint - create new employee with given RequestBody
     * @param employee
     * @return
     */

    @PostMapping()
    public ResponseEntity<Employee> createNewEmployee(@Valid @RequestBody Employee employee) {

        Employee createdEmployee= employeeService.createEmployee(employee);


        return new ResponseEntity<>(createdEmployee,HttpStatus.CREATED);
    }

    // ---------------- PUT  v1/api/employee/{employeeId}   --------------- //
    /**
     * PUT endpoint - update specific employee by given RequestBody
     * @param employee
     * @param id
     * @return ResponseEntity<Employee>
     */

    @PutMapping(RestEndpointsParameters.EMPLOYEE_ID)
    public ResponseEntity<Employee> updateEmployee(@Valid @RequestBody Employee employee, @PathVariable("employeeId") Long id){

        Employee updatedEmployee = employeeService.updateEmployee(employee,id);

        return new ResponseEntity<>(updatedEmployee,HttpStatus.OK);
    }

    // ---------------- DELETE  v1/api/employee/{employeeId}   --------------- //
    /**
     * DELETE endpoint - delete specific employees from database
     * @param id
     * @return
     */

    @DeleteMapping(RestEndpointsParameters.EMPLOYEE_ID)
    public ResponseEntity deleteEmployee(@PathVariable("employeeId") long id) {

        employeeService.deleteEmployee(id);
        return new ResponseEntity(null, HttpStatus.OK);

    }
}
