package com.team2.honin.honinserver.service;

import com.team2.honin.honinserver.dao.MemberRepository;
import com.team2.honin.honinserver.dao.MypageDao;
import com.team2.honin.honinserver.dao.viewDao.SecondhandViewRepository;
import com.team2.honin.honinserver.entity.Member;
import com.team2.honin.honinserver.security.CustomSecurityConfig;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@Transactional
public class MemberService {

    @Autowired
    MemberRepository mr;

    @Autowired
    MypageDao mdao;

    @Autowired
    SecondhandViewRepository svr;

    @Autowired
    CustomSecurityConfig cc;

    public Member getMember(String email) {
        Optional<Member> mem = mr.findByEmail(email);

        if (!mem.isPresent()) {
            return null;
        } else {
            return mem.get();
        }
    }

    public Member getMemberByNickname(String nickname) {
        Optional<Member> mem = mr.findByNickname(nickname);
        if (!mem.isPresent()) {
            return null;
        } else {
            return mem.get();
        }
    }

    public void insertMember(Member member) {
        mr.save(member);
    }

    public Member getMemberBySnsid(String id) {
        Optional<Member> mem = mr.findBySnsid(id);
        if (!mem.isPresent()) {
            return null;
        } else {
            return mem.get();
        }
    }


    public int updateProfile(Member member) {
        // 기존 회원 정보 조회
        Member isMember = mr.findByNickname(member.getNickname())
                .orElseThrow(() -> new IllegalArgumentException("회원정보 없음"));

        // 비밀번호가 제공되었고, 비밀번호가 변경된 경우에만 암호화
        if (member.getPassword() != null && !member.getPassword().isEmpty()) {
            PasswordEncoder pe = cc.passwordEncoder();

            // 입력된 비밀번호와 기존 비밀번호를 비교
            if (!pe.matches(member.getPassword(), isMember.getPassword())) {
                // 비밀번호가 변경된 경우 암호화
                isMember.setPassword(pe.encode(member.getPassword()));
            }
        }

        // 프로필 이미지 및 메시지 업데이트
        // 이미지 URL이 null인 경우 기존 URL을 유지
        if (member.getProfileimg() != null) {
            isMember.setProfileimg(member.getProfileimg());
        }
        // 메시지가 null인 경우 기존 메시지를 유지
        if (member.getProfilemsg() != null) {
            isMember.setProfilemsg(member.getProfilemsg());
        }

        // 변경된 Member 객체를 저장
        mr.save(isMember);

        return 1; // 성공 시 1 반환
    }



    public void updateMemberUserstate(String nickname) {
        Optional<Member> m = mr.findByNickname(nickname);
        if( m.isPresent() ){
            Member mem = m.get();
            mem.setUserstate("N");
            mr.save(mem);
        }
    }

    public String userstateConfirm(String nickname) {
        Optional<Member> m = mr.findByNickname(nickname);
        if( m.isPresent() ){
            Member mem = m.get();
            return mem.getUserstate();
        }
        return null;
    }
}
