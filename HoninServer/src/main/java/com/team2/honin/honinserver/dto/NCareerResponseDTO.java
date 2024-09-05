package com.team2.honin.honinserver.dto;

import com.team2.honin.honinserver.entity.NCareer;
import com.team2.honin.honinserver.entity.NCImages;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class NCareerResponseDTO {
    private Integer ncnum;
    private String title;
    private String content;
    private Timestamp writedate;
    private Integer readcount;
    private List<String> savefilename;
    private String writer = "ADMIN";

    public static NCareerResponseDTO fromEntity(NCareer nCareer) {
        NCareerResponseDTO dto = new NCareerResponseDTO();
        dto.setNcnum(nCareer.getNcnum());
        dto.setTitle(nCareer.getTitle());
        dto.setContent(nCareer.getContent());
        dto.setWritedate(nCareer.getWritedate());
        dto.setReadcount(nCareer.getReadcount());
        dto.setWriter(nCareer.getWriter());

        if (nCareer.getImages() != null && !nCareer.getImages().isEmpty()) {
            List<String> filenames = nCareer.getImages().stream()
                    .map(NCImages::getSavefilename)
                    .collect(Collectors.toList());
            dto.setSavefilename(filenames);
        } else {
            dto.setSavefilename(List.of()); // 빈 리스트로 설정
        }

        return dto;
    }
}
