package com.team2.honin.honinserver.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "chatmessage")
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chatmessageid")
    private Long chatMessageId;

    @Column(name = "chatroomid")
    private Long chatRoomId;  // 메시지가 속한 채팅룸

    @Column(name = "sender", nullable = false)
    private String sender;  // 메시지 보낸 사람

    @Column(nullable = false, name = "message")
    private String message;  // 메시지 내용

    @Column(name = "imageUrl")
    private String imageUrl;

    @Column(nullable = false, updatable = false, name = "sentat")
    private LocalDateTime sentAt = LocalDateTime.now();  // 메시지 전송 시간

    @Column(nullable = false, name = "isread")
    private boolean isRead = false;  // 메시지 읽음 여부
}
