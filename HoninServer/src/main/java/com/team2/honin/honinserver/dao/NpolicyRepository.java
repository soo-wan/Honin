package com.team2.honin.honinserver.dao;

import com.team2.honin.honinserver.entity.NPolicy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NpolicyRepository extends JpaRepository<NPolicy, Integer> {
    Optional<NPolicy> findByNpnum(int npnum);

    NPolicy findAllByOrderByNpnumDesc();

    void deleteByNpnum(int npnum);

    @Query("SELECT np FROM NPolicy np LEFT JOIN FETCH np.images ORDER BY np.npnum DESC")
    Page<NPolicy> findAllWithImages(Pageable pageable);
}
