package com.team2.honin.honinserver.dao;

import com.team2.honin.honinserver.entity.ChatRoom;
import com.team2.honin.honinserver.entity.SecondHand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    List<ChatRoom> findBySnum(Optional<SecondHand> snum);
}
