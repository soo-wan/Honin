package com.team2.honin.honinserver.dao;

import com.team2.honin.honinserver.entity.view.SecondhandView;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

//보류
@Repository
public interface MypageRepository {

   List<?> getPostListMember(String nickname, int offset, int pageSize);

}
