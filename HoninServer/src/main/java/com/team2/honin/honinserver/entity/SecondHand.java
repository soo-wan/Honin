package com.team2.honin.honinserver.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.List;

@Data
@Entity
@Table(name = "secondhand")
public class SecondHand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer snum;

    @Column(name = "seller", length = 50)
    private String seller;

    @Column(name = "buyer", length = 50)
    private String buyer;

    @Column(name = "title", length = 50)
    private String title;

    @Column(name = "content", columnDefinition = "text")
    private String content;

    @CreationTimestamp
    @Column(name = "writedate", columnDefinition = "timestamp default now()")
    private Timestamp writedate;

    @Column(name = "readcount", columnDefinition = "Integer default 0")
    private Integer readcount;

    @NotNull
    @Column(name = "state", columnDefinition = "char(1) NOT NULL default 'Y'")
    private String state = "Y";

    @Column(name = "price")
    private Integer price;

    @Column(name = "address1", length = 100)
    private String address1;

    @Column(name = "address2", length = 100)
    private String address2;

    @Column(name = "address3", length = 100)
    private String address3;

    @OneToMany(mappedBy = "secondHand", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<SImages> images;  // 이미지 리스트를 저장할 필드

    @ManyToOne
    @JoinColumn(name = "member_id")
    @JsonBackReference
    private Member member;
}
