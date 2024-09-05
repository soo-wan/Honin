package com.team2.honin.honinserver.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Date;

@Data
@Entity
public class Infoshare {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inum")
    private Integer inum;

    @Column(name = "writer", length = 50)
    private String writer;

    @Column(name = "title", length = 50)
    private String title;

    @Column(name = "content", columnDefinition = "text")
    private String content;

    @Column(name = "writedate", columnDefinition = "timestamp default now()")
    @CreationTimestamp
    private Date writedate;

    @Column(name = "readcount", columnDefinition = "Integer default 0")
    private Integer readcount;

    @Column(name = "image", length = 1000)
    private String image;

    @Column(name = "savefilename", length = 1000)
    private String savefilename;
}
