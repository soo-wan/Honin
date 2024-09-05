package com.team2.honin.honinserver.dao;

import com.team2.honin.honinserver.entity.MyFood;
import com.team2.honin.honinserver.entity.view.ExpiredProductsView;
import com.team2.honin.honinserver.entity.view.ExpiringSoonProductsView;
import com.team2.honin.honinserver.entity.view.SteamedListView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MyrefrigeratorRepository extends JpaRepository<MyFood, Integer> {

    Optional<MyFood> findByMfnum(int num);

    @Query(value = "SELECT * FROM myfood WHERE owner = :nickname ORDER BY mfnum DESC LIMIT :pageSize OFFSET :offset", nativeQuery = true)
    List<MyFood> findByOwner( @Param("nickname") String nickname,
                              @Param("offset") int offset,
                              @Param("pageSize") int pageSize);
}
