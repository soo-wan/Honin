package com.team2.honin.honinserver;

import com.team2.honin.honinserver.security.CustomSecurityConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
class HoninServerApplicationTests {

    @Autowired
    CustomSecurityConfig cc;

    @Test
    void contextLoads() {
        PasswordEncoder pe = cc.passwordEncoder();
        System.out.println(pe.encode("123"));
    }

}
