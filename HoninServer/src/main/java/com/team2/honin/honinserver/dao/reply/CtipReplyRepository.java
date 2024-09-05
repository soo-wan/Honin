package com.team2.honin.honinserver.dao.reply;

import com.team2.honin.honinserver.entity.CtipReply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CtipReplyRepository extends JpaRepository<CtipReply, Integer> {
    List<CtipReply> findAllBySeq(int seqNum);

    CtipReply findByReplynum(Integer replyNum);
}
