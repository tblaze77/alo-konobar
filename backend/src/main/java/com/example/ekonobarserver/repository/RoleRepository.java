package com.example.ekonobarserver.repository;

import com.example.ekonobarserver.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
