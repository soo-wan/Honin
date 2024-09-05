package com.team2.honin.honinserver.dao.reply;

import com.team2.honin.honinserver.entity.CanonymousReply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CanonymousReplyRepository extends JpaRepository<CanonymousReply, Integer> {
    List<CanonymousReply> findAllBySeq(int seqNum);

    CanonymousReply findByReplynum(Integer replyNum);
}
