package com.team2.honin.honinserver.dao.community;

import com.team2.honin.honinserver.entity.Canonymous;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CanonymousRepository extends JpaRepository<Canonymous, Integer> {
    Object findByCanum(Integer seqNum);
}
