package com.team2.honin.honinserver.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "slike")
public class SLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer slnum;

    @Column(name = "likenick", length = 50)
    private String likenick;

    @Column
    private Integer snum;
}
