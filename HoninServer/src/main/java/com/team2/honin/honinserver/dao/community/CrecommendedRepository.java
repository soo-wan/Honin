package com.team2.honin.honinserver.dao.community;

import com.team2.honin.honinserver.entity.Crecommended;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CrecommendedRepository extends JpaRepository<Crecommended, Integer> {
    Object findByCrnum(Integer seqNum);
}
