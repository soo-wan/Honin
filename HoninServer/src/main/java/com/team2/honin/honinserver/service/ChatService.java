package com.team2.honin.honinserver.service;

import com.team2.honin.honinserver.dao.ChatMessageRepository;
import com.team2.honin.honinserver.dao.ChatRoomRepository;
import com.team2.honin.honinserver.dao.MemberRepository;
import com.team2.honin.honinserver.dao.SecondhandRepository;
import com.team2.honin.honinserver.entity.ChatMessage;
import com.team2.honin.honinserver.entity.ChatRoom;
import com.team2.honin.honinserver.entity.Member;
import com.team2.honin.honinserver.entity.SecondHand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ChatService {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final MemberRepository memberRepository;
    private final SecondhandRepository secondHandRepository;

    @Autowired
    public ChatService(ChatRoomRepository chatRoomRepository,
                       ChatMessageRepository chatMessageRepository,
                       MemberRepository memberRepository,
                       SecondhandRepository secondHandRepository) {
        this.chatRoomRepository = chatRoomRepository;
        this.chatMessageRepository = chatMessageRepository;
        this.memberRepository = memberRepository;
        this.secondHandRepository = secondHandRepository;
    }

    // ChatRoom 생성
    public ChatRoom createChatRoom(ChatRoom chatRoom) {
        return chatRoomRepository.save(chatRoom);
    }

    // ChatMessage 저장
    public ChatMessage saveMessage(ChatMessage chatMessage) {
        return chatMessageRepository.save(chatMessage);
    }

    // 채팅방 ID로 메시지 조회
    public List<ChatMessage> getMessages(Long chatRoomId) {
        Long chatRoom = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new RuntimeException("ChatRoom not found with id: " + chatRoomId)).getChatRoomId();
        return chatMessageRepository.findByChatRoomIdOrderBySentAt(chatRoom);
    }


    // 메시지 읽음 처리
    public void markMessageAsRead(Long messageId) {
        chatMessageRepository.findById(messageId).ifPresent(chatMessage -> {
            chatMessage.setRead(true);
            chatMessageRepository.save(chatMessage);
        });
    }

    // 닉네임으로 Member 조회
    public Member getMemberByNickname(String nickname) {
        return memberRepository.findByNickname(nickname)
                .orElseThrow(() -> new RuntimeException("Member not found with nickname: " + nickname));
    }

    // snum으로 SecondHand 조회
    public Optional<SecondHand> getSecondHandBySnum(Integer snum) {
        return secondHandRepository.findBySnum(snum);
    }

    // Buyer로 채팅방 리스트 조회
    public List<ChatRoom> getChatRoomListBySnum(Optional<SecondHand> snum) {
        return chatRoomRepository.findBySnum(snum);
    }

    // ChatRoom ID로 채팅방 조회
    public Optional<ChatRoom> getChatRoomById(Long chatRoomId) {
        return chatRoomRepository.findById(chatRoomId);
    }
}
