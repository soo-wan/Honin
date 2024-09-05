package com.team2.honin.honinserver.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;


@Data
@Entity
public class NPolicy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "npnum")
    private Integer npnum;

    @Column(name = "writer", length = 50)
    private String writer;

    @Column(name = "title", length = 50)
    private String title;

    @Column(name = "content", columnDefinition = "text")
    private String content;

    @Column(name = "writedate", columnDefinition = "timestamp default now()") //current_timestamp
    @CreationTimestamp
    private Timestamp writedate;  // Timestamp 타입으로 변경

    @Column(name = "readcount", columnDefinition = "Integer default 0")
    private Integer readcount;

    @OneToMany(mappedBy = "nPolicy", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<NPImages> images;

}

