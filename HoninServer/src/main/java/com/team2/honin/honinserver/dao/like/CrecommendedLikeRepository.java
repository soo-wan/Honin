package com.team2.honin.honinserver.dao.like;

import com.team2.honin.honinserver.entity.CrecommendedLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CrecommendedLikeRepository extends JpaRepository<CrecommendedLike, Integer> {

    Optional<CrecommendedLike> findByCrnumAndLikenick(int seqNum, String likenick);
}
