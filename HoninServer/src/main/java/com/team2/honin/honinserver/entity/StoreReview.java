package com.team2.honin.honinserver.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Data
@Entity
@Table(name = "storereview")
public class StoreReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "storeid", length = 50)
    private String storeid;

    @Column(name = "nickname", length = 50)
    private String nickname;

    @Column(name = "content", length = 255)
    private String content;

    @Column(name = "score")
    private int score;

    @Column(name = "writedate", columnDefinition = "timestamp default now()")
    @CreationTimestamp
    private Timestamp writedate;
}
