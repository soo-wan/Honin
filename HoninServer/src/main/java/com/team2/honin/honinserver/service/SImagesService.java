package com.team2.honin.honinserver.service;

import com.team2.honin.honinserver.dao.SImagesRepository;
import com.team2.honin.honinserver.dao.SecondhandRepository;
import com.team2.honin.honinserver.entity.SImages;
import com.team2.honin.honinserver.entity.SecondHand;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SImagesService {

    private final SImagesRepository sir;
    private final SecondhandRepository shr;

    // 중고 물품 이미지 등록
    public void insertSecondHandImages(Integer snum, List<String> saveFileNames) {
        SecondHand secondHand = shr.findBySnum(snum)
                .orElseThrow(() -> new IllegalArgumentException("No SecondHand found with snum: " + snum));

        saveFileNames.forEach(filename -> {
            SImages image = new SImages();
            image.setSavefilename(filename);
            image.setSecondhand(secondHand);
            sir.save(image);
        });
    }

    // 중고 물품 이미지 업데이트
    public void secondhandImagesUpdate(int snum, List<String> saveFileNames) {
        SecondHand secondHand = shr.findBySnum(snum)
                .orElseThrow(() -> new IllegalArgumentException("No SecondHand found with snum: " + snum));

        if (saveFileNames == null) {
            saveFileNames = Collections.emptyList();
        }

        // 트랜잭션 내에서 삭제와 삽입을 처리하여 원자성을 보장
        try {
            sir.deleteBySecondhandSnum(snum);

            saveFileNames.forEach(filename -> {
                SImages image = new SImages();
                image.setSavefilename(filename);
                image.setSecondhand(secondHand);
                sir.save(image);
            });
        } catch (Exception e) {
            throw new RuntimeException("Error updating images for second hand item with snum: " + snum, e);
        }
    }

    // 중고 물품 이미지 삭제
    public void deleteSecondhandImgs(Integer snum) {
        sir.deleteBySecondhandSnum(snum);
    }
}
