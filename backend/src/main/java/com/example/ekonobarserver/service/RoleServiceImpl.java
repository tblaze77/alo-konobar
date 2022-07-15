package com.example.ekonobarserver.service;

import com.example.ekonobarserver.model.Role;
import com.example.ekonobarserver.repository.RoleRepository;
import com.example.ekonobarserver.service.api.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleServiceImpl implements RoleService {
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Role createRole(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public Role updateRole(long id, Role role) {
         Optional<Role> roleToUpdate = roleRepository.findById(id);

         roleToUpdate.get().setName(role.getName());

         return roleRepository.save(roleToUpdate.get());
    }

    @Override
    public void deleteRole(long id) {
         roleRepository.deleteById(id);
    }
}
