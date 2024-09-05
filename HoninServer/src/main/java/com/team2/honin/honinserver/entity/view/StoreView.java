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
@View(query = "CREATE VIEW `storeinfo_review_view` AS " +
        "SELECT " +
         "si.storeid, " +
         "si.address, " +
         "si.category, " +
         "si.nickname AS store_nickname, " +
         "si.phone, " +
         "si.storename, " +
         "si.url, " +
         "si.roadname, " +
         "si.lng, " +
         "si.lat, " +
         "sr.id AS review_id, " +
         "sr.content, " +
         "sr.nickname AS review_nickname, " +
         "sr.score, " +
         "sr.writedate " +
        "FROM " +
         "storeinfo si " +
         "LEFT JOIN " +
         "storereview sr ON si.storeid = sr.storeid;")
@Entity
@Table(name = "storeinfo_review_view")
public class StoreView {

    @Id
    @Column(name = "storeid")
    private Integer id;

    @Column(name = "address")
    private String address_name;

    @Column(name = "category")
    private String category_name;

    @Column(name = "store_nickname")
    private String nickname;

    @Column(name = "phone")
    private String phone;

    @Column(name = "storename")
    private String place_name;

    @Column(name = "url")
    private String place_url;

    @Column(name = "roadname")
    private String road_address_name;

    @Column(name = "lng")
    private Double x;

    @Column(name = "lat")
    private Double y;

    @Column(name = "review_id")
    private Integer reviewid;

    @Column(name = "content")
    private String content;

    @Column(name = "review_nickname")
    private String reviewnickname;

    @Column(name = "score")
    private Integer score;

    @Column(name = "writedate")
    private Timestamp writedate;
}
