package com.team2.honin.honinserver.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "storeinfo")
public class StoreInfo {
    @Id
    @Column(name = "sinum")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int sinum;

    @Column(name = "storeid", length = 50)
    private String id;

    @Column(name = "storename", length = 100)
    private String place_name;

    @Column(name = "category", length = 100)
    private String category_name;

    @Column(name = "address", length = 100)
    private String address_name;

    @Column(name = "roadname", length = 100)
    private String road_address_name;

    @Column(name = "phone", length = 50)
    private String phone;

    @Column(name = "nickname", length = 50)
    private String nickname;

    @Column(name = "lat")
    private double y;

    @Column(name = "lng")
    private double x;

    @Column(name = "url", length = 100)
    private String place_url;
}
