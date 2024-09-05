package com.team2.honin.honinserver.dao.reply;

import com.team2.honin.honinserver.entity.SReply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SecondhandReplyRepository extends JpaRepository<SReply, Integer> {

    List<SReply> findAllBySnumOrderBySrnum(Integer num);

    void deleteBySnumAndSrnum(int snum, int srnum);

    @Modifying
    @Query("UPDATE SReply sr SET sr.content = :content WHERE sr.snum = :snum AND sr.srnum = :srnum")
    void updateReply(@Param("snum") int snum, @Param("srnum") int srnum, @Param("content") String content);

}
