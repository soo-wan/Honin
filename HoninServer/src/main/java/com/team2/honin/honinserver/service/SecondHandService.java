package com.team2.honin.honinserver.service;

import com.team2.honin.honinserver.dao.SImagesRepository;
import com.team2.honin.honinserver.dao.SecondhandRepository;
import com.team2.honin.honinserver.dao.viewDao.SecondhandViewRepository;
import com.team2.honin.honinserver.entity.SecondHand;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class SecondHandService {

    private final SecondhandRepository shr;
    private final SecondhandViewRepository svr;
    private final SImagesRepository sir;

    // 중고 물품 등록
    public Integer insertSecondHand(SecondHand secondHand) {
        // 게시물 저장
        SecondHand savedSecondHand = shr.save(secondHand);
        return savedSecondHand.getSnum(); // 저장된 게시물의 ID 반환
    }

    // 조회수 업데이트
    public void updateReadCount(int num) {
        shr.updateReadCount(num);
    }

    // 중고 물품 수정
    public Integer secondhandUpdate(Integer snum, SecondHand secondHand) {
        Optional<SecondHand> oldOneOpt = shr.findBySnum(snum);

        if (oldOneOpt.isPresent()) {
            SecondHand oldOne = oldOneOpt.get();
            oldOne.setTitle(secondHand.getTitle());
            oldOne.setContent(secondHand.getContent());
            oldOne.setPrice(secondHand.getPrice());

            SecondHand updated = shr.save(oldOne);
            return updated.getSnum();
        }

        return null; // 게시물이 존재하지 않는 경우 null 반환
    }

    // 중고 물품 삭제
    public void deleteSecondhand(Integer snum) {
        shr.deleteBySnum(snum);
    }

    // 상태 변경 (Y <-> N)
    public boolean stateChange(Integer snum) {
        Optional<SecondHand> secondHandOpt = shr.findBySnum(snum);

        if (secondHandOpt.isPresent()) {
            SecondHand secondHand = secondHandOpt.get();

            if ("Y".equals(secondHand.getState())) {
                shr.stateChangeYtoN(snum);
            } else if ("N".equals(secondHand.getState())) {
                shr.stateChangeNtoY(snum);
            } else {
                return false;
            }

            return true;
        }

        return false; // 물품이 존재하지 않는 경우 false 반환
    }
}
