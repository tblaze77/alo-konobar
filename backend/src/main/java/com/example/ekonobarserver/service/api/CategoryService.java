package com.example.ekonobarserver.service.api;

import com.example.ekonobarserver.model.BranchTable;
import com.example.ekonobarserver.model.Category;

import java.util.List;

public interface CategoryService {
    // --- CRUD FUNCTIONALITIES ---- //

    List<Category> getAllCategories();

    Category getCategoryById(long id);

    Category createCategory(Category category);

    Category updateCategory(Category category, long id);

    void deleteCategory(long id);

    // --- CUSTOM FUNCTIONALITIES --- //

    List<Category> getCategoryByUsername(String username);
}
