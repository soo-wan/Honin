import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useNavigate, useParams } from 'react-router-dom';
import s from '../style/secondhand/chatapp.module.css';
import { useSelector } from 'react-redux';
import jaxios from '../util/jwtUtil';

const ChatRoom = () => {
  const { chatRoomId } = useParams();
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [file, setFile] = useState(null);
  const chatBoxRef = useRef(null);
  const loginUser = useSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!chatRoomId) return;

    const loadMessages = async () => {
      try {
        const response = await jaxios.get(`/api/chat/room/${chatRoomId}/messages`);
        const allMessages = response.data || [];
        setMessages(allMessages);
        console.log("Loaded messages", allMessages);
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    };

    // 여기 api 주소 수정
    const socket = new SockJS('/api/ws-chat');  // fix
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${loginUser.accessToken}`
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: (frame) => {
        console.log('Connected: ' + frame);
        client.subscribe(`/topic/chat/${chatRoomId}`, (message) => {
          const parsedMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, parsedMessage]);
        });
        setStompClient(client);
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
        // 사용자에게 에러 메시지 표시
        alert('채팅 연결에 문제가 발생했습니다. 페이지를 새로고침해주세요.');
      },
      onWebSocketError: (error) => {
        console.error('WebSocket error:', error);
        // 사용자에게 에러 메시지 표시
        alert('채팅 연결에 실패했습니다. 인터넷 연결을 확인해주세요.');
      },
    });

    try {
      client.activate();
    } catch (error) {
      console.error('Failed to activate STOMP client:', error);
      alert('채팅 연결에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }

    loadMessages();

    return () => {
      client.deactivate();
    };
  }, [chatRoomId, loginUser.accessToken]);

  // 메시지 전송 함수
  const sendMessage = () => {
    if (stompClient && stompClient.connected && (messageInput.trim() || file)) {
      const message = {
        sender: loginUser.nickname,
        message: messageInput,
        type: 'CHAT',
        imageUrl: null,
      };

      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        jaxios.post('/api/chat/uploadImage', formData)
          .then(response => {
            message.imageUrl = response.data.imageUrl;
            stompClient.publish({
              destination: `/app/chat.sendMessage/${chatRoomId}`,
              body: JSON.stringify(message),
            });
          })
          .catch(error => console.error('Error uploading image:', error));
      } else {
        stompClient.publish({
          destination: `/app/chat.sendMessage/${chatRoomId}`,
          body: JSON.stringify(message),
        });
      }

      // 메시지를 전송한 후, 입력 필드와 파일 선택을 초기화
      setMessageInput('');
      setFile(null);
    }
  };

  // 메시지 수신 처리
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className={s.chatRoomContainer}>
      <div id="chatBox" ref={chatBoxRef} className={s.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${s.message} ${
              msg.sender === loginUser.nickname ? s.user : s.other
            }`}
          >
            <div className={s.messageContent}>
              <strong className={s.sender}>{msg.sender}</strong>
              {msg.message && <span className={s.messageText}>{msg.message}</span>}
              {msg.imageUrl && (
                <div className={s.imageContainer}>
                  <img src={msg.imageUrl} alt="Uploaded" className={s.messageImage} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Enter your message"
        className={s.messageInput}
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className={s.fileInput}
      />
      <button onClick={sendMessage} className={s.sendButton}>Send</button>
      <button onClick={()=>{navigate(-1)}} className={s.backButton}>Back</button>
    </div>
  );
};

export default ChatRoom;
