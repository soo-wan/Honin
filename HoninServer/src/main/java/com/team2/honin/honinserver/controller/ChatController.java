package com.team2.honin.honinserver.controller;

import com.team2.honin.honinserver.dto.ChatMessageDTO;
import com.team2.honin.honinserver.dto.ChatRoomDTO;
import com.team2.honin.honinserver.entity.ChatMessage;
import com.team2.honin.honinserver.entity.ChatRoom;
import com.team2.honin.honinserver.entity.Member;
import com.team2.honin.honinserver.entity.SecondHand;
import com.team2.honin.honinserver.service.ChatService;
import com.team2.honin.honinserver.service.S3UploadService;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@Log4j2
@RequestMapping("/chat")
public class ChatController {

    private final ChatService chatService;
    private final S3UploadService s3UploadService;

    @Autowired
    public ChatController(ChatService chatService, S3UploadService s3UploadService) {
        this.chatService = chatService;
        this.s3UploadService = s3UploadService;
    }

    @Transactional
    @MessageMapping("/chat.sendMessage/{chatRoomId}")
    @SendTo("/topic/chat/{chatRoomId}")
    public ChatMessageDTO sendMessage(@DestinationVariable("chatRoomId") Long chatRoomId, ChatMessage chatMessage) {
        chatMessage.setChatRoomId(chatRoomId);
        chatService.saveMessage(chatMessage);  // 메시지 저장
        return convertToDTO(chatMessage);      // 저장된 메시지를 DTO로 변환하여 반환
    }

    @MessageMapping("/chat.addUser/{chatRoomId}")
    @SendTo("/topic/chat/{chatRoomId}")
    public ChatMessage addUser(ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("nickname", chatMessage.getSender());
        return chatMessage;
    }

    @PostMapping("/uploadImage")
    public HashMap<String, Object> uploadImage(@RequestParam("file") MultipartFile file) {
        HashMap<String, Object> result = new HashMap<>();
        try {
            String uploadFilePathName = s3UploadService.saveFile(file);
            result.put("imageUrl", uploadFilePathName);
        } catch (IOException e) {
            log.error("Failed to upload image", e);
            result.put("error", "Failed to upload image");
        }
        return result;
    }

    @GetMapping("/room")
    public ResponseEntity<ChatRoom> createChatRoom(
            @RequestParam String sellerNickname,
            @RequestParam String buyerNickname,
            @RequestParam Integer productId) {

        Member seller = chatService.getMemberByNickname(sellerNickname);
        Member buyer = chatService.getMemberByNickname(buyerNickname);
        Optional<SecondHand> secondHandOpt = chatService.getSecondHandBySnum(productId);

        if (secondHandOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setSeller(seller);
        chatRoom.setBuyer(buyer);
        chatRoom.setSnum(secondHandOpt.get());

        ChatRoom createdChatRoom = chatService.createChatRoom(chatRoom);
        return ResponseEntity.ok(createdChatRoom);
    }

    @GetMapping("/room/{chatRoomId}/messages")
    public ResponseEntity<List<ChatMessage>> getMessages(@PathVariable("chatRoomId") Long chatRoomId) {
        List<ChatMessage> messages = chatService.getMessages(chatRoomId);
        return ResponseEntity.ok(messages);
    }

    @PostMapping("/message/{messageId}/read")
    public ResponseEntity<Void> markMessageAsRead(@PathVariable Long messageId) {
        chatService.markMessageAsRead(messageId);
        return ResponseEntity.ok().build();
    }


    @GetMapping("/roomList")
    public ResponseEntity<List<ChatRoomDTO>> getChatRooms(@RequestParam Integer productId) {
        Optional<SecondHand> snum = chatService.getSecondHandBySnum(productId);
        List<ChatRoom> chatRoomList = chatService.getChatRoomListBySnum(snum);
        List<ChatRoomDTO> chatRoomDTOList = chatRoomList.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(chatRoomDTOList);
    }

    private ChatMessageDTO convertToDTO(ChatMessage chatMessage) {
        ChatMessageDTO dto = new ChatMessageDTO();
        dto.setChatMessageId(chatMessage.getChatMessageId());
        dto.setSender(chatMessage.getSender());
        dto.setMessage(chatMessage.getMessage());
        dto.setImageUrl(chatMessage.getImageUrl());
        return dto;
    }

    private ChatRoomDTO convertToDTO(ChatRoom chatRoom) {
        ChatRoomDTO dto = new ChatRoomDTO();
        dto.setChatRoomId(chatRoom.getChatRoomId());
        dto.setSeller(chatRoom.getSeller().getNickname());
        dto.setBuyer(chatRoom.getBuyer().getNickname());
        dto.setLastMessageAt(chatRoom.getLastMessageAt());
        dto.setSnum(chatRoom.getSnum());
        return dto;
    }
}
