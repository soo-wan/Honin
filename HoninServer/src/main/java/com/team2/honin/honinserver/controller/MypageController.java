package com.team2.honin.honinserver.controller;

import com.team2.honin.honinserver.dto.Paging;
import com.team2.honin.honinserver.entity.Member;
import com.team2.honin.honinserver.entity.view.SecondhandView;
import com.team2.honin.honinserver.entity.view.SteamedListView;
import com.team2.honin.honinserver.security.CustomSecurityConfig;
import com.team2.honin.honinserver.service.MemberService;
import com.team2.honin.honinserver.service.MypageService;
import com.team2.honin.honinserver.service.S3UploadService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

@RestController
@Log4j2
@RequestMapping("/mypage")
public class MypageController {
    @Autowired
    MemberService ms;

    @Autowired
    MypageService mps;

    @Autowired
    CustomSecurityConfig cc;

    @Autowired
    S3UploadService sus;

    @PostMapping("/updateProfile")
    public HashMap<String, Object> updateProfile(
            @ModelAttribute Member member,
            @RequestParam(value = "image", required = false) MultipartFile file) {

        HashMap<String, Object> result = new HashMap<>();

        try {
            // S3에 프로필 이미지 업로드
            if (file != null && !file.isEmpty()) {
                String profileimgUrl = sus.saveFile(file);
                member.setProfileimg(profileimgUrl); // S3 URL 설정
            }

            // 프로필 업데이트 (비밀번호 업데이트는 Member 객체의 updateProfile 메서드에서 처리)
            int num = ms.updateProfile(member);

            if (num > 0) {
                result.put("msg", "ok");
                result.put("loginUser", member);
            } else {
                result.put("msg", "fail");
            }

        } catch (IOException e) {
            e.printStackTrace();
            result.put("msg", "fail");
        }

        return result;
    }


    @PostMapping("/updateMemberUserstate/{nickname}")
    public void updateMemberUserstate(@PathVariable("nickname") String nickname) {
        ms.updateMemberUserstate(nickname);
    }

    @GetMapping("/getPostListMember/{page}/{nickname}")
    public HashMap<String, Object> getPostListMember(@PathVariable("page") int page, @PathVariable("nickname") String nickname) {
        HashMap<String, Object> result = new HashMap<>();
        //List<?> plmList = mps.getPostListMember(page, nickname); 보류
        Paging paging = new Paging();
        paging.setPage(page);
        paging.setDisplayRow(6);
        paging.calPaging();
        result.put("postList", mps.getPostListMember(paging, nickname));
        result.put("paging", paging);
        return result;
    }

    @GetMapping("/getSecondhandListMember/{page}/{nickname}")
    public HashMap<String, Object> getSecondhandListMember(
            @PathVariable("page") int page,
            @PathVariable("nickname") String nickname) {
        HashMap<String, Object> result = new HashMap<>();
        List<SecondhandView> shvList = mps.getSecondhandListMember(page, nickname);
        Paging paging = new Paging();
        paging.setPage(page);
        paging.setDisplayRow(6);
        paging.calPaging();
        result.put("paging", paging);
        result.put("secondhandList", shvList);
        return result;
    }

    @GetMapping("/getSecondhandLikeList/{page}/{nickname}")
    public HashMap<String, Object> getSecondhandLikeList(
            @PathVariable("page") int page,
            @PathVariable("nickname") String nickname) {
        HashMap<String, Object> result = new HashMap<>();
        List<SteamedListView> secondhandLikeList = mps.getSecondhandLikeList(page, nickname);

        Paging paging = new Paging();
        paging.setPage(page);
        paging.setDisplayRow(6);
        paging.calPaging();
        result.put("paging", paging);
        result.put("secondhandLikeList", secondhandLikeList);
        return result;
    }

}
