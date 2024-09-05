import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import s from '../style/secondhand/chatapp.module.css';
import jaxios from '../util/jwtUtil';
import { useSelector } from 'react-redux';
import ChatRoomList from './ChatRoomList';

// 채팅방 생성 함수
const createChatRoom = async (sellerNickname, buyerNickname, productId) => {
  try {
    const createResponse = await jaxios.get('/api/chat/room', {
      params: { sellerNickname, buyerNickname, productId }
    });
    console.log('채팅방 생성 응답:', createResponse.data);
    return createResponse.data.chatRoomId;
  } catch (error) {
    console.error('채팅방 생성 중 오류 발생:', error);
    return null;
  }
};

const ChatApp = () => {
  const { snum, seller, chatRoomId: initialChatRoomId } = useParams();
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentChatRoomId, setCurrentChatRoomId] = useState(initialChatRoomId || null);
  const [chatRooms, setChatRooms] = useState([]);
  const chatBoxRef = useRef(null);
  const loginUser = useSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginUser.accessToken || !loginUser.refreshToken) {
      if (window.confirm("로그인이 필요한 서비스입니다. 창을 닫으시겠습니까?")) {
        window.close();
      }
      return;
    }

    const fetchRooms = async () => {
      try {
        // 현재 사용자와 관련된 채팅방 목록 가져오기
        const response = await jaxios.get('/api/chat/roomList', {
          params: { nickname: loginUser.nickname, productId: snum }
        });

        const rooms = response.data || [];
        const filteredRooms = rooms.filter(room => room.seller !== loginUser.nickname);

        setChatRooms(filteredRooms);

        const existingChatRoom = filteredRooms.find(room => 
          room.seller === seller && room.buyer === loginUser.nickname
        );

        if (existingChatRoom) {
          setCurrentChatRoomId(existingChatRoom.chatRoomId);
          navigate(`/chat/room/${existingChatRoom.chatRoomId}`);
        } else if (!currentChatRoomId) {
          // 기존 채팅방이 없고, seller가 본인이 아닐 때만 새 채팅방 생성
          if (loginUser.nickname !== seller) {
            const newChatRoomId = await createChatRoom(seller, loginUser.nickname, snum);
            if (newChatRoomId) {
              setCurrentChatRoomId(newChatRoomId);
              navigate(`/chat/room/${newChatRoomId}`);
            }
          }
        }
      } catch (error) {
        console.error('채팅방 목록 가져오기 오류:', error);
      }
    };

    fetchRooms();
  }, [loginUser, navigate, seller, snum, currentChatRoomId, initialChatRoomId]);

  useEffect(() => {
    if (currentChatRoomId) {
      const socket = new SockJS('https://ko.honin.xyz/ws-chat'); // fix
      const client = new Client({
        webSocketFactory: () => socket,
        connectHeaders: {
          Authorization: `Bearer ${loginUser.accessToken}`
        },
        onConnect: (frame) => {
          console.log('Connected: ' + frame);

          client.subscribe(`/topic/chat/${currentChatRoomId}`, (message) => {
            const parsedMessage = JSON.parse(message.body);
            setMessages((prevMessages) => [...prevMessages, parsedMessage]);
          });

          setStompClient(client);
        },
        onStompError: (frame) => {
          console.error('Broker reported error: ' + frame.headers['message']);
          console.error('Additional details: ' + frame.body);
        },
      });

      client.activate();

      return () => {
        if (client) {
          client.deactivate();
        }
      };
    }
  }, [currentChatRoomId, loginUser.accessToken]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleChatRoomSelect = (chatRoomId) => {
    setCurrentChatRoomId(chatRoomId);
    navigate(`/chat/room/${chatRoomId}`);
  };

  return (
    <div className={s.chatContainer}>
      <h1 className={s.seller}>{seller}</h1>
      {currentChatRoomId ? (
        <div id="chatBox" ref={chatBoxRef} className={s.chatBox}>
          {messages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.sender}</strong> {msg.message}
            </div>
          ))}
        </div>
      ) : (
        <ChatRoomList 
          onSelectChatRoom={handleChatRoomSelect} 
          snum={snum} 
          currentUserNickname={loginUser.nickname}
        />
      )}
    </div>
  );
};

export default ChatApp;
