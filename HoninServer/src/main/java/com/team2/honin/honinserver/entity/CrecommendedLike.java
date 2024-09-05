package com.team2.honin.honinserver.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "crecommendedlike")
public class CrecommendedLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer crlnum;

    @Column(name = "likenick", length = 50)
    private String likenick;

    @Column
    private Integer crnum;
}
