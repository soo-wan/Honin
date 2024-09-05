package com.team2.honin.honinserver.controller;

import com.google.gson.Gson;
import com.team2.honin.honinserver.dto.KakaoProfile;
import com.team2.honin.honinserver.dto.NaverProfile;
import com.team2.honin.honinserver.dto.OAuthToken;
import com.team2.honin.honinserver.entity.Member;
import com.team2.honin.honinserver.entity.MemberRole;
import com.team2.honin.honinserver.security.CustomSecurityConfig;
import com.team2.honin.honinserver.security.util.CustomJWTException;
import com.team2.honin.honinserver.security.util.JWTUtil;
import com.team2.honin.honinserver.service.MemberService;
import com.team2.honin.honinserver.service.S3UploadService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.net.ssl.HttpsURLConnection;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;

@RestController
@Log4j2
@RequestMapping("/member")
public class MemberController {

    @Autowired
    MemberService ms;

    @Autowired
    CustomSecurityConfig cc;

    @GetMapping("/refresh/{refreshToken}")
    public Map<String, Object> refresh(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable("refreshToken") String refreshToken
    ) throws CustomJWTException {
        if (refreshToken == null) throw new CustomJWTException("NULL_REFRASH");
        if (authHeader == null || authHeader.length() < 7)
            throw new CustomJWTException("INVALID_HEADER");

        //추출한 내용의 7번째 글자부터 끝까지 추출
        String accessToken = authHeader.substring(7);

        if (checkExpiredToken(accessToken)) {  // 기간이 지나면 false, 안지났으면  true 리턴
            log.info("그대로 사용");
            return Map.of("accessToken", accessToken, "refreshToken", refreshToken);
        } else {

            // accessToken 기간 만료시  refresh 토큰으로 재 검증하여 사용자 정보 추출
            Map<String, Object> claims = JWTUtil.validateToken(refreshToken);


            // 토큰 교체
            String newAccessToken = JWTUtil.generateToken(claims, 1);
            String newRefreshToken = "";
            //if(  checkTime( (Integer)claims.get("exp") )  )
            newRefreshToken = JWTUtil.generateToken(claims, 60 * 24);
            //else
            //    newRefreshToken = refreshToken;

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

    @Autowired
    S3UploadService sus;

    @PostMapping("/fileupload")
    public HashMap<String, Object> fileupload(@RequestParam("image") MultipartFile file) {
        HashMap<String, Object> result = new HashMap<>();
        try {
            // 서비스단의 파일 업로드 메서드를 호출해서 파일 저장
            String uploadFilePathName = sus.saveFile(file);
            result.put("savefilename", uploadFilePathName);
        } catch (IllegalStateException | IOException e) {
            e.printStackTrace();
        }
        return result;
    }

    @PostMapping("/emailCheck")
    public HashMap<String, Object> emailcheck(@RequestParam("email") String email) {
        HashMap<String, Object> result = new HashMap<String, Object>();
        Member mem = ms.getMember(email);
        if (mem != null) result.put("msg", "no");
        else result.put("msg", "yes");
        return result;
    }

    @PostMapping("/nicknameCheck")
    public HashMap<String, Object> nicknameCheck(@RequestParam("nickname") String nickname) {
        HashMap<String, Object> result = new HashMap<String, Object>();
        Member mem = ms.getMemberByNickname(nickname);
        if (mem != null) result.put("msg", "no");
        else result.put("msg", "yes");
        return result;
    }


    @PostMapping("/join")
    public HashMap<String, Object> join(@RequestBody Member member) {
        HashMap<String, Object> result = new HashMap<String, Object>();
        PasswordEncoder pe = cc.passwordEncoder();
        member.setPassword(pe.encode(member.getPassword()));

        // memberRoleList가 비어있다면 기본 값으로 ROLE_USER 설정 (예: 기본 역할이 ROLE_USER인 경우)
        if (member.getMemberRoleList() == null || member.getMemberRoleList().isEmpty()) {
            List<MemberRole> defaultRoles = new ArrayList<>();
            defaultRoles.add(MemberRole.USER); // 기본 역할 설정
            member.setMemberRoleList(defaultRoles);
        }
        ms.insertMember(member);
        result.put("msg", "ok");
        return result;
    }


    @Value("${kakao.client_id}")
    private String client_id;
    @Value("${kakao.redirect_uri}")
    private String redirect_uri;

    @RequestMapping("/kakaostart")
    public @ResponseBody String kakaostart() {
        String a = "<script type='text/javascript'>"
                + "location.href='https://kauth.kakao.com/oauth/authorize?"
                + "client_id=" + client_id + "&"
                + "redirect_uri=" + redirect_uri + "&"
                + "response_type=code';" + "</script>";
        return a;
    }


    @RequestMapping("/kakaoLogin")
    public void loginKakao(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String code = request.getParameter("code");
        String endpoint = "https://kauth.kakao.com/oauth/token";
        URL url = new URL(endpoint);
        String bodyData = "grant_type=authorization_code&";
        bodyData += "client_id=b2d5ef3e81878072076f3baee3873edd&";
        bodyData += "redirect_uri=https://ko.honin.xyz/api/member/kakaoLogin&";
        bodyData += "code=" + code;

        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        conn.setDoOutput(true);
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream(), "UTF-8"));
        bw.write(bodyData);
        bw.flush();
        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
        String input = "";
        StringBuilder sb = new StringBuilder();
        while ((input = br.readLine()) != null) {
            sb.append(input);
        }
        Gson gson = new Gson();
        OAuthToken oAuthToken = gson.fromJson(sb.toString(), OAuthToken.class);
        String endpoint2 = "https://kapi.kakao.com/v2/user/me";
        URL url2 = new URL(endpoint2);

        HttpsURLConnection conn2 = (HttpsURLConnection) url2.openConnection();
        conn2.setRequestProperty("Authorization", "Bearer " + oAuthToken.getAccess_token());
        conn2.setDoOutput(true);
        BufferedReader br2 = new BufferedReader(new InputStreamReader(conn2.getInputStream(), "UTF-8"));
        String input2 = "";
        StringBuilder sb2 = new StringBuilder();
        while ((input2 = br2.readLine()) != null) {
            sb2.append(input2);
            System.out.println(input2);
        }
        Gson gson2 = new Gson();
        KakaoProfile kakaoProfile = gson2.fromJson(sb2.toString(), KakaoProfile.class);
        KakaoProfile.KakaoAccount ac = kakaoProfile.getAccount();
        KakaoProfile.KakaoAccount.Profile pf = ac.getProfile();
        System.out.println("id : " + kakaoProfile.getId());
        System.out.println("KakaoAccount-Email : " + ac.getEmail());
        System.out.println("Profile-Nickname : " + pf.getNickname());
        Member member = ms.getMemberBySnsid(kakaoProfile.getId());
        if (member == null) {
            member = new Member();
            member.setEmail(pf.getNickname());
            member.setNickname(pf.getNickname());
            member.setProvider("kakao");
            PasswordEncoder pe = cc.passwordEncoder();  // 비밀번호 암호화 도구
            member.setPassword(pe.encode("kakao"));
            member.setSnsid(kakaoProfile.getId());
            if (member.getMemberRoleList() == null || member.getMemberRoleList().isEmpty()) {
                List<MemberRole> defaultRoles = new ArrayList<>();
                defaultRoles.add(MemberRole.USER); // 기본 역할 설정
                member.setMemberRoleList(defaultRoles);
            }

            ms.insertMember(member);
        }
        String nick = URLEncoder.encode(pf.getNickname(), "UTF-8");
        response.sendRedirect("https://ko.honin.xyz/kakaosaveinfo/" + nick);
    }


