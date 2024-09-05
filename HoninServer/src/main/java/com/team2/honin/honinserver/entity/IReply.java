package com.team2.honin.honinserver.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Date;

@Data
@Entity
public class IReply {
    @Id
    @Column(name = "irnum")
    private Integer irnum;

    @Column(name = "inum", columnDefinition = "integer")
    private Integer inum;

    @Column(name = "writer", length = 50)
    private String writer;

    @Column(name = "content", length = 500)
    private String content;

    @Column(name = "writedate", columnDefinition = "timestamp default now()")
    @CreationTimestamp
    private Date writedate;

    @Column(name = "nickname", length = 50)
    private String nickname;

}
