package com.team2.honin.honinserver.entity.view;

import jakarta.persistence.*;
import lombok.Getter;
import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.View;

@Getter
@Immutable
@View(query = "CREATE VIEW honin.top10posts AS " +
        "WITH LikeCounts AS (" +
        "    SELECT " +
        "        'cfnum' AS boardname, " +
        "        cfree.title AS title, " +
        "        cfree.cfnum AS num, " +
        "        COUNT(cfreelike.cflnum) AS likecount " +
        "    FROM " +
        "        honin.cfree " +
        "    LEFT JOIN " +
        "        honin.cfreelike ON honin.cfree.cfnum = honin.cfreelike.cfnum " +
        "    GROUP BY " +
        "        honin.cfree.cfnum, honin.cfree.title " +
        "    UNION ALL " +
        "    SELECT " +
        "        'canum' AS boardname, " +
        "        canonymous.title AS title, " +
        "        canonymous.canum AS num, " +
        "        COUNT(canonymouslike.calnum) AS likecount " +
        "    FROM " +
        "        honin.canonymous " +
        "    LEFT JOIN " +
        "        honin.canonymouslike ON honin.canonymous.canum = honin.canonymouslike.canum " +
        "    GROUP BY " +
        "        honin.canonymous.canum, honin.canonymous.title " +
        "    UNION ALL " +
        "    SELECT " +
        "        'crnum' AS boardname, " +
        "        crecommended.title AS title, " +
        "        crecommended.crnum AS num, " +
        "        COUNT(crecommendedlike.crlnum) AS likecount " +
        "    FROM " +
        "        honin.crecommended " +
        "    LEFT JOIN " +
        "        honin.crecommendedlike ON honin.crecommended.crnum = honin.crecommendedlike.crnum " +
        "    GROUP BY " +
        "        honin.crecommended.crnum, honin.crecommended.title " +
        "    UNION ALL " +
        "    SELECT " +
        "        'ctnum' AS boardname, " +
        "        ctip.title AS title, " +
        "        ctip.ctnum AS num, " +
        "        COUNT(ctiplike.ctlnum) AS likecount " +
        "    FROM " +
        "        honin.ctip " +
        "    LEFT JOIN " +
        "        honin.ctiplike ON honin.ctip.ctnum = honin.ctiplike.ctnum " +
        "    GROUP BY " +
        "        honin.ctip.ctnum, honin.ctip.title " +
        "), " +
        "RankedPosts AS (" +
        "    SELECT " +
        "        ROW_NUMBER() OVER (ORDER BY likecount DESC) AS boardindex, " +
        "        boardname, " +
        "        num, " +
        "        title, " +
        "        likecount " +
        "    FROM " +
        "        LikeCounts " +
        ") " +
        "SELECT " +
        "    boardindex, " +
        "    boardname, " +
        "    num, " +
        "    title, " +
        "    likecount " +
        "FROM " +
        "    RankedPosts " +
        "WHERE " +
        "    boardindex <= 10 " +
        "ORDER BY " +
        "    boardindex")
@Entity
@Table(name = "top10posts")
public class Top10Posts {

    @Id
    @Column(name = "boardindex")
    private Integer boardindex;

    @Column(name = "boardname")
    private String boardname;

    @Column(name = "num")
    private Integer num;

    @Column(name = "title")
    private String title;

    @Column(name = "likecount")
    private Integer likecount;
}