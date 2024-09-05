package com.team2.honin.honinserver.dao.mystore;

import com.team2.honin.honinserver.entity.view.StoreReviewInfoView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoreReviewInfoViewRepository extends JpaRepository<StoreReviewInfoView, Integer> {
    List<StoreReviewInfoView> findAllByNickname(String nickname);
}
