package com.team2.honin.honinserver.dto;

import com.team2.honin.honinserver.entity.SImages;
import com.team2.honin.honinserver.entity.SecondHand;

import lombok.Data;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class SecondhandRequestDTO {

    private Integer snum;
    private String title;
    private String content;
    private Timestamp writedate;
    private Integer readcount = 0;
    private String state = "Y";
    private int price;
    private String seller;
    private String buyer;
    private List<String> savefilename;
    private String address1;
    private String address2;
    private String address3;

    public SecondHand toEntity() {
        SecondHand secondHand = new SecondHand();
        secondHand.setSnum(this.snum);
        secondHand.setTitle(this.title);
        secondHand.setContent(this.content);
        secondHand.setWritedate(this.writedate);
        secondHand.setReadcount(this.readcount);
        secondHand.setState(this.state);
        secondHand.setPrice(this.price);

        // 주소 정보 설정
        secondHand.setAddress1(this.address1);
        secondHand.setAddress2(this.address2);
        secondHand.setAddress3(this.address3);

        // Simages 리스트로 변환하여 SecondHand에 추가
        if (savefilename != null && !savefilename.isEmpty()) {
            List<SImages> images = savefilename.stream()
                    .map(filename -> {
                        SImages simage = new SImages();
                        simage.setSavefilename(filename);
                        simage.setSecondhand(secondHand);
                        return simage;
                    })
                    .collect(Collectors.toList());
            secondHand.setImages(images);
        }

        return secondHand;
    }
}
