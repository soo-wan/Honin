package com.team2.honin.honinserver.controller;

import com.team2.honin.honinserver.dto.SecondhandRequestDTO;
import com.team2.honin.honinserver.entity.SLike;
import com.team2.honin.honinserver.entity.SReply;
import com.team2.honin.honinserver.entity.SecondHand;
import com.team2.honin.honinserver.entity.view.SecondhandView;
import com.team2.honin.honinserver.service.SImagesService;
import com.team2.honin.honinserver.service.SecondHandService;
import com.team2.honin.honinserver.service.SecondhandLikeService;
import com.team2.honin.honinserver.service.SecondhandReplyService;
import com.team2.honin.honinserver.service.viewService.SecondhandViewService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Log4j2
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/secondhand")
public class SecondHandController {

    @Autowired
    SecondHandService shs;

    @Autowired
    SImagesService sis;

    @Autowired
    SecondhandViewService svs;

    @Autowired
    SecondhandReplyService srs;

    @Autowired
    SecondhandLikeService sls;

    @GetMapping("/getSecondhandList/{page}")
    public HashMap<String, Object> getSecondhandList(
            @PathVariable("page") int page,
            @RequestParam(value = "word", required = false) String word) {
        HashMap<String, Object> result = new HashMap<>();
        Page<SecondhandView> shvPage = svs.getSecondhandList(page, word);

        result.put("paging", shvPage);
        result.put("secondhandList", shvPage.getContent());

        return result;
    }

    @GetMapping("/updateReadCount/{num}")
    public HashMap<String, Object> updateReadCount(@PathVariable("num") int num) {
        HashMap<String, Object> result = new HashMap<>();
        shs.updateReadCount(num);
        return result;
    }

    @GetMapping("/getSecondHand/{num}")
    public HashMap<String, Object> getSecondHand(@PathVariable("num") int num) {
        HashMap<String, Object> result = new HashMap<>();
        SecondhandView shv = svs.getSecondhand(num);
        result.put("secondhand", shv);
        return result;
    }

    @PostMapping("/insertSecondhand")
    public HashMap<String, Object> insertSecondhand(@RequestBody SecondhandRequestDTO request) {
        HashMap<String, Object> result = new HashMap<>();

        try {
            // 게시물 저장
            SecondHand secondHand = request.toEntity();
            Integer snum = shs.insertSecondHand(secondHand); // 게시물 저장 및 ID 반환

            // 이미지 저장
            sis.insertSecondHandImages(snum, request.getSavefilename());

            result.put("msg", "ok");
        } catch (Exception e) {
            log.error("Failed to insert secondhand", e);
            result.put("msg", "error");
            result.put("error", e.getMessage());
        }

        return result;
    }

    @PostMapping("/secondhandUpdate/{snum}")
    public HashMap<String, Object> secondhandUpdate(
            @PathVariable("snum") Integer snum,
            @RequestBody SecondhandRequestDTO requestData) {
        HashMap<String, Object> result = new HashMap<>();

        SecondHand secondHand = new SecondHand();
        secondHand.setTitle(requestData.getTitle());
        secondHand.setContent(requestData.getContent());
        secondHand.setPrice(requestData.getPrice());

        shs.secondhandUpdate(snum, secondHand);
        sis.secondhandImagesUpdate(snum, requestData.getSavefilename());
        result.put("msg", "ok");

        return result;

    }

    @DeleteMapping("/deleteSecondHand/{snum}")
    public HashMap<String, Object> deleteSecondHand(
            @PathVariable("snum") Integer snum) {
        HashMap<String, Object> result = new HashMap<>();

        shs.deleteSecondhand(snum);
        sis.deleteSecondhandImgs(snum);

        result.put("msg", "ok");
        return result;

    }

    @GetMapping("/getReplyList/{num}")
    public HashMap<String, Object> getReplyList(@PathVariable("num") Integer num) {
        HashMap<String, Object> result = new HashMap<>();
        List<SReply> replyList = srs.getReplyList(num);
        result.put("sreplyList", replyList);
        return result;
    }

    @PostMapping("/writeReply")
    public HashMap<String, Object> writeReply(@RequestBody SReply reply) {
        HashMap<String, Object> result = new HashMap<>();
        srs.writeReply(reply);
        return result;
    }

    @DeleteMapping("/deleteReply/{snum}/{srnum}")
    public HashMap<String, Object> deleteReply(@PathVariable("snum") int snum, @PathVariable("srnum") int srnum) {
        HashMap<String, Object> result = new HashMap<>();
        srs.deleteReply(snum, srnum);
        return result;
    }

    @PostMapping("/updateReply/{snum}/{srnum}")
    public HashMap<String, Object> updateReply(
            @PathVariable("snum") int snum,
            @PathVariable("srnum") int srnum,
            @RequestBody SReply sReply) {

        HashMap<String, Object> result = new HashMap<>();
        String content = sReply.getContent();

        SReply reply = new SReply();
        reply.setSnum(snum);
        reply.setSrnum(srnum);
        reply.setContent(content);

        srs.updateReply(snum, srnum, reply);

        return result;
    }

    @PostMapping("/likePost")
    public HashMap<String, Object> likePost(@RequestBody SLike sLike) {
        HashMap<String, Object> result = new HashMap<>();
        sls.addLike(sLike.getSnum(), sLike.getLikenick());
        result.put("msg", "Post liked successfully");
        return result;
    }

    @PostMapping("/unlikePost")
    public HashMap<String, Object> unlikePost(@RequestBody SLike sLike) {
        HashMap<String, Object> result = new HashMap<>();
        sls.disLike(sLike.getSnum(), sLike.getLikenick());
        result.put("msg", "Post unliked successfully");
        return result;
    }

    @GetMapping("/checkLike/{snum}/{likenick}")
    public ResponseEntity<Map<String, Boolean>> checkLike(@PathVariable int snum, @PathVariable String likenick) {
        boolean isLiked = sls.isLiked(snum, likenick);
        Map<String, Boolean> response = new HashMap<>();
        response.put("isLiked", isLiked);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/stateChange/{snum}")
    public HashMap<String, Object> stateChange(@PathVariable("snum") Integer snum) {
        HashMap<String, Object> result = new HashMap<>();
        boolean success = shs.stateChange(snum);
        result.put("Change", success ? "Success" : "Failure");
        return result;
    }

}





