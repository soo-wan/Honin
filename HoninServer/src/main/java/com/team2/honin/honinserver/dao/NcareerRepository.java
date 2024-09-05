package com.team2.honin.honinserver.dao;


import com.team2.honin.honinserver.entity.NCareer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.Optional;

@Repository
public interface NcareerRepository extends JpaRepository<NCareer, Integer> {

    Optional<NCareer> findByNcnum(int ncnum);

    NCareer findAllByOrderByNcnumDesc();

    void deleteByNcnum(int ncnum);

    @Query("SELECT nc FROM NCareer nc LEFT JOIN FETCH nc.images ORDER BY nc.ncnum DESC")
    Page<NCareer> findAllWithImages(Pageable pageable);


//    @Query("select nc from NCareer nc order by ") ???
//    List<NCareer> findByPaging(@Param("paging") Paging paging); ??
}
