package com.team2.honin.honinserver.dao.community;

import com.team2.honin.honinserver.entity.Ctip;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CtipRepository extends JpaRepository<Ctip, Integer> {
    Object findByCtnum(Integer seqNum);
}
