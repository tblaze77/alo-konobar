package com.example.ekonobarserver.repository;

import com.example.ekonobarserver.model.MenuItemGetDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MenuItemRespository extends JpaRepository<MenuItemGetDTO,Long> {
    /**
     * Method to get all avaliable products in branch by sending branch table id (method used in initially scanning QR code)
     * @param branchTableId
     * @return List<Product>
     */
    @Query(value = "select bp.branch_id, bp.product_id, p.product_name, bp.price, bp.description, p.category_id, c.full_name from category c left join product p on c.category_id=p.category_id left join branch_product bp on p.product_id=bp.product_id left join branch b on bp.branch_id=b.branch_id left join branch_table bt on b.branch_id = bt.branch_id where bt.branch_table_id =:branchTableId", nativeQuery = true)
    List<MenuItemGetDTO> listAllAvaliableProductsInSpecificBranchByBranchTableId (@Param("branchTableId") long branchTableId);
}
