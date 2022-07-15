package com.example.ekonobarserver.controller;

import com.example.ekonobarserver.controller.endpoints.RestEndpoints;
import com.example.ekonobarserver.controller.endpoints.RestEndpointsParameters;
import com.example.ekonobarserver.model.Branch;
import com.example.ekonobarserver.model.Role;
import com.example.ekonobarserver.service.api.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(RestEndpoints.API_ROLE)
public class RoleController {

    @Autowired
    RoleService roleService;

    // ---------------- GET  v1/api/role  --------------- //

    /**
     * GET endpoint - list all roles in application
     * @return
     */
    @GetMapping()
    public ResponseEntity<List<Role>> getAllRoles(){
        return new ResponseEntity<>(roleService.getAllRoles(), HttpStatus.OK);
    }

    // ---------------- POST  v1/api/role  --------------- //

    /**
     * POST endpoint - create new role by request body
     * @return
     */
    @PostMapping()
    public ResponseEntity<Role> createRole(@Valid @RequestBody Role role){
        return new ResponseEntity<>(roleService.createRole(role), HttpStatus.OK);
    }

    // ---------------- PUT  v1/api/role/{roleId}  --------------- //

    /**
     * PUT endpoint - update existing role based on request body and sent id
     * @return
     */
    @PutMapping(RestEndpointsParameters.ROLE_ID)
    public ResponseEntity<Role> updateRole(@PathVariable("roleId") long id,@Valid @RequestBody Role role){
        return new ResponseEntity<>(roleService.updateRole(id,role), HttpStatus.OK);
    }


    // ---------------- DELETE  v1/api/role/{roleId}  --------------- //

    /**
     * DELETE endpoint - delete  role based on sent id
     * @return
     */
    @DeleteMapping(RestEndpointsParameters.ROLE_ID)
    public ResponseEntity deleteRole(@PathVariable("roleId") long id){
        roleService.deleteRole(id);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
