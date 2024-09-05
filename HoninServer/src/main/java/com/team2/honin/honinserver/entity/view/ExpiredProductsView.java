package com.team2.honin.honinserver.entity.view;

import jakarta.persistence.*;
import lombok.Getter;
import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.View;

import java.sql.Date;

@Getter
@Immutable
@View(query = "CREATE VIEW expiredproductsview AS " +
        "SELECT mfnum, category, exdate, fname, owner, safestate " +
        "FROM honin.myfood " +
        "WHERE exdate < CURDATE() " +
        "ORDER BY exdate ASC ")
@Entity
@Table(name = "expiredproductsview")
public class ExpiredProductsView {

    @Id
    @Column(name = "mfnum")
    private Integer mfnum;

    @Column(name = "category", length = 50)
    private String category;

    @Column(name = "exdate", columnDefinition = "date")
    private Date exdate;

    @Column(name = "fname", length = 100)
    private String fname;

    @Column(name = "owner", length = 50)
    private String owner;

    @Column(name = "safestate", length = 10)
    private String safestate;
}
