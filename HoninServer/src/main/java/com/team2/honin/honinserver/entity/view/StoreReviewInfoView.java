package com.team2.honin.honinserver.entity.view;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.View;

import java.sql.Timestamp;

@Getter
@Immutable
@View(query = "CREATE VIEW storereviewinfo AS " +
        "SELECT " +
        "sr.id, " +
        "sr.content, " +
        "sr.nickname, " +
        "sr.score, " +
        "sr.storeid, " +
        "sr.writedate, " +
        "si.address, " +
        "si.category, " +
        "si.phone, " +
        "si.storename, " +
        "si.url, " +
        "si.roadname, " +
        "si.lng, " +
        "si.lat " +
        "FROM " +
        "storereview sr " +
        "JOIN " +
        "storeinfo si ON sr.storeid = si.storeid; ")
@Entity
@Table(name = "storereviewinfo")
public class StoreReviewInfoView {
    @Id
    @Column(name = "id")
    private Integer reviewid;

    @Column(name = "content")
    private String content;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "score")
    private Integer score;

    @Column(name = "storeid")
    private String id;

    @Column(name = "writedate")
    private Timestamp writedate;

    @Column(name = "address")
    private String address_name;

    @Column(name = "category")
    private String category_name;

    @Column(name = "phone")
    private String phone;

    @Column(name = "storename")
    private String place_name;

    @Column(name = "url")
    private String url;

    @Column(name = "roadname")
    private String road_address_name;

    @Column(name = "lng")
    private Double x;

    @Column(name = "lat")
    private Double y;
}
