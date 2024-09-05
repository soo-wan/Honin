package com.team2.honin.honinserver.service.viewService;

import com.team2.honin.honinserver.dao.viewDao.Top10PostsRepository;
import com.team2.honin.honinserver.entity.view.Top10Posts;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class Top10PostsView {

    @Autowired
    Top10PostsRepository tpr;

    public List<Top10Posts> getLikesTopList() {
        return tpr.findAllByOrderByLikecountDesc();
        //return tpr.getAllTop10();
    }
}
