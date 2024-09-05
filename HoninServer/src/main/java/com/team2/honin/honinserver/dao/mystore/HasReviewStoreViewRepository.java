package com.team2.honin.honinserver.dao.mystore;

import com.team2.honin.honinserver.entity.view.HasReviewStoreView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HasReviewStoreViewRepository extends JpaRepository<HasReviewStoreView, Integer> {
}
