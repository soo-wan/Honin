package com.team2.honin.honinserver.entity.view;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.View;

import java.sql.Timestamp;

@Getter
@Immutable
@View(query = "CREATE VIEW ctipview AS " +
        "SELECT " +
        "c.ctnum AS postnum, " +
        "c.content AS postcontent, " +
        "c.image, " +
        "c.readcount, " +
        "c.savefilename, " +
        "c.title AS posttitle, " +
        "c.writedate AS postwritedate, " +
        "c.writer AS postwriter, " +
        "(SELECT COUNT(*) FROM ctipreply r WHERE r.ctnum = c.ctnum) AS replycount, " +
        "(SELECT COUNT(*) FROM ctiplike l WHERE l.ctnum = c.ctnum) AS likecount , " +
        "'팁과 노하우' AS tablename " +
        "FROM " +
        "ctip c")
@Entity
@Table(name = "ctipview") // 뷰의 이름을 명시합니다.
public class CtipView {
    @Id
    @Column(name = "postnum")
    private Integer postnum;

    @Column(name = "postcontent", columnDefinition = "text")
    private String postcontent;

    @Column(name = "image", length = 1000)
    private String image;

    @Column(name = "readcount")
    private Integer readcount = 0;

    @Column(name = "savefilename", length = 1000)
    private String savefilename;

    @Column(name = "posttitle", length = 50)
    private String posttitle;

    @Column(name = "postwritedate", columnDefinition = "timestamp default now()")
    @CreationTimestamp
    private Timestamp postwritedate;

    @Column(name = "postwriter", length = 50)
    private String postwriter;

    @Column(name = "replycount")
    private Integer replycount;

    @Column(name = "likecount")
    private Integer likecount;

    @Column(name = "tablename", length = 30)
    private String tablename;
}
