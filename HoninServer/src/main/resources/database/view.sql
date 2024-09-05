-- secondhandView 생성
CREATE VIEW secondhandview AS
SELECT s.snum,
       s.content,
       s.price,
       s.readcount,
       s.seller,
       s.state,
       s.title,
       s.writedate,
       JSON_ARRAYAGG(i.savefilename) AS images,
       COUNT(DISTINCT sr.srnum)      AS replycount,
       COUNT(DISTINCT sl.slnum)      AS likecount,
       m.address1,
       m.address2,
       m.address3
FROM secondhand s
         LEFT JOIN simages i ON i.snum = s.snum
         LEFT JOIN sreply sr ON sr.snum = s.snum
         LEFT JOIN slike sl ON sl.snum = s.snum
         LEFT JOIN member m ON m.nickname = s.seller
GROUP BY s.snum, s.content, s.price, s.readcount, s.seller, s.state, s.title, s.writedate,
         m.address1, m.address2, m.address3;


-- 게시판 테이블에 댓글수와 좋아요수가 추가된 view 생성
CREATE VIEW cfreeview AS
SELECT c.cfnum                                                     AS postnum,
       c.content                                                   AS postcontent,
       c.image,
       c.readcount,
       c.savefilename,
       c.title                                                     AS posttitle,
       c.writedate                                                 AS postwritedate,
       c.writer                                                    AS postwriter,
       (SELECT COUNT(*) FROM cfreereply r WHERE r.cfnum = c.cfnum) AS replycount,
       (SELECT COUNT(*) FROM cfreelike l WHERE l.cfnum = c.cfnum)  AS likecount,
       '자유게시판'                                                     AS tablename
FROM cfree c;
CREATE VIEW canonymousview AS
SELECT c.canum                                                          AS postnum,
       c.content                                                        AS postcontent,
       c.image,
       c.readcount,
       c.savefilename,
       c.title                                                          AS posttitle,
       c.writedate                                                      AS postwritedate,
       c.writer                                                         AS postwriter,
       (SELECT COUNT(*) FROM canonymousreply r WHERE r.canum = c.canum) AS replycount,
       (SELECT COUNT(*) FROM canonymouslike l WHERE l.canum = c.canum)  AS likecount,
       '고민상담'                                                           AS tablename
FROM canonymous c;
CREATE VIEW ctipview AS
SELECT c.ctnum                                                    AS postnum,
       c.content                                                  AS postcontent,
       c.image,
       c.readcount,
       c.savefilename,
       c.title                                                    AS posttitle,
       c.writedate                                                AS postwritedate,
       c.writer                                                   AS postwriter,
       (SELECT COUNT(*) FROM ctipreply r WHERE r.ctnum = c.ctnum) AS replycount,
       (SELECT COUNT(*) FROM ctiplike l WHERE l.ctnum = c.ctnum)  AS likecount,
       '팁과 노하우'                                                   AS tablename
FROM ctip c;
CREATE VIEW crecommendedview AS
SELECT c.crnum                                                            AS postnum,
       c.content                                                          AS postcontent,
       c.image,
       c.readcount,
       c.savefilename,
       c.title                                                            AS posttitle,
       c.writedate                                                        AS postwritedate,
       c.writer                                                           AS postwriter,
       (SELECT COUNT(*) FROM crecommendedreply r WHERE r.crnum = c.crnum) AS replycount,
       (SELECT COUNT(*) FROM crecommendedlike l WHERE l.crnum = c.crnum)  AS likecount,
       '업체추천'                                                             AS tablename
FROM crecommended c;

