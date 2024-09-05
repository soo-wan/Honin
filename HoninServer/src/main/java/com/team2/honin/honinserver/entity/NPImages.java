package com.team2.honin.honinserver.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class NPImages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer npinum;

    @Column(length = 1000)
    private String savefilename;

    @ManyToOne
    @JoinColumn(name = "npnum")
    private NPolicy nPolicy;

    public void setNPolicy(NPolicy nPolicy) {
        this.nPolicy = nPolicy;
    }
}

