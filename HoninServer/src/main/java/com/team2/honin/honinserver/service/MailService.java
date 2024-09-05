package com.team2.honin.honinserver.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender javaMailSender;

    @Value("${spring.mail.username}") //application.properties 에서 읽어옴
    private static String senderEmail;

    private static int number; //전송될 인증 코드 저장 변수


    public int sendMail(String email) {
        // (int) Math.random() * (최댓값-최솟값+1) + 최솟값
        number = (int)(Math.random() * (90000)) + 100000;

        // 전송된 이메일 내용(수신자, 제목, 내용 등) 구성 객체
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            mimeMessage.setFrom(senderEmail);
            mimeMessage.setRecipients(MimeMessage.RecipientType.TO, email);
            mimeMessage.setSubject("이메일 인증");
            String body = "";
            body += "<h3>" + "요청하신 인증 번호입니다." + "</h3>";
            body += "<h1>" + number + "</h1>";
            body += "<h3>" + "감사합니다." + "</h3>";
            mimeMessage.setText(body, "UTF-8", "html");
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
        javaMailSender.send(mimeMessage); // 구성 완료된 메시지를 javaMailSender 로 전송
        return number;
    }
}
