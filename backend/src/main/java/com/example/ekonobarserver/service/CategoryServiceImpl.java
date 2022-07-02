package com.example.ekonobarserver.service;

import com.example.ekonobarserver.model.Category;
import com.example.ekonobarserver.repository.CategoryRepository;
import com.example.ekonobarserver.service.api.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("categoryService")
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(long id) {
        return categoryRepository.findById(id).get();
    }

    @Override
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Category category, long id) {
        Optional<Category> categoryToUpdate = categoryRepository.findById(id);

        if(!categoryToUpdate.isPresent()){
            return null;
        }

        categoryToUpdate.get().setFullName(category.getFullName());

        return categoryRepository.save(categoryToUpdate.get());
    }

    @Override
    public void deleteCategory(long id) {
        categoryRepository.deleteById(id);
    }

    @Override
    public List<Category> getCategoryByUsername(String username) {
        return null;
    }

    @Override
    public Integer getNumberOfCategories() {
        return categoryRepository.getNumberOfCategories();
    }
}