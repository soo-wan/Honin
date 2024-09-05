package com.team2.honin.honinserver.entity.view;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.View;

import java.sql.Timestamp;

@Getter
@Immutable
@View(query = "CREATE VIEW secondhandview AS " +
        "SELECT s.snum, s.content, s.price, s.readcount, s.seller, s.state, s.title, s.writedate, " +
        "    JSON_ARRAYAGG(i.savefilename) AS images, " +
        "    COUNT(DISTINCT sr.srnum) AS replycount, " +
        "    COUNT(DISTINCT sl.slnum) AS likecount, " +
        "    m.address1, " +
        "    m.address2, " +
        "    m.address3 " +
        "FROM secondhand s " +
        "LEFT JOIN simages i ON i.snum = s.snum " +
        "LEFT JOIN sreply sr ON sr.snum = s.snum " +
        "LEFT JOIN slike sl ON sl.snum = s.snum " +
        "LEFT JOIN member m ON m.nickname = s.seller " + // `member` 테이블과 조인
        "GROUP BY s.snum, s.content, s.price, s.readcount, s.seller, s.state, s.title, s.writedate, " +
        "         m.address1, m.address2, m.address3")
@Entity
@Table(name = "secondhandview") // 뷰의 이름을 명시합니다.
public class SecondhandView {

    @Id
    @Column(name = "snum")
    private Integer snum;

    @Column(name = "content", columnDefinition = "text")
    private String content;

    @Column(name = "price")
    private Integer price;

    @Column(name = "readcount", columnDefinition = "Integer default 0")
    private Integer readcount;

    @Column(name = "seller", length = 50)
    private String seller;

    @NotNull
    @Column(name = "state", columnDefinition = "char(1) NOT NULL default 'Y'")
    private String state = "Y";

    @Column(name = "title", length = 50, columnDefinition = "varchar(50)")
    private String title;

    @Column(name = "writedate", columnDefinition = "timestamp default now()")
    @CreationTimestamp
    private Timestamp writedate;

    @Column(name = "images", columnDefinition = "json")
    private String images; // JSON 배열을 문자열로 저장합니다.

    @Column(name = "replycount")
    private Integer replycount; // 댓글 수

    @Column(name = "likecount")
    private Integer likecount; // 좋아요 수

    @Column(name = "address1", length = 100)
    private String address1;

    @Column(name = "address2", length = 100)
    private String address2;

    @Column(name = "address3", length = 100)
    private String address3;
}
