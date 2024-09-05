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
@View(query = "CREATE VIEW cfreeview AS " +
        "SELECT " +
        "c.cfnum AS postnum, " +
        "c.content AS postcontent, " +
        "c.image, " +
        "c.readcount, " +
        "c.savefilename, " +
        "c.title AS posttitle " +
        "c.writedate AS postwritedate, " +
        "c.writer AS postwriter, " +
        "(SELECT COUNT(*) FROM cfreereply r WHERE r.cfnum = c.cfnum) AS replycount, " +
        "(SELECT COUNT(*) FROM cfreelike l2 WHERE l2.cfnum = c.cfnum) AS likecount , " +
        "'고민상담' AS tablename " +
        "FROM " +
        "cfree c")
@Entity
@Table(name = "canonymousview")
public class CanonymousView {
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
