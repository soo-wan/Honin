package com.team2.honin.honinserver.entity.view;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.View;

@Getter
@Immutable
@View(query = "CREATE VIEW steamedlistview AS " +
        "SELECT sl.likenick AS nickname, " +
        "       sl.slnum, " +
        "       s.snum, " +
        "       s.title, " +
        "       s.content, " +
        "       s.price, " +
        "       s.state, " +
        "       JSON_ARRAYAGG(i.savefilename) AS images, " +
        "       COUNT(DISTINCT sr.srnum) AS replycount, " +
        "       COUNT(DISTINCT sl2.slnum) AS likecount, " +
        "       m.address1, " +
        "       m.address2, " +
        "       m.address3 " +
        "FROM secondhand s " +
        "LEFT JOIN slike sl ON s.snum = sl.snum " +
        "LEFT JOIN simages i ON s.snum = i.snum " +
        "LEFT JOIN sreply sr ON s.snum = sr.snum " +
        "LEFT JOIN slike sl2 ON s.snum = sl2.snum " +
        "LEFT JOIN member m ON m.nickname = s.seller " +
        "GROUP BY sl.likenick, sl.slnum, s.snum, s.title, s.content, s.price, s.state, " +
        "m.address1, m.address2, m.address3")
@Entity
@Table(name = "steamedlistview")
public class SteamedListView {

    @Id
    @Column(name = "slnum")
    private Integer slnum;

    @Column(name = "snum")
    private Integer snum;

    @Column(name = "nickname", length = 50)
    private String nickname;

    @Column(name = "title", length = 100, columnDefinition = "varchar(100)")
    private String title;

    @Column(name = "content", columnDefinition = "text")
    private String content;

    @Column(name = "price")
    private Integer price;

    @NotNull
    @Column(name = "state", columnDefinition = "char(1) NOT NULL default 'Y'")
    private String state = "Y";

    @Column(name = "images", columnDefinition = "json")
    private String images;

    @Column(name = "replycount")
    private Integer replycount;

    @Column(name = "likecount")
    private Integer likecount;

    @Column(name = "address1", length = 255)
    private String address1;

    @Column(name = "address2", length = 255)
    private String address2;

    @Column(name = "address3", length = 255)
    private String address3;
}