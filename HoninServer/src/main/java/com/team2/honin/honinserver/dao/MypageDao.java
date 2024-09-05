package com.team2.honin.honinserver.dao;

import com.team2.honin.honinserver.dto.Paging;
import com.team2.honin.honinserver.entity.view.CanonymousView;
import com.team2.honin.honinserver.entity.view.CfreeView;
import com.team2.honin.honinserver.entity.view.CrecommendedView;
import com.team2.honin.honinserver.entity.view.CtipView;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class MypageDao {
    @Autowired
    EntityManager em;

    public List<Object> getPostListMember(Paging paging, String nickname) {
        List<Object> combinedResults = new ArrayList<>();

        // 자유게시판 조회
        String freeSql = "SELECT c FROM CfreeView c WHERE c.postwriter = :nickname ORDER BY c.postnum DESC";
        List<CfreeView> freeResults = em.createQuery(freeSql, CfreeView.class)
                .setParameter("nickname", nickname)
                .getResultList();
        combinedResults.addAll(freeResults);

        // 팁과 노하우 조회
        String tipSql = "SELECT c FROM CtipView c WHERE c.postwriter = :nickname ORDER BY c.postnum DESC";
        List<CtipView> tipResults = em.createQuery(tipSql, CtipView.class)
                .setParameter("nickname", nickname)
                .getResultList();
        combinedResults.addAll(tipResults);

        // 업체추천 조회
        String recommendedSql = "SELECT c FROM CrecommendedView c WHERE c.postwriter = :nickname ORDER BY c.postnum DESC";
        List<CrecommendedView> recommendedResults = em.createQuery(recommendedSql, CrecommendedView.class)
                .setParameter("nickname", nickname)
                .getResultList();
        combinedResults.addAll(recommendedResults);

        // 고민상담 조회
        String anonymousSql = "SELECT c FROM CanonymousView c WHERE c.postwriter = :nickname ORDER BY c.postnum DESC";
        List<CanonymousView> anonymousResults = em.createQuery(anonymousSql, CanonymousView.class)
                .setParameter("nickname", nickname)
                .getResultList();
        combinedResults.addAll(anonymousResults);

        // 전체 합친 데이터에 대해 페이징 처리
        int startIndex = Math.max(paging.getStartNum() - 1, 0);  // 시작 인덱스 (음수 방지)
        int endIndex = Math.min(startIndex + paging.getDisplayRow(), combinedResults.size());  // 종료 인덱스

        if (startIndex > endIndex) {
            return new ArrayList<>();  // 페이징 범위가 유효하지 않은 경우 빈 리스트 반환
        }

        return combinedResults.subList(startIndex, endIndex);  // 페이징된 리스트 반환
    }
}
