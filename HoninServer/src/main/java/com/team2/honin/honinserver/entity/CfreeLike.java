package com.team2.honin.honinserver.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "cfreelike")
public class CfreeLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cflnum;

    @Column(name = "likenick", length = 50)
    private String likenick;

    @Column
    private Integer cfnum;
}
