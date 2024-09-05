package com.team2.honin.honinserver.controller;

import com.team2.honin.honinserver.dto.Paging;
import com.team2.honin.honinserver.dto.Post;
import com.team2.honin.honinserver.entity.Member;
import com.team2.honin.honinserver.entity.category.CommunityCategory;
import com.team2.honin.honinserver.service.CommunityService;
import com.team2.honin.honinserver.service.MemberService;
import com.team2.honin.honinserver.service.S3UploadService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;

@Log4j2
@RestController
@RequestMapping("/community")
@RequiredArgsConstructor
public class CommunityController {

    @Data
    public static class Like {
        private String seq;
        private int seqNum;
        private String likenick;
    }

    @Data
    public static class Reply {
        private String seq;
        private Integer seqNum;
        private Integer replyNum;
        private String writer;
        private String content;
    }

    private final CommunityService cs;
    private final S3UploadService sus;
    private final MemberService ms;

    @GetMapping("/getPostList/{page}/{tableName}")
    public HashMap<String, Object> getPostList(@PathVariable("page") int page, @PathVariable("tableName") String tableName) {
        HashMap<String, Object> result = new HashMap<>();
        Paging paging = new Paging();
        paging.setPage(page);
        paging.setDisplayRow(6);
        paging.calPaging();
        result.put("postList", cs.getPostList(paging, tableName));
        result.put("paging", paging);
        return result;
    }

    /**
     * seq(기본키 컬럼명)으로 테이블을 구분하고
     * seqNum(기본키 값)으로 게시글을 조회합니다.
     */
    @GetMapping("/getPostOne/{seq}/{seqNum}")
    public HashMap<String, Object> getPostOne(@PathVariable("seq") String seq, @PathVariable("seqNum") Integer seqNum) {
        HashMap<String, Object> result = new HashMap<>();
        result.put("post", cs.getPostOne(seq, seqNum));
        return result;
    }

    /**
     * 조회수를 1 증가시킵니다.
     */
    @PostMapping("/updateReadCount/{seq}/{seqNum}")
    public void updateReadCount(@PathVariable("seq") String seq, @PathVariable("seqNum") Integer seqNum) {
        cs.updateReadCount(seq, seqNum);
    }

    /**
     * entity/category/CommunityCategory 의 enum class 목록들을 조회합니다
     */
    @GetMapping("/getCommunityCategoryList")
    public HashMap<String, Object> getCommunityCategoryList() {
        HashMap<String, Object> result = new HashMap<>();
        result.put("categoryList", CommunityCategory.values());
        return result;
    }

    /**
     * 게시글을 등록합니다
     */
    @PostMapping("/writePost")
    public HashMap<String, Object> writePost(@RequestBody Post post) {
        HashMap<String, Object> result = new HashMap<>();
        result.put("num", cs.writePost(post));
        result.put("msg", "success");
        return result;
    }

    /**
     * 게시글을 수정합니다
     */
    @PostMapping("/updatePost")
    public HashMap<String, Object> updatePost(@RequestBody Post post) {
        HashMap<String, Object> result = new HashMap<>();
        cs.updatePost(post);
        result.put("msg", "success");
        return result;
    }


    /**
     * 게시글에 좋아요를 1 증가시킵니다.
     */
    @PostMapping("/likePost")
    public HashMap<String, Object> likePost(@RequestBody Like likeinfo) {
        HashMap<String, Object> result = new HashMap<>();
        cs.likePost(likeinfo);
        result.put("msg", "ok");
        return result;
    }

    /**
     * 게시글의 좋아요를 취소합니다.
     */
    @PostMapping("/unlikePost")
    public HashMap<String, Object> unlikePost(@RequestBody Like likeinfo) {
        HashMap<String, Object> result = new HashMap<>();
        cs.unlikePost(likeinfo);
        result.put("msg", "ok");
        return result;
    }

    /**
     * 게시글에 대한 로그인유저의 좋아요 여부를 확인합니다.
     */
    @GetMapping("/getLikeState")
    public HashMap<String, Object> getLikeState(
            @RequestParam("seq") String seq,
            @RequestParam("seqNum") int seqNum,
            @RequestParam("likenick") String likenick) {
        HashMap<String, Object> result = new HashMap<>();
        Like like = new Like();
        like.setSeq(seq);
        like.setSeqNum(seqNum);
        like.setLikenick(likenick);
        result.put("likeState", cs.getLikeState(like));
        return result;
    }

    /**
     * seq(기본키 컬럼명)과 seqNum(기본키 값)에 해당하는 글의 댓글목록을 조회합니다.
     */
    @GetMapping("/getReplyList/{seq}/{seqNum}")
    public HashMap<String, Object> getReplyList(
            @PathVariable("seq") String seq, @PathVariable("seqNum") int seqNum) {
        HashMap<String, Object> result = new HashMap<>();
        result.put("replyList", cs.getReplyList(seq, seqNum));
        return result;
    }

    @PostMapping("/imgupload")
    public HashMap<String, Object> imgupload( @RequestParam("image") MultipartFile file){

        HashMap<String, Object> result = new HashMap<String, Object>();
        try {
            // 서비스단의 화일 업로드 메서드를 호출해서 파일을 저장
            String uploadFilePathName = sus.saveFile( file );
            result.put("image", file.getOriginalFilename());
            result.put("savefilename", uploadFilePathName);
        } catch (IllegalStateException | IOException e) {
            e.printStackTrace();
        }

        return result;
    }

    @PostMapping("/writeReply")
    public HashMap<String, Object> writeReply(@RequestBody Reply reply) {
        HashMap<String, Object> result = new HashMap<>();
        cs.writeReply(reply);
        return result;
    }

    @PostMapping("/deleteReply")
    public HashMap<String, Object> deleteReply(@RequestBody Reply reply) {
        HashMap<String, Object> result = new HashMap<>();
        cs.deleteReply(reply);
        return result;
    }

    @PostMapping("/updateReply")
    public HashMap<String, Object> updateReply(@RequestBody Reply reply) {
        HashMap<String, Object> result = new HashMap<>();
        cs.updateReply(reply);
        return result;
    }

    @PostMapping("/deletePost")
    public HashMap<String, Object> deletePost(@RequestBody Post post) {
        HashMap<String, Object> result = new HashMap<>();
        cs.deletePost(post);
        result.put("msg", "success");
        return result;
    }

    @GetMapping("getWriterInfo/{nickname}")
    public HashMap<String, Object> getWriterInfo(@PathVariable("nickname") String nickname) {
        HashMap<String, Object> result = new HashMap<>();
        Member mem = ms.getMemberByNickname(nickname);
        result.put("email", mem.getEmail());
        result.put("profileimg", mem.getProfileimg());
        return result;
    }
}
