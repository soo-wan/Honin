package com.team2.honin.honinserver.dao.mystore;

import com.team2.honin.honinserver.entity.StoreInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MystoreRepository extends JpaRepository<StoreInfo, Integer> {
    List<StoreInfo> findByNickname(String nickname);

    Optional<StoreInfo> findByIdAndNickname(String id, String nickname);
}
