package com.team2.honin.honinserver.service;

import com.team2.honin.honinserver.dao.MemberRepository;
import com.team2.honin.honinserver.entity.Member;
import com.team2.honin.honinserver.entity.MemberRole;
import com.team2.honin.honinserver.security.service.CustomUserDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminService {

    @Autowired
    MemberRepository mr;

    public List<Member> memberList() {
        return mr.findAllByIndateDesc();
    }

    public void userstateChange(String nickname, String newState) {
        mr.userstateChange(nickname, newState);
    }
}
