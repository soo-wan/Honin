package com.team2.honin.honinserver.dto;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.sql.Timestamp;
import java.util.*;
import java.util.stream.Collectors;

public class MemberDTO extends User {

    public MemberDTO(
            String nickname,
            String password,
            String email,
            String phone,
            String profileimg,
            String profilemsg,
            String provider,
            String snsid,
            Timestamp indate,
            String address1,
            String address2,
            String address3,
            String userstate,
            String zipnum,
            List<String> roleNames) {
        super( nickname, password,
           roleNames.stream().map(
             str -> new SimpleGrantedAuthority("ROLE_"+str)
           ).collect(Collectors.toList())
           // ROLE_USER, ROLE_ADMIN, ROLE_MANAGER  와 같은 String 데이터 생성
        );
       // 생성자 전달된 전달인수들은 멤버변수에 저장
        this.nickname = nickname;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.profileimg = profileimg;
        this.profilemsg = profilemsg;
        this.provider = provider;
        this.snsid = snsid;
        this.indate = indate;
        this.address1 = address1;
        this.address2 = address2;
        this.address3 = address3;
        this.userstate = userstate;
        this.zipnum = zipnum;
        this.roleNames = roleNames;

    }

    private String password;
    private String nickname;
    private String email;
    private String phone;
    private String profileimg;
    private String profilemsg;
    private String provider;
    private String snsid;
    private Timestamp indate;
    private String address1;
    private String address2;
    private String address3;
    private String userstate;
    private String zipnum;
    private List<String> roleNames = new ArrayList<String>();


    // jwt 토큰 생성시에 그 안에 넣을 개인 정보들을  Map 형식으로 구성합니다
    // 암호화 jwt 토근 생성시에 그 Map을 통채로 암호화합니다
    public Map<String, Object> getClaims() {
        Map<String, Object> dataMap = new HashMap<>();
        dataMap.put("nickname", nickname);
        dataMap.put("password", password);
        dataMap.put("email", email);
        dataMap.put("phone", phone);
        dataMap.put("profileimg", profileimg);
        dataMap.put("profilemsg", profilemsg);
        dataMap.put("provider", provider);
        dataMap.put("snsid", snsid);
        dataMap.put("indate", indate);
        dataMap.put("address1", address1);
        dataMap.put("address2", address2);
        dataMap.put("address3", address3);
        dataMap.put("userstate", userstate);
        dataMap.put("zipnum", zipnum);
        dataMap.put("roleNames", roleNames);
        return dataMap;
    }

}
