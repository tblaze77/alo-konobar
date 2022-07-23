package com.example.ekonobarserver.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.ekonobarserver.controller.endpoints.RestEndpoints;
import com.example.ekonobarserver.controller.endpoints.RestEndpointsParameters;
import com.example.ekonobarserver.model.Employee;
import com.example.ekonobarserver.model.Product;
import com.example.ekonobarserver.repository.EmployeeRepository;
import com.example.ekonobarserver.service.api.EmployeeService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;

@RestController
@RequestMapping(RestEndpoints.API_EMPLOYEE)
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    @Autowired
    EmployeeRepository employeeRepository;

    // ---------------- GET v1/api/employee/token/refresh  ---------------- //


    @GetMapping("/token/refresh")
    public void getRefreshToken(HttpServletRequest request, HttpServletResponse response) throws RuntimeException, IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if(authorizationHeader!= null && authorizationHeader.startsWith("Bearer ")){
            try {

                String refreshToken = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("ewaiter".getBytes(StandardCharsets.UTF_8));
                //building verifier to check if token belongs to logged in user
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refreshToken);
                String username = decodedJWT.getSubject();
                Employee employee = employeeService.getEmployeeByUsername(username);
                List<String> roles = new ArrayList<>();
                roles.add(employee.getRole().getName());
                String accessToken = JWT.create()
                        .withSubject(employee.getUsername())
                        .withExpiresAt(new Date(System.currentTimeMillis()+ 1000*60*1))
                        .withIssuer(request.getRequestURL().toString())
                        .withClaim("roles", roles)
                        .sign(algorithm);

                String newRefreshToken = JWT.create()
                        .withSubject(employee.getUsername())
                        .withExpiresAt(new Date(System.currentTimeMillis()+ 1000*60*3))
                        .withIssuer(request.getRequestURL().toString())
                        .withClaim("roles", roles)
                        .sign(algorithm);

                Map<String,String> tokens = new HashMap<>();
                tokens.put("access_token",accessToken);
                tokens.put("refresh_token",newRefreshToken);

                response.setContentType("application/json");
                new ObjectMapper().writeValue(response.getOutputStream(), tokens);
            }catch (Exception e){
                response.setHeader("error", e.getMessage());
                response.setStatus(FORBIDDEN.value());
                Map<String,String> error = new HashMap<>();
                error.put("error_message",e.getMessage());

                response.setContentType("application/json");
                new ObjectMapper().writeValue(response.getOutputStream(), error);

            }

        }else {
            throw new RuntimeException("Refresh token is missing");
        }
    }

    // ---------------- GET  v1/api/employee/byUsername/{employeeUsername}  --------------- //
    /**
     * GET endpoint - get specific employee by its username.
     * @param username
     * @return
     */


    @GetMapping("/byUsername" + RestEndpointsParameters.EMPLOYEE_USERNAME)
    public ResponseEntity<Employee> getEmployeeByUsername(@PathVariable("employeeUsername") String username) {
        return new ResponseEntity<>(employeeService.getEmployeeByUsername(username), HttpStatus.OK);
    }

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

    @GetMapping( "/getAdminsOfBranch" + RestEndpointsParameters.BRANCH_ID)
    public ResponseEntity<List<Employee>> getAdministratorsOfBranch(@PathVariable("branchId") long id){
        return new ResponseEntity<>(employeeRepository.getAdministratorsOfSpecificBranch(id), HttpStatus.OK);
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
