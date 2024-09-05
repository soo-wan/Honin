package com.team2.honin.honinserver.controller;

import com.team2.honin.honinserver.entity.StoreInfo;
import com.team2.honin.honinserver.entity.StoreReview;
import com.team2.honin.honinserver.entity.view.HasReviewStoreView;
import com.team2.honin.honinserver.entity.view.StoreReviewInfoView;
import com.team2.honin.honinserver.service.MystoreService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@Log4j2
@RestController
@RequestMapping("/mystore")
public class MystoreController {

    @Autowired
    MystoreService mss;

    @PostMapping("/onlike")
    public HashMap<String, String> onlike(@RequestBody StoreInfo storeInfo) {
        HashMap<String, String> result = new HashMap<>();
        System.out.println("storeInfo:" + storeInfo);
        mss.onlike(storeInfo);
        result.put("status", "success");
        return result;
    }

    @PostMapping("/offlike")
    public HashMap<String, String> offlike(@RequestBody StoreInfo storeInfo) {
        HashMap<String, String> result = new HashMap<>();
        mss.offlike(storeInfo);
        result.put("status", "success");
        return result;
    }

    @GetMapping("/getFavoriteStore/{nickname}")
    public HashMap<String, Object> getUserStore(@PathVariable("nickname") String nickname) {
        HashMap<String, Object> result = new HashMap<>();
        result.put("storeList", mss.getUserStore(nickname));
        result.put("status", "success");
        return result;
    }

    @PostMapping("/writeReview")
    public HashMap<String, Object> writeReview(@RequestBody StoreReview storeReview) {
        HashMap<String, Object> result = new HashMap<>();

        mss.writeReview(storeReview);
        result.put("status", "success");
        return result;
    }

    @PostMapping("/updateReview")
    public HashMap<String, Object> updateReview(@RequestBody StoreReview storeReview) {
        HashMap<String, Object> result = new HashMap<>();
        mss.updateReview(storeReview);
        result.put("status", "success");
        return result;
    }

    @PostMapping("deleteReview")
    public HashMap<String, Object> deleteReview(@RequestBody StoreReview storeReview) {
        HashMap<String, Object> result = new HashMap<>();
        mss.deleteReview(storeReview);
        result.put("status", "success");
        return result;
    }

    @GetMapping("/getStoreReviewList/{storeid}")
    public HashMap<String, Object> getStoreReviewList(@PathVariable("storeid") String storeid) {
        HashMap<String, Object> result = new HashMap<>();
        List<StoreReview> list = mss.getStoreReviewList(storeid);
        System.out.println("list:" + list);
        result.put("reviewList", list);
        return result;
    }

    @GetMapping("/getAllMyReview/{nickname}")
    public HashMap<String, Object> getAllMyReview(@PathVariable("nickname") String nickname) {
        HashMap<String, Object> result = new HashMap<>();
        List<StoreReviewInfoView> list = mss.getAllMyReview(nickname);
        result.put("reviewList", list);
        return result;
    }

    @GetMapping("/getAllHoninStore")
    public HashMap<String, Object> getAllHoninStore() {
        HashMap<String, Object> result = new HashMap<>();
        List<HasReviewStoreView> list = mss.getAllHoninStore();
        result.put("list", list);
        return result;
    }
}
