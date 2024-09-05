package com.team2.honin.honinserver.dao.mystore;

import com.team2.honin.honinserver.entity.view.StoreView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreViewRepository extends JpaRepository<StoreView, Integer> {
}
