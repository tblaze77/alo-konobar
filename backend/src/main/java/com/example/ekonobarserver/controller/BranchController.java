package com.example.ekonobarserver.controller;


import com.example.ekonobarserver.controller.endpoints.RestEndpoints;
import com.example.ekonobarserver.controller.endpoints.RestEndpointsParameters;
import com.example.ekonobarserver.model.Branch;
import com.example.ekonobarserver.service.BranchServiceImpl;
import com.example.ekonobarserver.service.api.BranchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(RestEndpoints.API_BRANCH)
public class BranchController {

    @Autowired
    BranchService branchService;


    // ---------------- GET  v1/api/branch/{branchId}  --------------- //
    /**
     * GET endpoint - get specific employee by its id.
     * @param id
     * @return
     */


    @GetMapping(RestEndpointsParameters.BRANCH_ID)
    public ResponseEntity<Branch> getBranchById(@PathVariable("branchId") long id) {
        return new ResponseEntity<>(branchService.getBranchById(id),HttpStatus.OK);
    }

    // ---------------- GET  v1/api/branch  --------------- //
    /**
     * GET endpoint - list all branches in database.
     * @return
     */

    @GetMapping()
    public ResponseEntity<List<Branch>> getAllBranches(){
        return new ResponseEntity<>(branchService.getAllBranches(), HttpStatus.OK);
    }



    // ---------------- POST  v1/api/branch  --------------- //
    /**
     * POST endpoint - create new employee with given RequestBody and also forward data to keycloak endpoint
     * @param branch
     * @return
     */
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @PostMapping()
    public ResponseEntity<Branch> createNewBranch(@Valid @RequestBody Branch branch) {

        Branch createdBranch= branchService.createBranch(branch);


        return new ResponseEntity<>(createdBranch,HttpStatus.CREATED);
    }

    // ---------------- PUT  v1/api/branch/{branchId}   --------------- //
    /**
     * PUT endpoint - update specific employee by given RequestBody
     * @param branch
     * @param id
     * @return ResponseEntity<Branch>
     */

    @PutMapping(RestEndpointsParameters.BRANCH_ID)
    public ResponseEntity<Branch> updateBranch(@Valid @RequestBody Branch branch, @PathVariable("branchId") Long id){

        Branch updatedBranch = branchService.updateBranch(branch,id);

        return new ResponseEntity<>(updatedBranch,HttpStatus.OK);
    }

    // ---------------- DELETE  v1/api/branch/{branchId}   --------------- //
    /**
     * DELETE endpoint - delete specific employees from database
     * @param id
     * @return
     */

    @DeleteMapping(RestEndpointsParameters.BRANCH_ID)
    public ResponseEntity deleteBranch(@PathVariable("branchId") long id) {

     branchService.deleteBranch(id);
     return new ResponseEntity(null, HttpStatus.OK);

    }
}
