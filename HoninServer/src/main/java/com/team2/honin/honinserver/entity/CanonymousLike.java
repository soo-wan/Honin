package com.team2.honin.honinserver.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "canonymouslike")
public class CanonymousLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer calnum;

    @Column(name = "likenick", length = 50)
    private String likenick;

    @Column
    private Integer canum;
}
