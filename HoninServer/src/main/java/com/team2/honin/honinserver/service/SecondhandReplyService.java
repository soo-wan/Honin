package com.team2.honin.honinserver.service;

import com.team2.honin.honinserver.dao.SecondhandRepository;
import com.team2.honin.honinserver.dao.reply.SecondhandReplyRepository;
import com.team2.honin.honinserver.entity.SReply;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SecondhandReplyService {

    @Autowired
    SecondhandReplyRepository srr;

    @Autowired
    SecondhandRepository shr;

    public List<SReply> getReplyList(Integer num) {
        return srr.findAllBySnumOrderBySrnum(num);
    }

    public void writeReply(SReply reply) {
        if (reply.getSnum() != null && reply.getSnum() > 0) {
            SReply sreply = new SReply();
            sreply.setSnum(reply.getSnum());
            sreply.setWriter(reply.getWriter());
            sreply.setContent(reply.getContent());
            srr.save(sreply);
        }
    }

    public void deleteReply(int snum, int srnum) {
        srr.deleteBySnumAndSrnum(snum, srnum);
    }

    public void updateReply(int snum, int srnum, SReply reply) {
        String content = reply.getContent();
        SReply sreply = new SReply();
        sreply.setSnum(snum);
        sreply.setSrnum(srnum);
        sreply.setContent(content);

        srr.updateReply(snum, srnum, content);
    }

}
