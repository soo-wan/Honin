package com.team2.honin.honinserver.service;

import com.team2.honin.honinserver.controller.CommunityController;
import com.team2.honin.honinserver.dao.community.*;
import com.team2.honin.honinserver.dao.like.CanonymousLikeRepository;
import com.team2.honin.honinserver.dao.like.CfreeLikeRepository;
import com.team2.honin.honinserver.dao.like.CrecommendedLikeRepository;
import com.team2.honin.honinserver.dao.like.CtipLikeRepository;
import com.team2.honin.honinserver.dao.reply.CanonymousReplyRepository;
import com.team2.honin.honinserver.dao.reply.CfreeReplyRepository;
import com.team2.honin.honinserver.dao.reply.CrecommendedReplyRepository;
import com.team2.honin.honinserver.dao.reply.CtipReplyRepository;
import com.team2.honin.honinserver.dto.Paging;
import com.team2.honin.honinserver.dto.Post;
import com.team2.honin.honinserver.entity.*;
import jakarta.transaction.Transactional;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CommunityService {

    private final CfreeRepository cfr;
    private final CtipRepository ctr;
    private final CrecommendedRepository crr;
    private final CanonymousRepository car;
    private final CfreeLikeRepository cflr;
    private final CtipLikeRepository ctlr;
    private final CrecommendedLikeRepository crlr;
    private final CanonymousLikeRepository calr;
    private final CfreeReplyRepository cfrr;
    private final CtipReplyRepository ctrr;
    private final CrecommendedReplyRepository crrr;
    private final CanonymousReplyRepository carr;
    private final CommunityDao cdao;

    public List<?> getPostList(Paging paging, String tableName) {
        return cdao.getPostList(paging, tableName);
    }

    public Object getPostOne(String seq, Integer seqNum) {
        return switch (seq) {
            case "cfnum" -> cfr.findByCfnum(seqNum);
            case "ctnum" -> ctr.findByCtnum(seqNum);
            case "crnum" -> crr.findByCrnum(seqNum);
            case "canum" -> car.findByCanum(seqNum);
            default -> null;
        };
    }

    public void updateReadCount(String seq, Integer seqNum) {
        switch (seq) {
            case "cfnum":
                Cfree cfree = (Cfree) cfr.findByCfnum(seqNum);
                cfree.setReadcount(cfree.getReadcount() + 1);
                cfr.save(cfree);
                break;
            case "ctnum":
                Ctip ctip = (Ctip) ctr.findByCtnum(seqNum);
                ctip.setReadcount(ctip.getReadcount() + 1);
                ctr.save(ctip);
                break;
            case "crnum":
                Crecommended crec = (Crecommended) crr.findByCrnum(seqNum);
                crec.setReadcount(crec.getReadcount() + 1);
                crr.save(crec);
                break;
            case "canum":
                Canonymous cano = (Canonymous) car.findByCanum(seqNum);
                cano.setReadcount(cano.getReadcount() + 1);
                car.save(cano);
                break;
            default:
                break;
        }
    }

    public int writePost(Post post) {
        switch (post.getSeqname()) {
            case "cfnum":
                Cfree cfree = new Cfree();
                cfree.setWriter(post.getWriter());
                cfree.setTitle(post.getTitle());
                cfree.setContent(post.getContent());
                cfree.setImage(post.getImage());
                cfree.setSavefilename(post.getSavefilename());
                cfr.save(cfree);
                return cfree.getCfnum();
            case "ctnum":
                Ctip ctip = new Ctip();
                ctip.setWriter(post.getWriter());
                ctip.setTitle(post.getTitle());
                ctip.setContent(post.getContent());
                ctip.setImage(post.getImage());
                ctip.setSavefilename(post.getSavefilename());
                ctr.save(ctip);
                return ctip.getCtnum();
            case "crnum":
                Crecommended crecommended = new Crecommended();
                crecommended.setWriter(post.getWriter());
                crecommended.setTitle(post.getTitle());
                crecommended.setContent(post.getContent());
                crecommended.setImage(post.getImage());
                crecommended.setSavefilename(post.getSavefilename());
                crr.save(crecommended);
                return crecommended.getCrnum();
            case "canum":
                Canonymous canonymous = new Canonymous();
                canonymous.setWriter(post.getWriter());
                canonymous.setTitle(post.getTitle());
                canonymous.setContent(post.getContent());
                canonymous.setImage(post.getImage());
                canonymous.setSavefilename(post.getSavefilename());
                car.save(canonymous);
                return canonymous.getCanum();
            default:
                return 1;
        }
    }

    public void likePost(CommunityController.Like likeinfo) {
        switch (likeinfo.getSeq()) {
            case "cfnum":
                CfreeLike cf = new CfreeLike();
                cf.setCfnum(likeinfo.getSeqNum());
                cf.setLikenick(likeinfo.getLikenick());
                cflr.save(cf);
                break;
            case "ctnum":
                CtipLike ct = new CtipLike();
                ct.setCtnum(likeinfo.getSeqNum());
                ct.setLikenick(likeinfo.getLikenick());
                ctlr.save(ct);
                break;
            case "crnum":
                CrecommendedLike cr = new CrecommendedLike();
                cr.setCrnum(likeinfo.getSeqNum());
                cr.setLikenick(likeinfo.getLikenick());
                crlr.save(cr);
                break;
            case "canum":
                CanonymousLike ca = new CanonymousLike();
                ca.setCanum(likeinfo.getSeqNum());
                ca.setLikenick(likeinfo.getLikenick());
                calr.save(ca);
                break;
            default:
                break;
        }
    }

    public void unlikePost(CommunityController.Like likeinfo) {
        switch (likeinfo.getSeq()) {
            case "cfnum":
                Optional<CfreeLike> cflike = cflr.findByCfnumAndLikenick(likeinfo.getSeqNum(), likeinfo.getLikenick());
                cflike.ifPresent(cfreeLike -> cflr.delete(cfreeLike));
                break;
            case "ctnum":
                Optional<CtipLike> ctlike = ctlr.findByCtnumAndLikenick(likeinfo.getSeqNum(), likeinfo.getLikenick());
                ctlike.ifPresent(ctipLike -> ctlr.delete(ctipLike));
                break;
            case "crnum":
                Optional<CrecommendedLike> crlike = crlr.findByCrnumAndLikenick(likeinfo.getSeqNum(), likeinfo.getLikenick());
                crlike.ifPresent(crecommendedLike -> crlr.delete(crecommendedLike));
                break;
            case "canum":
                Optional<CanonymousLike> calike = calr.findByCanumAndLikenick(likeinfo.getSeqNum(), likeinfo.getLikenick());
                calike.ifPresent(canonymousLike -> calr.delete(canonymousLike));
                break;
            default:
                break;
        }
    }

    public boolean getLikeState(CommunityController.Like likeinfo) {
        switch (likeinfo.getSeq()) {
            case "cfnum":
                Optional<CfreeLike> cflike = cflr.findByCfnumAndLikenick(likeinfo.getSeqNum(), likeinfo.getLikenick());
                return cflike.isPresent();
            case "ctnum":
                Optional<CtipLike> ctlike = ctlr.findByCtnumAndLikenick(likeinfo.getSeqNum(), likeinfo.getLikenick());
                return ctlike.isPresent();
            case "crnum":
                Optional<CrecommendedLike> crlike = crlr.findByCrnumAndLikenick(likeinfo.getSeqNum(), likeinfo.getLikenick());
                return crlike.isPresent();
            case "canum":
                Optional<CanonymousLike> calike = calr.findByCanumAndLikenick(likeinfo.getSeqNum(), likeinfo.getLikenick());
                return calike.isPresent();
            default:
                return false;
        }
    }


    public List<?> getReplyList(String seq, int seqNum) {
        return switch (seq) {
            case "cfnum" -> cfrr.findAllBySeq(seqNum);
            case "ctnum" -> ctrr.findAllBySeq(seqNum);
            case "crnum" -> crrr.findAllBySeq(seqNum);
            case "canum" -> carr.findAllBySeq(seqNum);
            default -> null;
        };
    }

    @Builder
    public void updatePost(Post post) {
        switch(post.getSeqname()){
            case "cfnum":
                Cfree cfree = (Cfree) cfr.findByCfnum(post.getSeqnum());
                cfree.setTitle(post.getTitle());
                cfree.setContent(post.getContent());
                if(!post.getImage().isEmpty()){
                    cfree.setImage(post.getImage());
                }
                if(!post.getSavefilename().isEmpty()){
                    cfree.setSavefilename(post.getSavefilename());
                }
                cfr.save(cfree);
                break;
            case "ctnum":
                Ctip ctip = (Ctip) ctr.findByCtnum(post.getSeqnum());
                ctip.setTitle(post.getTitle());
                ctip.setContent(post.getContent());
                if(!post.getImage().isEmpty()){
                    ctip.setImage(post.getImage());
                }
                if(!post.getSavefilename().isEmpty()){
                    ctip.setSavefilename(post.getSavefilename());
                }
                ctr.save(ctip);
                break;
            case "crnum":
                Crecommended crecommended = (Crecommended) crr.findByCrnum(post.getSeqnum());
                crecommended.setTitle(post.getTitle());
                crecommended.setContent(post.getContent());
                if(!post.getImage().isEmpty()){
                    crecommended.setImage(post.getImage());
                }
                if(!post.getSavefilename().isEmpty()){
                    crecommended.setSavefilename(post.getSavefilename());
                }
                crr.save(crecommended);
                break;
            case "canum":
                Canonymous canonymous = (Canonymous) car.findByCanum(post.getSeqnum());
                canonymous.setTitle(post.getTitle());
                canonymous.setContent(post.getContent());
                if(!post.getImage().isEmpty()){
                    canonymous.setImage(post.getImage());
                }
                if(!post.getSavefilename().isEmpty()){
                    canonymous.setSavefilename(post.getSavefilename());
                }
                car.save(canonymous);
                break;
        }
    }

    public void writeReply(CommunityController.Reply reply) {
        switch(reply.getSeq()){
            case "cfnum":
                CfreeReply cfreply = new CfreeReply();
                cfreply.setSeq(reply.getSeqNum());
                cfreply.setWriter(reply.getWriter());
                cfreply.setContent(reply.getContent());
                cfrr.save(cfreply);
                break;
            case "ctnum":
                CtipReply ctreply = new CtipReply();
                ctreply.setSeq(reply.getSeqNum());
                ctreply.setWriter(reply.getWriter());
                ctreply.setContent(reply.getContent());
                ctrr.save(ctreply);
                break;
            case "crnum":
                CrecommendedReply crreply = new CrecommendedReply();
                crreply.setSeq(reply.getSeqNum());
                crreply.setWriter(reply.getWriter());
                crreply.setContent(reply.getContent());
                crrr.save(crreply);
                break;
            case "canum":
                CanonymousReply careply = new CanonymousReply();
                careply.setSeq(reply.getSeqNum());
                careply.setWriter(reply.getWriter());
                careply.setContent(reply.getContent());
                carr.save(careply);
                break;
        }
    }

    public void deleteReply(CommunityController.Reply reply) {
        switch(reply.getSeq()){
            case "cfnum":
                CfreeReply cfreply = cfrr.findByReplynum(reply.getReplyNum());
                cfrr.delete(cfreply);
                break;
            case "ctnum":
                CtipReply ctreply = ctrr.findByReplynum(reply.getReplyNum());
                ctrr.delete(ctreply);
                break;
            case "crnum":
                CrecommendedReply crreply = crrr.findByReplynum(reply.getReplyNum());
                crrr.delete(crreply);
                break;
            case "canum":
                CanonymousReply careply = carr.findByReplynum(reply.getReplyNum());
                carr.delete(careply);
                break;
        }
    }

    public void updateReply(CommunityController.Reply reply) {
        switch(reply.getSeq()){
            case "cfnum":
                CfreeReply cfreply = cfrr.findByReplynum(reply.getReplyNum());
                cfreply.setContent(reply.getContent());
                cfrr.save(cfreply);
                break;
            case "ctnum":
                CtipReply ctreply = ctrr.findByReplynum(reply.getReplyNum());
                ctreply.setContent(reply.getContent());
                ctrr.save(ctreply);
                break;
            case "crnum":
                CrecommendedReply crreply = crrr.findByReplynum(reply.getReplyNum());
                crreply.setContent(reply.getContent());
                crrr.save(crreply);
                break;
            case "canum":
                CanonymousReply careply = carr.findByReplynum(reply.getReplyNum());
                careply.setContent(reply.getContent());
                carr.save(careply);
                break;
        }
    }

    public void deletePost(Post post) {
        switch (post.getSeqname()) {
            case "cfnum":
                Cfree cfree = (Cfree) cfr.findByCfnum(post.getSeqnum());
                cfr.delete(cfree);
                break;
            case "ctnum":
                Ctip ctip = (Ctip) ctr.findByCtnum(post.getSeqnum());
                ctr.delete(ctip);
                break;
            case "crnum":
                Crecommended crecommended = (Crecommended) crr.findByCrnum(post.getSeqnum());
                crr.delete(crecommended);
                break;
            case "canum":
                Canonymous canonymous = (Canonymous) car.findByCanum(post.getSeqnum());
                car.delete(canonymous);
                break;
        }
    }
}
