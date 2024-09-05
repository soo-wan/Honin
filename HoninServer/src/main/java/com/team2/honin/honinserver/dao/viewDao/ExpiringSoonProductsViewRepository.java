package com.team2.honin.honinserver.dao.viewDao;

import com.team2.honin.honinserver.entity.view.ExpiringSoonProductsView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpiringSoonProductsViewRepository extends JpaRepository<ExpiringSoonProductsView, Integer> {

    @Query(value = "SELECT * FROM expiringsoonproductsview " +
            "WHERE owner = :nickname " +
            "LIMIT 5",
            nativeQuery = true)
    List<ExpiringSoonProductsView> findByOwner(String nickname);
}
