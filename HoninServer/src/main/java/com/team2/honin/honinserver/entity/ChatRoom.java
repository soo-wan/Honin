package com.team2.honin.honinserver.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "chatroom")
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chatroomid")
    private Long chatRoomId;

    @ManyToOne
    @JoinColumn(name = "sellernickname", nullable = false)
    @JsonBackReference
    private Member seller;  // 판매자

    @ManyToOne
    @JoinColumn(name = "buyernickname", nullable = false)
    @JsonBackReference
    private Member buyer;  // 구매자

    @ManyToOne
    @JoinColumn(name = "snum", nullable = false)
    private SecondHand snum;  // 거래 중인 상품

    @Column(nullable = false, updatable = false, name = "createdat")
    private LocalDateTime createdAt = LocalDateTime.now();  // 채팅룸 생성 시간

    @Column(name = "lastmessageat")
    private LocalDateTime lastMessageAt;  // 마지막 메시지 시간
}
