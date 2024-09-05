package com.team2.honin.honinserver.dao.like;

import com.team2.honin.honinserver.entity.SLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SecondhandLikeRepository extends JpaRepository<SLike, Long> {
    Optional<SLike> findBySnumAndLikenick(Integer snum, String likenick);

    boolean existsBySnumAndLikenick(int snum, String likenick);

}
