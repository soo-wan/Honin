package com.team2.honin.honinserver.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "NCImages")
@Getter
@Setter
public class NCImages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ncinum;

    @Column(length = 1000)
    private String savefilename;

    @ManyToOne
    @JoinColumn(name = "ncnum")
    private NCareer nCareer;

    public void setNCareer(NCareer nCareer) {
        this.nCareer = nCareer;
    }
}

