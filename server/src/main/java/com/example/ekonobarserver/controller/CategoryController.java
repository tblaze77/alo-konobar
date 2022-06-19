package com.example.ekonobarserver.controller;

import com.example.ekonobarserver.controller.endpoints.RestEndpoints;
import com.example.ekonobarserver.controller.endpoints.RestEndpointsParameters;
import com.example.ekonobarserver.model.Category;
import com.example.ekonobarserver.service.api.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(RestEndpoints.API_CATEGORY)
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    // ---------------- GET  v1/api/category/{categoryId}  --------------- //
    /**
     * GET endpoint - get specific employee by its id.
     * @param id
     * @return
     */


    @GetMapping(RestEndpointsParameters.CATEGORY_ID)
    public ResponseEntity<Category> getCategoryById(@PathVariable("categoryId") long id) {
        return new ResponseEntity<>(categoryService.getCategoryById(id), HttpStatus.OK);
    }

    // ---------------- GET  v1/api/category  --------------- //
    /**
     * GET endpoint - list all categories in database.
     * @return
     */

    @GetMapping()
    public ResponseEntity<List<Category>> getAllCategories(){
        return new ResponseEntity<>(categoryService.getAllCategories(), HttpStatus.OK);
    }



    // ---------------- POST  v1/api/category  --------------- //
    /**
     * POST endpoint - create new employee with given RequestBody and also forward data to keycloak endpoint
     * @param category
     * @return
     */

    @PostMapping()
    public ResponseEntity<Category> createNewCategory(@Valid @RequestBody Category category) {

        Category createdCategory= categoryService.createCategory(category);


        return new ResponseEntity<>(createdCategory,HttpStatus.CREATED);
    }

    // ---------------- PUT  v1/api/category/{categoryId}   --------------- //
    /**
     * PUT endpoint - update specific category by given RequestBody
     * @param category
     * @param id
     * @return ResponseEntity<Category>
     */

    @PutMapping(RestEndpointsParameters.CATEGORY_ID)
    public ResponseEntity<Category> updateCategory(@Valid @RequestBody Category category, @PathVariable("categoryId") Long id){

        Category updatedCategory = categoryService.updateCategory(category,id);

        return new ResponseEntity<>(updatedCategory,HttpStatus.OK);
    }

    // ---------------- DELETE  v1/api/category/{categoryId}   --------------- //
    /**
     * DELETE endpoint - delete specific employees from database
     * @param id
     * @return
     */

    @DeleteMapping(RestEndpointsParameters.CATEGORY_ID)
    public ResponseEntity deleteCategory(@PathVariable("categoryId") long id) {

        categoryService.deleteCategory(id);
        return new ResponseEntity(null, HttpStatus.OK);

    }
}
