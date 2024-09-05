import React, { useEffect, useState } from 'react';
import jaxios from '../util/jwtUtil';
import s from '../style/secondhand/chatapp.module.css';

const ChatRoomList = ({ onSelectChatRoom, snum, currentUserNickname }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await jaxios.get('/api/chat/roomList', {
          params: { productId: snum }
        });

        const rooms = response.data || [];

        // seller 또는 buyer가 현재 유저와 일치하는 방을 필터링
        const filteredRooms = rooms.filter(room => 
          (room.seller === currentUserNickname || room.buyer === currentUserNickname)
        );

        setRooms(filteredRooms);
      } catch (error) {
        console.error('채팅방 목록 가져오기 오류:', error);
      }
    };

    fetchRooms();
  }, [snum, currentUserNickname]);

  return (
    <div>
      <ul className={s.chatroomList}>
        {rooms.map((room, index) => (
          <li key={index} onClick={() => onSelectChatRoom(room.chatRoomId)} className={s.eachroomList}>
           {room.seller === currentUserNickname ? room.buyer : room.seller} 님과의 채팅방
          </li>
        ))}
      </ul>

    </div>
  );
};

export default ChatRoomList;
