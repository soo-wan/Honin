package com.team2.honin.honinserver.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "ctiplike")
public class CtipLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ctlnum;

    @Column(name = "likenick", length = 50)
    private String likenick;

    @Column
    private Integer ctnum;
}
