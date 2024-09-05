package com.team2.honin.honinserver.dao.like;

import com.team2.honin.honinserver.entity.CtipLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CtipLikeRepository extends JpaRepository<CtipLike, Integer> {
    Optional<CtipLike> findByCtnumAndLikenick(int seqNum, String likenick);
}
