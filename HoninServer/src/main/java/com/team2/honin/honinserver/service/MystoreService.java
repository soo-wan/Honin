package com.team2.honin.honinserver.service;

import com.team2.honin.honinserver.dao.mystore.*;
import com.team2.honin.honinserver.entity.StoreInfo;
import com.team2.honin.honinserver.entity.StoreReview;
import com.team2.honin.honinserver.entity.view.HasReviewStoreView;
import com.team2.honin.honinserver.entity.view.StoreReviewInfoView;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MystoreService {

    private final MystoreRepository storeRepo;
    private final MystoreReviewRepository storeReviewRepo;
    private final StoreViewRepository sViewRepo;
    private final StoreReviewInfoViewRepository sriViewRepo;
    private final HasReviewStoreViewRepository hrsViewRepo;
    
    public void onlike(StoreInfo storeInfo) {
        Optional<StoreInfo> sinfo = storeRepo.findByIdAndNickname(storeInfo.getId(), null);
        if (sinfo.isPresent()) {
            StoreInfo s = sinfo.get();
            s.setNickname(storeInfo.getNickname());
            storeRepo.save(s);
        }else{
            storeRepo.save(storeInfo);
        }
    }

    public void offlike(StoreInfo storeInfo) {
        Optional<StoreInfo> sinfo = storeRepo.findByIdAndNickname(storeInfo.getId(), storeInfo.getNickname());
        sinfo.ifPresent(info -> info.setNickname(null));

        storeRepo.save(sinfo.orElse(null));
    }

    public List<StoreInfo> getUserStore(String nickname) {
        return storeRepo.findByNickname(nickname);
    }

    public void writeReview(StoreReview storeReview) {
        storeReviewRepo.save(storeReview);
    }

    public void updateReview(StoreReview storeReview) {
        StoreReview review = storeReviewRepo.findByStoreidAndNickname(storeReview.getStoreid(), storeReview.getNickname());
        review.setContent(storeReview.getContent());
        review.setScore(storeReview.getScore());
        storeReviewRepo.save(review);
    }

    public void deleteReview(StoreReview storeReview) {
        StoreReview review = storeReviewRepo.findByStoreidAndNickname(storeReview.getStoreid(), storeReview.getNickname());
        storeReviewRepo.delete(review);
    }

    public List<StoreReview> getStoreReviewList(String storeid) {
        return storeReviewRepo.findAllByStoreidOrderByWritedateDesc(storeid);
    }

    public List<StoreReviewInfoView> getAllMyReview(String nickname) {
        return sriViewRepo.findAllByNickname(nickname);
    }

    public List<HasReviewStoreView> getAllHoninStore() {
        return hrsViewRepo.findAll();
    }
}
