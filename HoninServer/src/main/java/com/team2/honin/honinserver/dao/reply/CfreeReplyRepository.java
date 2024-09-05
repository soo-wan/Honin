package com.team2.honin.honinserver.dao.reply;

import com.team2.honin.honinserver.entity.CfreeReply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CfreeReplyRepository extends JpaRepository<CfreeReply, Integer> {

    List<CfreeReply> findAllBySeq(int seqNum);

    CfreeReply findByReplynum(Integer replyNum);
}
