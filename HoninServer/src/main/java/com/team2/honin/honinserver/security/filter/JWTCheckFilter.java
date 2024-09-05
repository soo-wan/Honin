package com.team2.honin.honinserver.security.filter;

import com.google.gson.Gson;
import com.team2.honin.honinserver.dto.MemberDTO;
import com.team2.honin.honinserver.security.util.JWTUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

@Log4j2
public class JWTCheckFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String authHeaderStr = request.getHeader("Authorization");

        // 필터링 제외 URL 처리
        if (shouldNotFilter(request)) {
            // 필터링 제외된 URL에는 필터를 적용하지 않고 다음 필터로 넘어갑니다.
            filterChain.doFilter(request, response);
            return;
        }

        try {
            // authHeaderStr가 null이거나 "Bearer "로 시작하지 않는 경우 기본 로그인 페이지로 리다이렉트
            if (authHeaderStr == null || !authHeaderStr.startsWith("Bearer ")) {
                log.info("Authorization header is missing or does not contain Bearer token. Redirecting to login page.");
            }

            // JWT 토큰에서 "Bearer " 접두사를 제거합니다.
            String accessToken = authHeaderStr.substring(7);
            // 토큰을 검증하고 클레임을 추출합니다.
            Map<String, Object> claims = JWTUtil.validateToken(accessToken);
            log.info("JWT claims: " + claims);

            // 클레임에서 사용자 정보 추출
            String nickname = (String) claims.get("nickname");
            String password = (String) claims.get("password");
            String email = (String) claims.get("email");
            String phone = (String) claims.get("phone");
            String profileimg = (String) claims.get("profileimg");
            String profilemsg = (String) claims.get("profilemsg");
            String provider = (String) claims.get("provider");
            String snsid = (String) claims.get("snsid");
            Long timeInMillis = (Long) claims.get("indate");
            Timestamp indate = new Timestamp(timeInMillis);
            String address1 = (String) claims.get("address1");
            String address2 = (String) claims.get("address2");
            String address3 = (String) claims.get("address3");
            String userstate = (String) claims.get("userstate");
            String zipnum = (String) claims.get("zipnum");
            List<String> roleNames = (List<String>) claims.get("roleNames");

            // MemberDTO 객체 생성
            MemberDTO memberDTO = new MemberDTO(nickname, password, email, phone, profileimg,
                    profilemsg, provider, snsid, indate, address1, address2, address3, userstate, zipnum, roleNames);

            log.info("-----------------------------------");
            log.info("memberDTO: " + memberDTO);
            log.info("추출된 권한 : " + memberDTO.getAuthorities());

            // 인증 객체를 생성하고 SecurityContext에 설정
            UsernamePasswordAuthenticationToken authenticationToken
                    = new UsernamePasswordAuthenticationToken(memberDTO, password, memberDTO.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);

            // 다음 필터로 요청을 전달
            filterChain.doFilter(request, response);
        } catch (Exception e) {
            // 예외 발생 시 오류 메시지 로그와 JSON 형식의 오류 응답 전송
            log.error("JWT Check Error..............");
            log.error(e.getMessage(), e); // 예외와 메시지를 함께 로깅합니다.

            // HTTP 응답 상태를 UNAUTHORIZED로 설정
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            Gson gson = new Gson();
            // 오류 응답 JSON 생성
            String msg = gson.toJson(Map.of("error", "SERVER_SECURITY_ERROR_ACCESS_TOKEN", "details", e.getMessage()));
            try (PrintWriter printWriter = response.getWriter()) {
                printWriter.println(msg);
            }
        }
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();
        log.info("check uri: " + path);

        // 필터링에서 제외할 URL 패턴
        if(request.getMethod().equals("OPTIONS")
                || path.startsWith("/admin/refresh")

                || path.startsWith("/member/loginlocal")
                || path.startsWith("/member/refresh")
                || path.startsWith("/member/sendMail")
                || path.startsWith("/member/codeCheck")
                || path.startsWith("/member/emailCheck")
                || path.startsWith("/member/nicknameCheck")
                || path.startsWith("/member/join")
                || path.startsWith("/member/fileupload")
                || path.startsWith("/member/kakaostart")
                || path.startsWith("/member/kakaoLogin")
                || path.startsWith("/member/naverstart")
                || path.startsWith("/member/naverLogin")
                || path.startsWith("/member/userstateConfirm")

                || path.startsWith("/images")
                || path.startsWith("/uploads")
                || path.startsWith("/favicon.ico")

                || path.startsWith("/community/getPostList")
                || path.startsWith("/community/getCommunityCategoryList")
                || path.startsWith("/community/getPostOne")
                || path.startsWith("/community/updateReadCount")
                || path.startsWith("/community/getReplyList")
                || path.startsWith("/community/getWriterInfo")

                || path.startsWith("/notice/getNcareerList")
                || path.startsWith("/notice/getNpolicyList")
                || path.startsWith("/notice/getNcareer")
                || path.startsWith("/notice/getNpolicy")
                || path.startsWith("/notice/updateReadCountNP")
                || path.startsWith("/notice/updateReadCount")

                || path.startsWith("/secondhand/getSecondhandList")
                || path.startsWith("/secondhand/getSecondHand")
                || path.startsWith("/secondhand/updateReadCount")
                || path.startsWith("/secondhand/getReplyList")

                || path.startsWith("/database/initDb")
                || path.startsWith("/database/createView")
                || path.startsWith("/database/resetSchema")

                || path.startsWith("/main/getPostList")
                || path.startsWith("/main/getLikesTopList")

                /* mystore */
                || path.startsWith("/mystore/getStoreReviewList")

                /* AWS S3 임시용도 */
                || path.startsWith("/mypage/updateProfile")
                || path.startsWith("/community/imgupload")
                || path.startsWith("/ws-chat/")
                || path.startsWith("/chat/")
        )
        {
            return true;
        }
        return false;
    }
}
