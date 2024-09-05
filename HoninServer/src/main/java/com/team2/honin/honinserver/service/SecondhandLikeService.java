package com.team2.honin.honinserver.service;

import com.team2.honin.honinserver.dao.SecondhandRepository;
import com.team2.honin.honinserver.dao.like.SecondhandLikeRepository;
import com.team2.honin.honinserver.entity.SLike;
import com.team2.honin.honinserver.entity.SecondHand;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class SecondhandLikeService {

    @Autowired
    SecondhandRepository shr;

    @Autowired
    SecondhandLikeRepository slr;

    public void addLike(int snum, String likenick) {
        Optional<SLike> likeOptional = slr.findBySnumAndLikenick(snum, likenick);
        if (!likeOptional.isPresent()) {
            SLike newSLike = new SLike();
            newSLike.setSnum(snum);
            newSLike.setLikenick(likenick);
            slr.save(newSLike);
        }
    }

    public void disLike(int snum, String likenick) {
        Optional<SLike> likeOptional = slr.findBySnumAndLikenick(snum, likenick);
        likeOptional.ifPresent(slr::delete);
    }


    public boolean isLiked(int snum, String likenick) {
        return slr.existsBySnumAndLikenick(snum, likenick);
    }
}
