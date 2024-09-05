package com.team2.honin.honinserver.dao.mystore;

import com.team2.honin.honinserver.entity.StoreReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MystoreReviewRepository extends JpaRepository<StoreReview, Integer> {

    List<StoreReview> findAllByStoreidOrderByWritedateDesc(String storeid);

    StoreReview findByStoreidAndNickname(String storeid, String nickname);
}
