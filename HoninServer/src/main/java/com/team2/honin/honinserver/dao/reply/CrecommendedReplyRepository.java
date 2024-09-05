package com.team2.honin.honinserver.dao.reply;

import com.team2.honin.honinserver.entity.CrecommendedReply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CrecommendedReplyRepository extends JpaRepository<CrecommendedReply, Integer> {

    List<CrecommendedReply> findAllBySeq(int seqNum);

    CrecommendedReply findByReplynum(Integer replyNum);
}
