package com.team2.honin.honinserver.dto;

import com.team2.honin.honinserver.entity.NPolicy;
import com.team2.honin.honinserver.entity.NPImages;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class NPolicyResponseDTO {
    private Integer npnum;
    private String title;
    private String content;
    private Timestamp writedate;
    private Integer readcount;
    private List<String> savefilename;
    private String writer = "ADMIN";

    public static NPolicyResponseDTO fromEntity(NPolicy nPolicy) {
        NPolicyResponseDTO dto = new NPolicyResponseDTO();
        dto.setNpnum(nPolicy.getNpnum());
        dto.setTitle(nPolicy.getTitle());
        dto.setContent(nPolicy.getContent());
        dto.setWritedate(nPolicy.getWritedate());
        dto.setReadcount(nPolicy.getReadcount());
        dto.setWriter(nPolicy.getWriter());

        if (nPolicy.getImages() != null && !nPolicy.getImages().isEmpty()) {
            List<String> filenames = nPolicy.getImages().stream()
                    .map(NPImages::getSavefilename)
                    .collect(Collectors.toList());
            dto.setSavefilename(filenames);
        } else {
            dto.setSavefilename(List.of()); // 빈 리스트로 설정
        }

        return dto;
    }
}
