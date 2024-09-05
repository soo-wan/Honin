package com.team2.honin.honinserver.dao.viewDao;

import com.team2.honin.honinserver.entity.view.ExpiredProductsView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpiredProductsViewRepository extends JpaRepository<ExpiredProductsView, Integer> {

    @Query(value = "SELECT * FROM expiredproductsview " +
            "WHERE owner = :nickname " +
            "LIMIT 5",
            nativeQuery = true)
    List<ExpiredProductsView> findByOwner(String nickname);
}
