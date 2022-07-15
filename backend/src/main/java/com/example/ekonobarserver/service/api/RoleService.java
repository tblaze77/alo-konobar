package com.example.ekonobarserver.service.api;

import com.example.ekonobarserver.model.Role;

import java.util.List;

public interface RoleService {
    // --- CRUD FUNCTIONALITIES ---//

    List<Role> getAllRoles();

    Role createRole(Role role);

    Role updateRole (long id, Role role);

    void deleteRole (long id);

}
