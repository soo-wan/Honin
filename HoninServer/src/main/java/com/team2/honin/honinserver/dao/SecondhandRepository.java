package com.team2.honin.honinserver.dao;

import com.team2.honin.honinserver.entity.SecondHand;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface SecondhandRepository extends JpaRepository<SecondHand, Long> {

    Optional<SecondHand> findBySnum(Integer snum);

    @Modifying
    @Transactional
    @Query("UPDATE SecondHand s SET s.readcount = s.readcount + 1 WHERE s.snum = :num")
    void updateReadCount(int num);

    void deleteBySnum(@Param("snum") int snum);

    @Modifying
    @Transactional
    @Query("UPDATE SecondHand s SET s.state = 'N' WHERE s.state = 'Y' AND s.snum = :snum")
    void stateChangeYtoN(@Param("snum") Integer snum);

    @Modifying
    @Transactional
    @Query("UPDATE SecondHand s SET s.state = 'Y' WHERE s.state = 'N' AND s.snum = :snum")
    void stateChangeNtoY(@Param("snum") Integer snum);
}
