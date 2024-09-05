package com.team2.honin.honinserver.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Data
@Entity
public class Canonymous {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer canum;

    @Column(name = "writer", length = 50)
    private String writer;

    @Column(name = "title", length = 50)
    private String title;

    @Column(name = "content", columnDefinition = "text")
    private String content;

    @Column(name = "writedate", columnDefinition = "timestamp default now()")
    @CreationTimestamp
    private Timestamp writedate;

    @Column(name = "readcount")
    private Integer readcount = 0;

    @Column(name = "image", length = 1000)
    private String image;

    @Column(name = "savefilename", length = 1000)
    private String savefilename;
}
