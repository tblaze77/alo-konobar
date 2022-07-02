package com.example.ekonobarserver.repository;

import com.example.ekonobarserver.model.Category;
import com.example.ekonobarserver.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {
    @Query(value = "select COUNT(*) from category c", nativeQuery = true)
    Integer getNumberOfCategories();
}
