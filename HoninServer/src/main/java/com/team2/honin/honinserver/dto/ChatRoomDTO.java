package com.team2.honin.honinserver.dto;

import com.team2.honin.honinserver.entity.ChatMessage;
import com.team2.honin.honinserver.entity.SecondHand;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ChatRoomDTO {

    private Long chatRoomId;
    private String seller;
    private String buyer;
    private SecondHand snum;
    private ChatMessage message;
    private LocalDateTime createdAt;
    private LocalDateTime lastMessageAt;

}
