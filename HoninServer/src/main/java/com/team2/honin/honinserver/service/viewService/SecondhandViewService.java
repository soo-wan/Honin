package com.team2.honin.honinserver.service.viewService;

import com.team2.honin.honinserver.dao.SecondhandRepository;
import com.team2.honin.honinserver.dao.viewDao.SecondhandViewRepository;
import com.team2.honin.honinserver.entity.view.SecondhandView;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class SecondhandViewService {

    @Autowired
    SecondhandRepository shr;

    @Autowired
    SecondhandViewRepository svr;

    public Page<SecondhandView> getSecondhandList(int page, String word) {
        int pageSize = 8; // 한 페이지에 표시할 항목 수
        Pageable pageable = PageRequest.of(page - 1, pageSize); // 페이지 번호는 0부터 시작하므로 -1

        if (word == null || word.trim().isEmpty()) {
            // 전체 조회
            return svr.findSecondhandWithPaging(pageable);
        } else {
            // 검색어가 있는 경우
            return svr.findSecondhandBySearchingWithPaging(word, pageable);
        }
    }



    public SecondhandView getSecondhand(int num) {
        return svr.findBySnum(num);
    }

}
