package com.team2.honin.honinserver.dao.like;

import com.team2.honin.honinserver.entity.CfreeLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CfreeLikeRepository extends JpaRepository<CfreeLike, Integer> {
    Optional<CfreeLike> findByCfnumAndLikenick(int seqNum, String likenick);
}