    @Value("${naver.client_id}")
    private String naverClientId;

    @Value("${naver.redirect_uri}")
    private String naverRedirectUri;

    @Value("${naver.client_secret}")
    private String naverClientSecret;

    @GetMapping("/naverstart")
    public ModelAndView naverstart(HttpServletRequest request) {
        String state = generateState();
        String encodedRedirectUri = URLEncoder.encode(naverRedirectUri, StandardCharsets.UTF_8);
        String loginUrl = "https://nid.naver.com/oauth2.0/authorize?response_type=code"
                + "&client_id=" + naverClientId
                + "&redirect_uri=" + encodedRedirectUri
                + "&state=" + state;
        request.getSession().setAttribute("state", state);

        // Debug log
        System.out.println("Login URL: " + loginUrl);

        return new ModelAndView("redirect:" + loginUrl);
    }

    @GetMapping("/naverLogin")
    public void naverLogin(@RequestParam("code") String code,
                           @RequestParam("state") String state,
                           HttpServletRequest request,
                           HttpServletResponse response) throws IOException {
        String sessionState = (String) request.getSession().getAttribute("state");

        // CSRF 보호를 위해 state 값 비교
        if (state == null || !state.equals(sessionState)) {
            System.out.println("세션 불일치");
            response.sendRedirect("/error");
            return;
        }

        String endpoint = "https://nid.naver.com/oauth2.0/token";
        URL url = new URL(endpoint);
        String bodyData = "grant_type=authorization_code&";
        bodyData += "client_id=" + naverClientId + "&";
        bodyData += "client_secret=" + naverClientSecret + "&";
        bodyData += "code=" + code + "&";
        bodyData += "state=" + state + "&";
        bodyData += "redirect_uri=" + URLEncoder.encode(naverRedirectUri, StandardCharsets.UTF_8);

        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        conn.setDoOutput(true);
        try (BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream(), "UTF-8"))) {
            bw.write(bodyData);
            bw.flush();
        }

        StringBuilder sb = new StringBuilder();
        try (BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"))) {
            String input;
            while ((input = br.readLine()) != null) {
                sb.append(input);
            }
        }

        Gson gson = new Gson();
        OAuthToken oAuthToken = gson.fromJson(sb.toString(), OAuthToken.class);
        String endpoint2 = "https://openapi.naver.com/v1/nid/me";
        URL url2 = new URL(endpoint2);

        HttpsURLConnection conn2 = (HttpsURLConnection) url2.openConnection();
        conn2.setRequestProperty("Authorization", "Bearer " + oAuthToken.getAccess_token());
        conn2.setDoOutput(true);
        StringBuilder sb2 = new StringBuilder();
        try (BufferedReader br2 = new BufferedReader(new InputStreamReader(conn2.getInputStream(), "UTF-8"))) {
            String input2;
            while ((input2 = br2.readLine()) != null) {
                sb2.append(input2);
                System.out.println(input2);
            }
        }

        Gson gson2 = new Gson();
        NaverProfile naverProfile = gson2.fromJson(sb2.toString(), NaverProfile.class);

        if (naverProfile == null || naverProfile.getResponse() == null) {
            System.out.println("Naver profile or response is null");
            response.sendRedirect("/error");
            return;
        }

        NaverProfile.Response ac = naverProfile.getResponse();
        if (ac == null) {
            System.out.println("Account is null");
            response.sendRedirect("/error");
            return;
        }

        System.out.println("Naver Profile Response: " + sb2.toString());
        System.out.println("id : " + ac.getId());
        System.out.println("NaverAccount-Email : " + ac.getEmail());
        System.out.println("Profile-Nickname : " + ac.getNickname());

        Member member = ms.getMemberBySnsid(ac.getId());
        if (member == null) {
            member = new Member();
            member.setEmail(ac.getEmail());
            member.setNickname(ac.getNickname());
            member.setProvider("naver");
            PasswordEncoder pe = cc.passwordEncoder();
            member.setPassword(pe.encode("naver"));
            member.setSnsid(ac.getId());
            if (member.getMemberRoleList() == null || member.getMemberRoleList().isEmpty()) {
                List<MemberRole> defaultRoles = new ArrayList<>();
                defaultRoles.add(MemberRole.USER); // 기본 역할 설정
                member.setMemberRoleList(defaultRoles);
            }
            ms.insertMember(member);
        }

        String nick = URLEncoder.encode(ac.getNickname(), "UTF-8");
        response.sendRedirect("https://ko.honin.xyz/naversaveinfo/" + nick);
    }

    private String generateState() {
        return UUID.randomUUID().toString();
    }

    @GetMapping("/userstateConfirm/{nickname}")
    public HashMap<String, Object> userstateConfirm(@PathVariable("nickname") String nickname) {
        HashMap<String, Object> result = new HashMap<String, Object>();
        String msg = ms.userstateConfirm(nickname);
        System.out.println("msg 머야 : " + msg);
        result.put("msg", msg);
        return result;
    }


}




