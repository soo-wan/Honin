package com.team2.honin.honinserver.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Data
@Entity
@Table(name = "crecommendedreply")
public class CrecommendedReply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer replynum;

    @Column(name = "crnum")
    private Integer seq;

    @Column(name = "writer", length = 50)
    private String writer;

    @Column(name = "content", length = 500)
    private String content;

    @CreationTimestamp
    @Column(name = "writedate", columnDefinition = "timestamp default now()")
    private Timestamp writedate;
}
