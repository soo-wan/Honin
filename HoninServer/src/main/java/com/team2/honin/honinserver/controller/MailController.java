package com.team2.honin.honinserver.controller;

import com.team2.honin.honinserver.service.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
//필요한 객체에 의존주입을 자동으로 하는 어노테이션, 주로 final 로 생성되는 객체에 사용됩니다.
// autowired 는 필요한 객체 선언 위에 개별로 작성했다면, 이는 현위치에 한번만 사용하면 내부에 모든 static final 객체에 일괄 적용됩니다.
@RequiredArgsConstructor
@RequestMapping("/member")
public class MailController {
    private final MailService mailService;
    private int number;

    @PostMapping("/sendMail")
    public HashMap<String, Object> sendMail(@RequestParam("email") String email) {
        HashMap<String, Object> result = new HashMap<>();

        try {
            number = mailService.sendMail(email);
            String num = String.valueOf(number); // int 형 정수로 받은 number 를 String 로 변경
            result.put("message", "OK");
            result.put("number", num);
        } catch (Exception e) {
            result.put("message", "이메일 전송에 실패하였습니다.");
        }
        return result;
    }

    @PostMapping("/codeCheck")
    public HashMap<String, Object> codeCheck(@RequestParam("userCode") String userCode) {
        HashMap<String, Object> result = new HashMap<>();

        String num = String.valueOf(number);

        if (num.equals(userCode)) {
            result.put("message", "OK");
        } else {
            result.put("message", "이메일 인증코드가 일치하지 않습니다. 요청하신 이메일 코드를 확인해주세요.");
        }

        return result;
    }
}
