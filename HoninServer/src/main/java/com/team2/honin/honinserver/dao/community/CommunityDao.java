package com.team2.honin.honinserver.dao.community;

import com.team2.honin.honinserver.dto.Paging;
import com.team2.honin.honinserver.entity.view.CanonymousView;
import com.team2.honin.honinserver.entity.view.CfreeView;
import com.team2.honin.honinserver.entity.view.CrecommendedView;
import com.team2.honin.honinserver.entity.view.CtipView;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CommunityDao {

    @Autowired
    EntityManager em;

    public List<?> getPostList(Paging paging, String tableName) {
        switch (tableName) {
            case "자유게시판":
                String cfSql = "SELECT c FROM CfreeView c ORDER BY c.postwritedate DESC";
                return em.createQuery(cfSql, CfreeView.class)
                        .setFirstResult(paging.getStartNum() - 1)
                        .setMaxResults(paging.getDisplayRow())
                        .getResultList();
            case "팁과노하우":
                String ctSql = "SELECT c FROM CtipView c ORDER BY c.postwritedate DESC";
                return em.createQuery(ctSql, CtipView.class)
                        .setFirstResult(paging.getStartNum() - 1)
                        .setMaxResults(paging.getDisplayRow())
                        .getResultList();
            case "업체추천":
                String crSql = "SELECT c FROM CrecommendedView c ORDER BY c.postwritedate DESC";
                return em.createQuery(crSql, CrecommendedView.class)
                        .setFirstResult(paging.getStartNum() - 1)
                        .setMaxResults(paging.getDisplayRow())
                        .getResultList();
            case "고민상담":
                String caSql = "SELECT c FROM CanonymousView c ORDER BY c.postwritedate DESC";
                return em.createQuery(caSql, CanonymousView.class)
                        .setFirstResult(paging.getStartNum() - 1)
                        .setMaxResults(paging.getDisplayRow())
                        .getResultList();
            default:
                return null;
        }
    }
}