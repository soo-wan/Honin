package com.team2.honin.honinserver.dao.viewDao;

import com.team2.honin.honinserver.entity.view.Top10Posts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Top10PostsRepository extends JpaRepository<Top10Posts, Integer> {

    //    @Modifying
//    @Transactional
//    @Query("select t from Top10Posts t")
//    List<Top10Posts> getAllTop10();
    List<Top10Posts> findAllByOrderByLikecountDesc();
}
