package com.team2.honin.honinserver.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Data
@Entity
public class SReply {
    @Id
    @Column(name = "srnum")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer srnum;

    @Column(name = "snum")
    private Integer snum;

    @Column(name = "content", length = 500)
    private String content;

    @Column(name = "writedate", columnDefinition = "timestamp default now()")
    @CreationTimestamp
    private Timestamp writedate;

    @Column(name = "writer", length = 50)
    private String writer;

}

