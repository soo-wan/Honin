package com.team2.honin.honinserver.service;

import com.team2.honin.honinserver.dao.MainDao;
import com.team2.honin.honinserver.dto.Paging;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class MainService {
    @Autowired
    MainDao mdao;

    public List<?> getPostList(Paging paging, String tableName) {
        return mdao.getPostList(paging, tableName);
    }


}
