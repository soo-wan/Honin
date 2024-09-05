package com.team2.honin.honinserver.dao.like;

import com.team2.honin.honinserver.entity.CanonymousLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CanonymousLikeRepository extends JpaRepository<CanonymousLike, Integer> {

    Optional<CanonymousLike> findByCanumAndLikenick(int seqNum, String likenick);
}
