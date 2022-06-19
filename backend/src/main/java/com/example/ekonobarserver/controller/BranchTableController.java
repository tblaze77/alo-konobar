package com.example.ekonobarserver.controller;

import com.example.ekonobarserver.controller.endpoints.RestEndpoints;
import com.example.ekonobarserver.controller.endpoints.RestEndpointsParameters;
import com.example.ekonobarserver.model.BranchTable;
import com.example.ekonobarserver.service.api.BranchTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(RestEndpoints.API_BRANCH_TABLE)
public class BranchTableController {
    @Autowired
    BranchTableService branchTableService;


    // ---------------- GET  v1/api/branchTable/{branchTableId}  --------------- //
    /**
     * GET endpoint - get specific branchTable by its id.
     * @param id
     * @return
     */


    @GetMapping(RestEndpointsParameters.BRANCH_TABLE_ID)
    public ResponseEntity<BranchTable> getBranchTableById(@PathVariable("branchTableId") long id) {
        return new ResponseEntity<>(branchTableService.getBranchTableById(id), HttpStatus.OK);
    }

    // ---------------- GET  v1/api/branchTable  --------------- //
    /**
     * GET endpoint - list all branches in database.
     * @return
     */

    @GetMapping()
    public ResponseEntity<List<BranchTable>> getAllBranchTables(){
        return new ResponseEntity<>(branchTableService.getAllBranchTables(), HttpStatus.OK);
    }

    // ---------------- GET  v1/api/branch/{branchId}   --------------- //
    /**
     * GET endpoint - delete specific branchTables from database
     * @param id
     * @return
     */

    @GetMapping("/byBranch" + RestEndpointsParameters.BRANCH_ID)
    public ResponseEntity getBranchTablesByBranch(@PathVariable("branchId") long id) {

        List<BranchTable> branchTables = branchTableService.getAllBranchTablesByBranch(id);
        return new ResponseEntity(branchTables, HttpStatus.OK);

    }

    // ---------------- POST  v1/api/branchTable  --------------- //
    /**
     * POST endpoint - create new branchTable with given RequestBody and also forward data to keycloak endpoint
     * @param branchTable
     * @return
     */

    @PostMapping()
    public ResponseEntity<BranchTable> createNewBranchTable(@Valid @RequestBody BranchTable branchTable) {

        BranchTable createdBranchTable= branchTableService.createBranchTable(branchTable);


        return new ResponseEntity<>(createdBranchTable,HttpStatus.CREATED);
    }

    // ---------------- PUT  v1/api/branchTable/{branchTableId}   --------------- //
    /**
     * PUT endpoint - update specific branchTable by given RequestBody
     * @param branchTable
     * @param id
     * @return ResponseEntity<Branch>
     */

    @PutMapping(RestEndpointsParameters.BRANCH_TABLE_ID)
    public ResponseEntity<BranchTable> updateBranchTable(@Valid @RequestBody BranchTable branchTable, @PathVariable("branchTableId") Long id){

        BranchTable updatedBranchTable = branchTableService.updateBranchTable(branchTable,id);

        return new ResponseEntity<>(updatedBranchTable,HttpStatus.OK);
    }

    // ---------------- DELETE  v1/api/branchTable/{branchTableId}   --------------- //
    /**
     * DELETE endpoint - delete specific branchTable from database
     * @param id
     * @return
     */

    @DeleteMapping(RestEndpointsParameters.BRANCH_TABLE_ID)
    public ResponseEntity deleteBranchTable(@PathVariable("branchTableId") long id) {

        branchTableService.deleteBranchTable(id);
        return new ResponseEntity(null, HttpStatus.OK);

    }
}
