package com.team2.honin.honinserver.dao.viewDao;

import com.team2.honin.honinserver.entity.view.SecondhandView;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SecondhandViewRepository extends JpaRepository<SecondhandView, Integer> {

    SecondhandView findBySnum(int num);

    @Query("SELECT s FROM SecondhandView s ORDER BY s.snum DESC")
    Page<SecondhandView> findSecondhandWithPaging(Pageable pageable);

    @Query("SELECT s FROM SecondhandView s WHERE s.title LIKE %:word% OR s.content LIKE %:word% ORDER BY s.snum DESC")
    Page<SecondhandView> findSecondhandBySearchingWithPaging(@Param("word") String word, Pageable pageable);

    @Query(value = "SELECT * FROM secondhandview WHERE seller = :nickname ORDER BY snum DESC LIMIT :pageSize OFFSET :offset", nativeQuery = true)
    List<SecondhandView> findSecondhandByNicknameWithPaging(
            @Param("nickname") String nickname,
            @Param("offset") int offset,
            @Param("pageSize") int pageSize);

}
