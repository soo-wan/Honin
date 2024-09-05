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
@View(query = "CREATE VIEW hasreviewstoreview AS " +
        "SELECT si.storeid, " +
        "si.address, " +
        "si.category, " +
        "si.nickname, " +
        "si.phone, " +
        "si.storename, " +
        "si.url, " +
        "si.roadname, " +
        "si.lng, " +
        "si.lat " +
        "FROM storeinfo si " +
        "INNER JOIN storereview sr ON si.storeid = sr.storeid " +
        "GROUP BY si.storeid;")
@Entity
@Table(name = "hasreviewstoreview")
public class HasReviewStoreView {
    @Id
    @Column(name = "storeid")
    private String id;

    @Column(name = "address")
    private String address_name;

    @Column(name = "category")
    private String category_name;

    @Column(name = "nickname")
    private String nickname;

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
