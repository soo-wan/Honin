package com.team2.honin.honinserver.controller;

import com.team2.honin.honinserver.dto.Paging;
import com.team2.honin.honinserver.entity.MyFood;
import com.team2.honin.honinserver.service.MyrefrigeratorService;
import com.team2.honin.honinserver.service.S3UploadService;
import com.team2.honin.honinserver.service.viewService.ExpiredProductsViewService;
import com.team2.honin.honinserver.service.viewService.ExpiringSoonProductsViewService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

@RestController
@Log4j2
@RequestMapping("/myrefrigerator")
public class MyrefrigeratorController {

    @Autowired
    MyrefrigeratorService mfs;

    @Autowired
    ExpiringSoonProductsViewService espvs;

    @Autowired
    ExpiredProductsViewService epvs;

    @GetMapping("/getMyrefrigeratorList/{page}/{nickname}")
    public HashMap<String, Object> getMyrefrigeratorList(
            @PathVariable("page") int page,
            @PathVariable("nickname") String nickname) {
        HashMap<String, Object> result = new HashMap<>();
        Paging paging = new Paging();
        paging.setPage(page);
        paging.setDisplayRow(8);
        paging.calPaging();
        List<MyFood> mfList = mfs.getMyrefrigeratorList(page, nickname);
        result.put("paging", paging);
        result.put("myrefrigeratorList", mfList);
        return result;
    }

    @GetMapping("/getMyrefrigeratorView/{num}")
    public HashMap<String, Object> getMyrefrigeratorView(@PathVariable("num") int num) {
        HashMap<String, Object> result = new HashMap<>();
        result.put("myrefrigeratorview", mfs.getMyrefrigeratorView(num));
        return result;
    }

    @PostMapping("/writeMyRefrigerator")
    public HashMap<String, Object> writeMyRefrigerator(@RequestBody MyFood mf) {
        HashMap<String, Object> result = new HashMap<>();
        mfs.writeMyRefrigerator(mf);
        result.put("msg", "OK");
        return result;
    }

    @Autowired
    S3UploadService sus;

    @PostMapping("/imgupload")

    public HashMap<String, Object> imgupload( @RequestParam("image") MultipartFile file){

        HashMap<String, Object> result = new HashMap<String, Object>();
        try {
            // 서비스단의 화일 업로드 메서드를 호출해서 파일을 저장
            String uploadFilePathName = sus.saveFile( file );
            result.put("image", file.getOriginalFilename());
            result.put("savefilename", uploadFilePathName);
        } catch (IllegalStateException | IOException e) {
            e.printStackTrace();
        }
        return result;
    }

    @PostMapping("/deleteMyrefrigerator/{mfnum}")
    public HashMap<String, Object> deleteMyrefrigerator(@PathVariable("mfnum") int mfnum) {
        HashMap<String, Object> result = new HashMap<>();
        mfs.deleteMyrefrigerator(mfnum);
        result.put("msg", "OK");
        return result;
    }

    @PostMapping("/updateMyrefrigerator")
    public HashMap<String, Object> updateMyrefrigerator(@RequestBody MyFood mf) {
        HashMap<String, Object> result = new HashMap<>();
        mfs.updateMyrefrigerator(mf);
        result.put("msg", "OK");
        return result;
    }

    @GetMapping("/findOneMyrefrigerator/{mfnum}")
    public HashMap<String, Object> findOneMyrefrigerator(@PathVariable("mfnum") int mfnum) {
        HashMap<String, Object> result = new HashMap<>();
        result.put("myrefrigerator", mfs.findOneMyrefrigerator(mfnum));
        return result;
    }

    @GetMapping("/expiringSoonProductsView/{nickname}")
    public HashMap<String, Object> ExpiringSoonProductsView(@PathVariable("nickname") String nickname) {
        HashMap<String, Object> result = new HashMap<>();
        result.put("soonView", espvs.ExpiringSoonProductsView(nickname));
        return result;
    }

    @GetMapping("/expiredProductsView/{nickname}")
    public HashMap<String, Object> ExpiredProductsView(@PathVariable("nickname") String nickname) {
        HashMap<String, Object> result = new HashMap<>();
        result.put("expiredView", epvs.ExpiredProductsView(nickname));
        return result;
    }

}
