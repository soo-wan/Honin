package com.team2.honin.honinserver.controller;

import com.amazonaws.services.s3.AmazonS3;
import com.team2.honin.honinserver.dao.NcareerRepository;
import com.team2.honin.honinserver.dao.NpolicyRepository;
import com.team2.honin.honinserver.dto.*;
import com.team2.honin.honinserver.entity.NCImages;
import com.team2.honin.honinserver.entity.NCareer;
import com.team2.honin.honinserver.entity.NPImages;
import com.team2.honin.honinserver.entity.NPolicy;
import com.team2.honin.honinserver.security.util.CustomJWTException;
import com.team2.honin.honinserver.security.util.JWTUtil;
import com.team2.honin.honinserver.service.AdminService;
import com.team2.honin.honinserver.service.MemberService;
import com.team2.honin.honinserver.service.NoticeService;
import com.team2.honin.honinserver.service.S3UploadService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
@Log4j2
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    AdminService as;

    @Autowired
    MemberService ms;

    @Autowired
    NpolicyRepository npr;

    @Autowired
    NcareerRepository ncr;

    @Autowired
    NoticeService ns;


    @GetMapping("/refresh/{refreshToken}")
    public Map<String, Object> refresh(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable("refreshToken") String refreshToken
    ) throws CustomJWTException {
        if (refreshToken == null) throw new CustomJWTException("NULL_REFRASH");
        if (authHeader == null || !authHeader.startsWith("Bearer ") || authHeader.length() < 7)
            throw new CustomJWTException("INVALID_HEADER");

        String accessToken = authHeader.substring(7);

        if (checkExpiredToken(accessToken)) {
            log.info("Access token is still valid");
            return Map.of("accessToken", accessToken, "refreshToken", refreshToken);
        } else {
            Map<String, Object> claims = JWTUtil.validateToken(refreshToken);

            String newAccessToken = JWTUtil.generateToken(claims, 1);
            String newRefreshToken = JWTUtil.generateToken(claims, 60 * 24);

            return Map.of("accessToken", newAccessToken, "refreshToken", newRefreshToken);
        }
    }

    private boolean checkTime(Integer exp) {
        java.util.Date expDate = new java.util.Date((long) exp * (1000));//밀리초로 변환
        long gap = expDate.getTime() - System.currentTimeMillis();//현재 시간과의 차이 계산
        long leftMin = gap / (1000 * 60); //분단위 변환
        //1시간도 안남았는지..
        return leftMin < 60;
    }


    private boolean checkExpiredToken(String accessToken) {
        try {
            JWTUtil.validateToken(accessToken);
        } catch (CustomJWTException ex) {
            if (ex.getMessage().equals("Expired")) return false;
        }
        return true;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @GetMapping("/memberList")
    public HashMap<String, Object> getMemberList() {
        HashMap<String, Object> result = new HashMap<>();
        result.put("memberList", as.memberList());
        return result;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @PostMapping("/userstateChange")
    public HashMap<String, Object> userStateChange(
            @RequestParam("nickname") String nickname,
            @RequestParam("state") String newState) {
        HashMap<String, Object> result = new HashMap<>();

        try {
            as.userstateChange(nickname, newState);

            result.put("status", "success");
            result.put("msg", "유저 상태가 변경되었습니다");
        } catch (Exception e) {
            result.put("status", "error");
            result.put("msg", "유저 상태 변경에 실패했습니다");
            e.printStackTrace();
        }

        return result;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @GetMapping("/getNpolicyList/{page}")
    public Map<String, Object> getNpolicyList(@PathVariable("page") int page) {
        Paging paging = new Paging();
        paging.setPage(page);
        paging.setDisplayRow(10);
        paging.calPaging();

        Page<NPolicyResponseDTO> result = ns.getNpolicyList(paging);

        Map<String, Object> response = new HashMap<>();
        response.put("npolicyList", result.getContent());
        response.put("totalPages", result.getTotalPages());
        response.put("totalElements", result.getTotalElements());
        response.put("currentPage", result.getNumber() + 1); // 페이지 번호는 0부터 시작하므로 1을 추가

        return response;
    }

    @GetMapping("/getNcareerList/{page}")
    public Map<String, Object> getNcareerList(@PathVariable("page") int page) {
        Paging paging = new Paging();
        paging.setPage(page);
        paging.setDisplayRow(10);
        paging.calPaging();

        Page<NCareerResponseDTO> result = ns.getNCareerList(paging);

        Map<String, Object> response = new HashMap<>();
        response.put("ncareerList", result.getContent());
        response.put("totalPages", result.getTotalPages());
        response.put("totalElements", result.getTotalElements());
        response.put("currentPage", result.getNumber() + 1); // 페이지 번호는 0부터 시작하므로 1을 추가

        return response;
    }


    @Autowired
    private S3UploadService sus;

    @Autowired
    private AmazonS3 amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket; // 버킷 이름을 설정 파일에서 가져옴

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @PostMapping("/fileupload")
    public Map<String, Object> fileUpload(@RequestParam("files") List<MultipartFile> files) {
        HashMap<String, Object> result = new HashMap<>();
        List<String> fileUrls = new ArrayList<>();

        try {
            for (MultipartFile file : files) {
                // 서비스단의 파일 업로드 메서드를 호출해서 파일 저장
                String uploadFilePathName = sus.saveFile(file);

                // URL 생성 로직 개선
                String fileUrl;
                if (uploadFilePathName.startsWith("https://")) {
                    fileUrl = uploadFilePathName; // 이미 전체 URL인 경우 그대로 사용
                } else {
                    fileUrl = amazonS3Client.getUrl(bucket, uploadFilePathName).toString();
                }
                fileUrls.add(fileUrl); // 모든 파일의 URL을 리스트에 추가
            }
            result.put("savedFileNames", fileUrls);  // 파일 URL 리스트를 반환
        } catch (IllegalStateException | IOException e) {
            log.error("File upload error: ", e);
            result.put("error", "파일 업로드 중 오류가 발생했습니다.");
        }
        return result;
    }


    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @PostMapping("/npolicyWrite")
    public Map<String, Object> npolicyWrite(@RequestBody NPolicyRequestDTO request) {
        HashMap<String, Object> result = new HashMap<>();

        try {
            // 게시물 저장
            NPolicy nPolicy = request.toEntity();
            // 이미지 파일 이름 리스트를 DTO에서 받아옴
            List<String> savedFileNames = request.getSavefilename();

            if (savedFileNames != null && !savedFileNames.isEmpty()) {
                // 이미지와 함께 게시물 저장
                List<NPImages> images = new ArrayList<>();
                for (String filename : savedFileNames) {
                    NPImages npImage = new NPImages();
                    npImage.setSavefilename(filename);
                    npImage.setNPolicy(nPolicy);
                    images.add(npImage);
                }
                nPolicy.setImages(images); // 게시물 엔티티에 이미지 설정
            }

            // 게시물 및 연관된 이미지 저장
            ns.npolicyWrite(nPolicy); // 게시물 저장

            result.put("status", "success");
        } catch (Exception e) {
            log.error("Failed to insert policy", e);
            result.put("status", "error");
        }

        return result;
    }


    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @PostMapping("/ncareerWrite")
    public Map<String, Object> ncareerWrite(@RequestBody NCareerRequestDTO request) {
        HashMap<String, Object> result = new HashMap<>();

        try {
            // 게시물 저장
            NCareer nCareer = request.toEntity();
            // 이미지 파일 이름 리스트를 DTO에서 받아옴
            List<String> savedFileNames = request.getSavefilename();

            if (savedFileNames != null && !savedFileNames.isEmpty()) {
                // 이미지와 함께 게시물 저장
                List<NCImages> images = new ArrayList<>();
                for (String filename : savedFileNames) {
                    NCImages ncImage = new NCImages();
                    ncImage.setSavefilename(filename);
                    ncImage.setNCareer(nCareer);
                    images.add(ncImage);
                }
                nCareer.setImages(images); // 게시물 엔티티에 이미지 설정
            }

            // 게시물 및 연관된 이미지 저장
            ns.nCareerWrite(nCareer); // 게시물 저장

            result.put("status", "success");
        } catch (Exception e) {
            log.error("Failed to insert career", e);
            result.put("status", "error");
        }

        return result;
    }

    @GetMapping("/getNpolicy/{npnum}")
    public HashMap<String, Object> getNpolicy(@PathVariable("npnum") int npnum) {
        HashMap<String, Object> result = new HashMap<>();
        result.put("npolicy", ns.getNpolicy(npnum));
        return result;

    }

    @GetMapping("/getNcareer/{ncnum}")
    public HashMap<String, Object> getNcareer(@PathVariable("ncnum") int ncnum) {
        HashMap<String, Object> result = new HashMap<>();
        result.put("ncareer", ns.getNcareer(ncnum));
        return result;

    }

    @PostMapping("/updateNpolicy/{npnum}")
    public HashMap<String, Object> updateNpolicy(@PathVariable("npnum") int npnum, @RequestBody NPolicyRequestDTO request) {
        HashMap<String, Object> result = new HashMap<>();
        try {
            result = ns.updateNpolicy(npnum, request);
            result.put("status", "success");
        } catch (Exception e) {
            result.put("status", "error");
            result.put("message", "Failed to update policy: " + e.getMessage());
        }
        return result;
    }

    @PostMapping("/updateNcareer/{ncnum}")
    public HashMap<String, Object> updateNpolicy(@PathVariable("ncnum") int ncnum, @RequestBody NCareerRequestDTO request) {
        HashMap<String, Object> result = new HashMap<>();
        try {
            result = ns.updateNcareer(ncnum, request);
            result.put("status", "success");
        } catch (Exception e) {
            result.put("status", "error");
            result.put("message", "Failed to update policy: " + e.getMessage());
        }
        return result;
    }

    @DeleteMapping("/deleteNP/{npnum}")
    public HashMap<String, Object> deleteNP(@PathVariable("npnum") int npnum) {
        HashMap<String, Object> result = new HashMap<>();
        ns.deleteNP(npnum);
        result.put("status", "success");
        return result;
    }

    @DeleteMapping("/deleteNC/{ncnum}")
    public HashMap<String, Object> deleteNC(@PathVariable("ncnum") int ncnum) {
        HashMap<String, Object> result = new HashMap<>();
        ns.deleteNC(ncnum);
        result.put("status", "success");
        return result;
    }


}




