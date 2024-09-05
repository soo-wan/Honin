package com.team2.honin.honinserver.dao;

import com.team2.honin.honinserver.dto.MemberDTO;
import com.team2.honin.honinserver.entity.Member;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, String> {
    @EntityGraph(attributePaths = {"memberRoleList"})
    @Query("select m from Member m where m.nickname = :nickname")
    Member getWithRoles(@Param("nickname") String nickname);

    Optional<Member> findByEmail(String email);

    Optional<Member> findByNickname(String nickname);

    Optional<Member> findBySnsid(String id);

    @Query("SELECT m FROM Member m ORDER BY m.indate DESC")
    List<Member> findAllByIndateDesc();

    @Modifying
    @Transactional
    @Query("UPDATE Member m SET m.userstate = CASE " +
            "WHEN m.userstate = 'Y' AND :newState = 'N' THEN 'N' " +
            "WHEN m.userstate = 'N' AND :newState = 'Y' THEN 'Y' " +
            "ELSE m.userstate END " +
            "WHERE m.nickname = :nickname")
    void userstateChange(String nickname, String newState);
}
