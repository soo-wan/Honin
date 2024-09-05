package com.team2.honin.honinserver.service.viewService;

import com.team2.honin.honinserver.dao.viewDao.ExpiredProductsViewRepository;
import com.team2.honin.honinserver.entity.view.ExpiredProductsView;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ExpiredProductsViewService {

    @Autowired
    ExpiredProductsViewRepository epvr;

    public List<ExpiredProductsView> ExpiredProductsView(String nickname) {
        return epvr.findByOwner(nickname);
    }
}
