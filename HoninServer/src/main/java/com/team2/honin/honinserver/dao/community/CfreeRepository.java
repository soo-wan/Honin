package com.team2.honin.honinserver.dao.community;

import com.team2.honin.honinserver.entity.Cfree;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CfreeRepository extends JpaRepository<Cfree, Integer> {


    Object findByCfnum(Integer seqNum);

}
