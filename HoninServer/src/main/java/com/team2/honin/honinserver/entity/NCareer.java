package com.team2.honin.honinserver.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "NCareer")
@Getter
@Setter
public class NCareer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ncnum")
    private Integer ncnum;

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

    @OneToMany(mappedBy = "nCareer", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<NCImages> images;
}

