package com.team2.honin.honinserver.service;

import com.team2.honin.honinserver.dao.MypageDao;
//import com.team2.honin.honinserver.dao.MypageRepository;
import com.team2.honin.honinserver.dao.like.SecondhandLikeRepository;
import com.team2.honin.honinserver.dao.viewDao.SecondhandViewRepository;
import com.team2.honin.honinserver.dao.viewDao.SteamedListViewRepository;
import com.team2.honin.honinserver.dto.Paging;
import com.team2.honin.honinserver.entity.SLike;
import com.team2.honin.honinserver.entity.view.SecondhandView;
import com.team2.honin.honinserver.entity.view.SteamedListView;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class MypageService {
    @Autowired
    MypageDao mdao;

//    @Autowired
//    MypageRepository mr;

    @Autowired
    SecondhandViewRepository svr;

    @Autowired
    SteamedListViewRepository slr;

    public List<?> getPostListMember(Paging paging, String nickname) {
        return mdao.getPostListMember(paging, nickname);
    }

//    public List<?> getPostListMember(int page, String nickname) {
//        int pageSize = 6;
//        int offset = (page - 1) * pageSize;
//        return mr.getPostListMember(nickname, offset, pageSize);
//    }

    public List<SecondhandView> getSecondhandListMember(int page, String nickname) {
        int pageSize = 6;
        int offset = (page - 1) * pageSize;
        return svr.findSecondhandByNicknameWithPaging(nickname, offset, pageSize);
    }

    public List<SteamedListView> getSecondhandLikeList(int page, String nickname) {
        int pageSize = 6;
        int offset = (page - 1) * pageSize;
        return slr.findSecondhandLikeByNicknameWithPaging(nickname, offset, pageSize);
    }
}
