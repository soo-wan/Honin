package com.team2.honin.honinserver.dto;

import com.team2.honin.honinserver.entity.NCImages;
import com.team2.honin.honinserver.entity.NCareer;
import com.team2.honin.honinserver.entity.NPImages;
import com.team2.honin.honinserver.entity.NPolicy;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class NCareerRequestDTO {
    private Integer ncnum;
    private String title;
    private String content;
    private Timestamp writedate;
    private Integer readcount = 0;
    private List<String> savefilename;
    private String writer = "ADMIN"; // Assuming 'ADMIN' is the default value

    public NCareer toEntity() {
        NCareer nCareer = new NCareer();
        nCareer.setNcnum(this.ncnum);
        nCareer.setTitle(this.title);
        nCareer.setContent(this.content);
        nCareer.setWritedate(this.writedate);
        nCareer.setReadcount(this.readcount);
        nCareer.setWriter(this.writer);

        if (savefilename != null && !savefilename.isEmpty()) {
            List<NCImages> images = savefilename.stream()
                    .map(filename -> {
                        NCImages ncImage = new NCImages();
                        ncImage.setSavefilename(filename);
                        return ncImage;
                    })
                    .collect(Collectors.toList());
            for (NCImages ncImage : images) {
                ncImage.setNCareer(nCareer);
            }
            nCareer.setImages(images);
        }

        return nCareer;
    }
}
