package com.team2.honin.honinserver.service;

import com.team2.honin.honinserver.dao.*;
import com.team2.honin.honinserver.dao.viewDao.Top10PostsRepository;
import com.team2.honin.honinserver.dto.*;
import com.team2.honin.honinserver.entity.NCImages;
import com.team2.honin.honinserver.entity.NCareer;
import com.team2.honin.honinserver.entity.NPImages;
import com.team2.honin.honinserver.entity.NPolicy;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class NoticeService {
    @Autowired
    NcareerRepository ncr;
    @Autowired
    NpolicyRepository npr;
    @Autowired
    Top10PostsRepository tpr;


    public Page<NPolicyResponseDTO> getNpolicyList(Paging paging) {
        Pageable pageable = PageRequest.of(paging.getPage() - 1, paging.getDisplayRow());
        Page<NPolicy> page = npr.findAllWithImages(pageable);
        return page.map(NPolicyResponseDTO::fromEntity);
    }

    public NCareerResponseDTO getNcareer(int ncnum) {
        Optional<NCareer> optionalNCareer = ncr.findByNcnum(ncnum);
        if (optionalNCareer.isPresent()) {
            NCareer nCareer = optionalNCareer.get();
            return NCareerResponseDTO.fromEntity(nCareer);
        } else {
            // 엔티티가 존재하지 않을 경우 처리
            return null; // 또는 예외를 던질 수 있음
        }
    }

    public NPolicyResponseDTO getNpolicy(int npnum) {
        Optional<NPolicy> optionalNPolicy = npr.findByNpnum(npnum);
        if (optionalNPolicy.isPresent()) {
            NPolicy nPolicy = optionalNPolicy.get();
            return NPolicyResponseDTO.fromEntity(nPolicy);
        } else {
            // 엔티티가 존재하지 않을 경우 처리
            return null; // 또는 예외를 던질 수 있음
        }
    }

    public void updateReadCount(int ncnum) {
        Optional<NCareer> nc = ncr.findByNcnum(ncnum);
        nc.get().setReadcount(nc.get().getReadcount() + 1);
    }

    public void updateReadCountNP(int npnum) {
        Optional<NPolicy> np = npr.findByNpnum(npnum);
        np.get().setReadcount( np.get().getReadcount()+1 );
    }

    public Integer npolicyWrite(NPolicy nPolicy) {
        NPolicy savedNpolicy = npr.save(nPolicy);
        return savedNpolicy.getNpnum(); // 저장된 게시물의 ID 반환
    }

    public Integer nCareerWrite(NCareer nCareer) {
        NCareer savedNCareer = ncr.save(nCareer);
        return savedNCareer.getNcnum();
    }

    public HashMap<String, Object> updateNpolicy(int npnum, NPolicyRequestDTO request) {
        HashMap<String, Object> result = new HashMap<>();

        try {
            // 게시물 조회
            Optional<NPolicy> optionalNPolicy = npr.findByNpnum(npnum);
            if (!optionalNPolicy.isPresent()) {
                result.put("status", "error");
                result.put("message", "NPolicy not found");
                return result;
            }

            NPolicy oldone = optionalNPolicy.get();

            // DTO를 엔티티로 변환
            NPolicy newone = request.toEntity();
            newone.setNpnum(oldone.getNpnum()); // ID 유지

            // 엔티티의 다른 속성들을 업데이트
            oldone.setTitle(newone.getTitle());
            oldone.setContent(newone.getContent());

            // 기존 이미지 삭제
            oldone.getImages().clear();

            // 새로운 이미지 추가
            List<NPImages> newImages = newone.getImages();
            if (newImages != null && !newImages.isEmpty()) {
                for (NPImages npImage : newImages) {
                    npImage.setNPolicy(oldone); // 새로운 이미지를 부모 엔티티에 연결
                    oldone.getImages().add(npImage);
                }
            }

            // 게시물 저장
            npr.save(oldone);

            result.put("status", "success");
        } catch (Exception e) {
            result.put("status", "error");
            result.put("message", "Failed to update policy: " + e.getMessage());
        }

        return result;
    }


    public HashMap<String, Object> updateNcareer(int ncnum, NCareerRequestDTO request) {
        HashMap<String, Object> result = new HashMap<>();

        try {
            // 게시물 조회
            Optional<NCareer> optionalNCareer = ncr.findByNcnum(ncnum);
            if (!optionalNCareer.isPresent()) {
                result.put("status", "error");
                result.put("message", "NPolicy not found");
                return result;
            }

            NCareer oldone = optionalNCareer.get();

            // DTO를 엔티티로 변환
            NCareer newone = request.toEntity();
            newone.setNcnum(oldone.getNcnum()); // ID 유지

            // 엔티티의 다른 속성들을 업데이트
            oldone.setTitle(newone.getTitle());
            oldone.setContent(newone.getContent());

            // 기존 이미지 삭제
            oldone.getImages().clear();

            // 새로운 이미지 추가
            List<NCImages> newImages = newone.getImages();
            if (newImages != null && !newImages.isEmpty()) {
                for (NCImages ncImage : newImages) {
                    ncImage.setNCareer(oldone); // 새로운 이미지를 부모 엔티티에 연결
                    oldone.getImages().add(ncImage);
                }
            }

            // 게시물 저장
            ncr.save(oldone);

            result.put("status", "success");
        } catch (Exception e) {
            result.put("status", "error");
            result.put("message", "Failed to update policy: " + e.getMessage());
        }

        return result;
    }

    public void deleteNP(int npnum) {
        npr.deleteByNpnum(npnum);
    }

    public void deleteNC(int ncnum) {
        ncr.deleteByNcnum(ncnum);
    }


    public Page<NCareerResponseDTO> getNCareerList(Paging paging) {
        Pageable pageable = PageRequest.of(paging.getPage() - 1, paging.getDisplayRow());
        Page<NCareer> page = ncr.findAllWithImages(pageable);
        return page.map(NCareerResponseDTO::fromEntity);
    }
}
