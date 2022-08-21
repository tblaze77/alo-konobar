package com.example.ekonobarserver.seeder;


import com.example.ekonobarserver.model.*;
import com.example.ekonobarserver.repository.*;
import com.example.ekonobarserver.service.api.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

import org.springframework.stereotype.Component;

/**
 * Component that implements CommandLinRunner and will be executed at  Spring boot application startup
 * @author toniblaz
 */
@Component
public class InitialDbSeeder implements CommandLineRunner {
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    BranchRepository branchRepository;
    @Autowired
    EmployeeRepository employeeRepository;
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    EmployeeService employeeService;
    @Autowired
    BranchTableRepository branchTableRepository;
    @Override
    public void run(String... args) throws Exception {
        loadData();
    }
    private void loadData() {
        if(roleRepository.count() == 0 ){
            Role superUserRole = new Role("SUPER_USER");
            Role adminRole = new Role("ADMIN");
            Role employeeRole = new Role("EMPLOYEE");
            Branch branch = new Branch("Flores", "Split" ,"Znjanska 2", "Odlican Kafic");
            branchRepository.save(branch);
            roleRepository.save(superUserRole);
            roleRepository.save(adminRole);
            roleRepository.save(employeeRole);
            Employee employee = new Employee("Toni","Blazevic","superuser","superuser","super user",null, superUserRole);
            employeeService.createEmployee(employee);
            BranchTable branchTable = new BranchTable(5, branch);
            branchTableRepository.save(branchTable);
            Category fuzzyDrinksCategory = new Category("Gazirana pica");
            Category warmDrinksCategory = new Category("Topli napitci");
            Category alcoholDrinksCategory = new Category("Alkoholna pica");
            categoryRepository.save(fuzzyDrinksCategory);
            categoryRepository.save(warmDrinksCategory);
            categoryRepository.save(alcoholDrinksCategory);
            Product warmCoffee = new Product("Velika s toplim", warmDrinksCategory, " ");
            Product whiteCoffee = new Product("Bijela kava", warmDrinksCategory, " ");
            Product schweppes = new Product("Schweppes", fuzzyDrinksCategory, " ");
            Product cocaCola = new Product("Coca-cola", fuzzyDrinksCategory, " ");
            Product pelinkovac = new Product("Pelinkovac", alcoholDrinksCategory, " ");
            Product orahovac = new Product("Orahovac", alcoholDrinksCategory, " ");
            productRepository.save(warmCoffee);
            productRepository.save(whiteCoffee);
            productRepository.save(schweppes);
            productRepository.save(cocaCola);
            productRepository.save(pelinkovac);
            productRepository.save(orahovac);
        }
        System.out.println("Database has been seeded ...");
    }

}