-- 메인페이지 top10 리스트 뷰
CREATE VIEW honin.Top10Posts AS
WITH LikeCounts AS (
    -- cfree 게시판
    SELECT 'cfnum'                 AS boardname,
           cfree.title             AS title,
           cfree.cfnum             AS num,
           COUNT(cfreelike.cflnum) AS likecount
    FROM honin.cfree
             LEFT JOIN
         honin.cfreelike ON honin.cfree.cfnum = honin.cfreelike.cfnum
    GROUP BY honin.cfree.cfnum, honin.cfree.title

    UNION ALL
    -- canonymous 게시판
    SELECT 'canum'                      AS boardname,
           canonymous.title             AS title,
           canonymous.canum             AS num,
           COUNT(canonymouslike.calnum) AS likecount
    FROM honin.canonymous
             LEFT JOIN
         honin.canonymouslike ON honin.canonymous.canum = honin.canonymouslike.canum
    GROUP BY honin.canonymous.canum, honin.canonymous.title

    UNION ALL
    -- crecommended 게시판
    SELECT 'crnum'                        AS boardname,
           crecommended.title             AS title,
           crecommended.crnum             AS num,
           COUNT(crecommendedlike.crlnum) AS likecount
    FROM honin.crecommended
             LEFT JOIN
         honin.crecommendedlike ON honin.crecommended.crnum = honin.crecommendedlike.crnum
    GROUP BY honin.crecommended.crnum, honin.crecommended.title

    UNION ALL
    -- ctip 게시판
    SELECT 'ctnum'                AS boardname,
           ctip.title             AS title,
           ctip.ctnum             AS num,
           COUNT(ctiplike.ctlnum) AS likecount
    FROM honin.ctip
             LEFT JOIN
         honin.ctiplike ON honin.ctip.ctnum = honin.ctiplike.ctnum
    GROUP BY honin.ctip.ctnum, honin.ctip.title),

     RankedPosts AS (SELECT ROW_NUMBER() OVER (ORDER BY likecount DESC) AS boardindex, boardname,
                            num,
                            title,
                            likecount
                     FROM LikeCounts)

SELECT boardindex,
       boardname,
       num,
       title,
       likecount
FROM RankedPosts
WHERE boardindex <= 10
ORDER BY boardindex;

-- 찜 목록 조회 뷰 추가 닉네임별로 (중고리스트, 댓글, 이미지, 좋아요 조인 쿼리)
CREATE VIEW steamedlistview AS
SELECT sl.likenick                   AS nickname,
       sl.slnum,
       s.snum,
       s.title,
       s.content,
       s.price,
       s.state,
       JSON_ARRAYAGG(i.savefilename) AS images,
       COUNT(DISTINCT sr.srnum)      AS replycount,
       COUNT(DISTINCT sl2.slnum)     AS likecount,
       m.address1,
       m.address2,
       m.address3
FROM secondhand s
         LEFT JOIN slike sl ON s.snum = sl.snum
         LEFT JOIN simages i ON s.snum = i.snum
         LEFT JOIN sreply sr ON s.snum = sr.snum
         LEFT JOIN slike sl2 ON s.snum = sl2.snum
         LEFT JOIN member m ON m.nickname = s.seller
GROUP BY sl.likenick,
         sl.slnum,
         s.snum,
         s.title,
         s.content,
         s.price,
         s.state,
         m.address1,
         m.address2,
         m.address3;

-- storeinfo 와 storereview를 join하여 모두 조회
CREATE VIEW `storeinfo_review_view` AS
SELECT si.sinum,
       si.storeid,
       si.address,
       si.category,
       si.nickname AS store_nickname,
       si.phone,
       si.storename,
       si.url,
       si.roadname,
       si.lng,
       si.lat,
       sr.id       AS review_id,
       sr.content,
       sr.nickname AS review_nickname,
       sr.score,
       sr.writedate
FROM storeinfo si
         LEFT JOIN
     storereview sr ON si.storeid = sr.storeid;


-- 평점과 후기 수를 조회하기 위한 view
CREATE VIEW `storereviewinfo` AS
SELECT sr.id,
       sr.content,
       sr.nickname,
       sr.score,
       sr.storeid,
       sr.writedate,
       si.sinum,
       si.address,
       si.category,
       si.phone,
       si.storename,
       si.url,
       si.roadname,
       si.lng,
       si.lat
FROM storereview sr
         JOIN storeinfo si ON sr.storeid = si.storeid;


CREATE VIEW `hasreviewstoreview` AS
SELECT si.sinum,
       si.storeid,
       si.address,
       si.category,
       si.nickname,
       si.phone,
       si.storename,
       si.url,
       si.roadname,
       si.lng,
       si.lat
FROM storeinfo si
         INNER JOIN storereview sr ON si.storeid = sr.storeid
GROUP BY si.sinum, si.storeid;


-- 유통기한 임박 제품
CREATE VIEW ExpiringSoonProductsView AS
SELECT *
FROM honin.myfood
WHERE exdate >= CURDATE()
  AND exdate <= DATE_ADD(CURDATE(), INTERVAL 7 DAY)
ORDER BY exdate ASC;

-- 유통기한 만료 제품
CREATE VIEW ExpiredProductsView AS
SELECT *
FROM honin.myfood
WHERE exdate < CURDATE()
ORDER BY exdate ASC;
