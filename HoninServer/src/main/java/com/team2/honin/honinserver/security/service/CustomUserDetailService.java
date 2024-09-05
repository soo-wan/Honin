package com.team2.honin.honinserver.security.service;

import com.team2.honin.honinserver.dao.MemberRepository;
import com.team2.honin.honinserver.dto.MemberDTO;
import com.team2.honin.honinserver.entity.Member;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

    private final MemberRepository mr;

    @Transactional
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // loadUserByUsername 역할은 전에 사용하던 getMember 메서드의 역할
        log.info("-----------------------loadUserByUsername------------------" + username);

        // 멤버 조회
        Member member = mr.getWithRoles(username);
        if(member == null){ // 없으면 Not Found 처리
            throw new UsernameNotFoundException(username + " - User Not found");
        }

        // 존재하면 로그인 처리를 위해 Entity 데이터를 DTO 데이터로 옮김
        MemberDTO memberDTO = new MemberDTO(
                member.getNickname(),
                member.getPassword(),
                member.getEmail(),
                member.getPhone(),
                member.getProfileimg(),
                member.getProfilemsg(),
                member.getProvider(),
                member.getSnsid(),
                member.getIndate(),
                member.getAddress1(),
                member.getAddress2(),
                member.getAddress3(),
                member.getUserstate(),
                member.getZipnum(),
                member.getMemberRoleList().stream().map(memberRole -> memberRole.name()).collect(Collectors.toList())

        );
        log.info(memberDTO);
        log.info(member);
        return memberDTO;
    }
}
