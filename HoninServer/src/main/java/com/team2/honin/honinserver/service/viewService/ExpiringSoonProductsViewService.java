package com.team2.honin.honinserver.service.viewService;

import com.team2.honin.honinserver.dao.viewDao.ExpiringSoonProductsViewRepository;
import com.team2.honin.honinserver.entity.view.ExpiringSoonProductsView;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ExpiringSoonProductsViewService {

    @Autowired
    ExpiringSoonProductsViewRepository espvr;

    public List<ExpiringSoonProductsView> ExpiringSoonProductsView(String nickname) {
        return espvr.findByOwner(nickname);
    }

}
