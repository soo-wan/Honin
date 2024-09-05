package com.team2.honin.honinserver.dao.viewDao;

import com.team2.honin.honinserver.entity.view.SteamedListView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SteamedListViewRepository extends JpaRepository<SteamedListView, Integer> {

    @Query(value = "SELECT * FROM steamedlistview WHERE nickname = :nickname ORDER BY slnum DESC LIMIT :pageSize OFFSET :offset", nativeQuery = true)
    List<SteamedListView> findSecondhandLikeByNicknameWithPaging(
            @Param("nickname") String nickname,
            @Param("offset") int offset,
            @Param("pageSize") int pageSize);

}
