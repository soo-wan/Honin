package com.team2.honin.honinserver.dto;

import com.team2.honin.honinserver.entity.ChatRoom;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChatMessageDTO {

    private String message;
    private Long chatMessageId;
    private String sender;
    private MessageType type;
    private String imageUrl;
    private ChatRoom chatRoom;
    private boolean isRead = false;

    public enum MessageType {
        CHAT,
        JOIN,
        LEAVE
    }
}
