package com.team2.honin.honinserver.dto;

import com.team2.honin.honinserver.entity.NPolicy;
import com.team2.honin.honinserver.entity.NPImages;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class NPolicyRequestDTO {

    private Integer npnum;
    private String title;
    private String content;
    private Timestamp writedate;
    private Integer readcount = 0;
    private List<String> savefilename;
    private String writer = "ADMIN";

    public NPolicy toEntity() {
        NPolicy nPolicy = new NPolicy();
        nPolicy.setNpnum(this.npnum);
        nPolicy.setTitle(this.title);
        nPolicy.setContent(this.content);
        nPolicy.setWritedate(this.writedate);
        nPolicy.setReadcount(this.readcount);
        nPolicy.setWriter(this.writer);

        if (savefilename != null && !savefilename.isEmpty()) {
            List<NPImages> images = savefilename.stream()
                    .map(filename -> {
                        NPImages npImage = new NPImages();
                        npImage.setSavefilename(filename);
                        return npImage;
                    })
                    .collect(Collectors.toList());
            for (NPImages npImage : images) {
                npImage.setNPolicy(nPolicy);
            }
            nPolicy.setImages(images);
        }

        return nPolicy;
    }
}
