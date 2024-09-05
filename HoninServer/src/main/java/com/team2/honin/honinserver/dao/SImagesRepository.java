package com.team2.honin.honinserver.dao;

import com.team2.honin.honinserver.entity.SImages;
import com.team2.honin.honinserver.entity.SecondHand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SImagesRepository extends JpaRepository<SImages, Integer> {

    @Modifying
    @Query("DELETE FROM SImages s WHERE s.secondHand.snum = :snum")
    void deleteBySecondhandSnum(@Param("snum") int snum);
}



