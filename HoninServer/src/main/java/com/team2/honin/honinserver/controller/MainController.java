package com.team2.honin.honinserver.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.team2.honin.honinserver.dto.Paging;
import com.team2.honin.honinserver.entity.view.Top10Posts;
import com.team2.honin.honinserver.service.MainService;
import com.team2.honin.honinserver.service.viewService.Top10PostsView;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@Log4j2
@RestController
@RequestMapping("/main")
public class MainController {

    @Autowired
    MainService ms;

    @Autowired
    Top10PostsView tpv;

    @GetMapping("/getPostList/{page}/{tableName}")
    public HashMap<String, Object> getPostList(@PathVariable("page") int page, @PathVariable("tableName") String tableName) {
        HashMap<String, Object> result = new HashMap<>();
        Paging paging = new Paging();
        paging.setPage(page);
        paging.setDisplayRow(10);
        paging.calPaging();
        result.put("postList", ms.getPostList(paging, tableName));
        result.put("paging", paging);
        return result;
    }

    @GetMapping("/getLikesTopList")
    public HashMap<String, Object> getLikesTopList() {
        HashMap<String, Object> result = new HashMap<>();
        List<Top10Posts> topPostList = tpv.getLikesTopList();

        ObjectMapper mapper = new ObjectMapper();
        String jsonString = null;
        try {
            jsonString = mapper.writeValueAsString(topPostList);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        //System.out.println(jsonString);

        result.put("topPostList", topPostList);
        return result;
    }

}
