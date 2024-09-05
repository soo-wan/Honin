ALTER TABLE `honin`.`canonymous`
    ADD INDEX `canonymous_f1_idx` (`writer` ASC) VISIBLE;

ALTER TABLE `honin`.`canonymous`
    ADD CONSTRAINT `canonymous_f1`
        FOREIGN KEY (`writer`)
            REFERENCES `honin`.`member` (`nickname`)
            ON DELETE CASCADE
            ON UPDATE CASCADE;

ALTER TABLE `honin`.`canonymousreply`
    ADD INDEX `canonymousreply_f1_idx` (`writer` ASC) VISIBLE,
    ADD INDEX `canonymousreply_f2_idx` (`canum` ASC) VISIBLE;

ALTER TABLE `honin`.`canonymousreply`
    ADD CONSTRAINT `canonymousreply_f1`
        FOREIGN KEY (`writer`)
            REFERENCES `honin`.`member` (`nickname`)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
    ADD CONSTRAINT `canonymousreply_f2`
        FOREIGN KEY (`canum`)
            REFERENCES `honin`.`canonymous` (`canum`)
            ON
DELETE
CASCADE
            ON
UPDATE CASCADE;

ALTER TABLE `honin`.`cfree`
    ADD INDEX `cfree_f1_idx` (`writer` ASC) VISIBLE;

ALTER TABLE `honin`.`cfree`
    ADD CONSTRAINT `cfree_f1`
        FOREIGN KEY (`writer`)
            REFERENCES `honin`.`member` (`nickname`)
            ON DELETE CASCADE
            ON UPDATE CASCADE;

ALTER TABLE `honin`.`cfreereply`
    ADD INDEX `cfreereply_f1_idx` (`writer` ASC) VISIBLE,
    ADD INDEX `cfreereply_f2_idx` (`cfnum` ASC) VISIBLE;

ALTER TABLE `honin`.`cfreereply`
    ADD CONSTRAINT `cfreereply_f1`
        FOREIGN KEY (`writer`)
            REFERENCES `honin`.`member` (`nickname`)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
    ADD CONSTRAINT `cfreereply_f2`
        FOREIGN KEY (`cfnum`)
            REFERENCES `honin`.`cfree` (`cfnum`)
            ON
DELETE
CASCADE
            ON
UPDATE CASCADE;

ALTER TABLE `honin`.`crecommended`
    ADD INDEX `crecommended_f1_idx` (`writer` ASC) VISIBLE;

ALTER TABLE `honin`.`crecommended`
    ADD CONSTRAINT `crecommended_f1`
        FOREIGN KEY (`writer`)
            REFERENCES `honin`.`member` (`nickname`)
            ON DELETE CASCADE
            ON UPDATE CASCADE;

ALTER TABLE `honin`.`crecommendedreply`
    ADD INDEX `crecommendedreply_f1_idx` (`writer` ASC) VISIBLE,
    ADD INDEX `crecommendedreply_f2_idx` (`crnum` ASC) VISIBLE;

ALTER TABLE `honin`.`crecommendedreply`
    ADD CONSTRAINT `crecommendedreply_f1`
        FOREIGN KEY (`writer`)
            REFERENCES `honin`.`member` (`nickname`)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
    ADD CONSTRAINT `crecommendedreply_f2`
        FOREIGN KEY (`crnum`)
            REFERENCES `honin`.`crecommended` (`crnum`)
            ON
DELETE
CASCADE
            ON
UPDATE CASCADE;

ALTER TABLE `honin`.`ctip`
    ADD INDEX `ctip_f1_idx` (`writer` ASC) VISIBLE;

ALTER TABLE `honin`.`ctip`
    ADD CONSTRAINT `ctip_f1`
        FOREIGN KEY (`writer`)
            REFERENCES `honin`.`member` (`nickname`)
            ON DELETE CASCADE
            ON UPDATE CASCADE;

ALTER TABLE `honin`.`ctipreply`
    ADD INDEX `ctipreply_f1_idx` (`writer` ASC) VISIBLE,
    ADD INDEX `ctipreply_f2_idx` (`ctnum` ASC) VISIBLE;

ALTER TABLE `honin`.`ctipreply`
    ADD CONSTRAINT `ctipreply_f1`
        FOREIGN KEY (`writer`)
            REFERENCES `honin`.`member` (`nickname`)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
    ADD CONSTRAINT `ctipreply_f2`
        FOREIGN KEY (`ctnum`)
            REFERENCES `honin`.`ctip` (`ctnum`)
            ON
DELETE
CASCADE
            ON
UPDATE CASCADE;

ALTER TABLE `honin`.`infoshare`
    ADD INDEX `infoshare_f1_idx` (`writer` ASC) VISIBLE;

ALTER TABLE `honin`.`infoshare`
    ADD CONSTRAINT `infoshare_f1`
        FOREIGN KEY (`writer`)
            REFERENCES `honin`.`member` (`nickname`)
            ON DELETE CASCADE
            ON UPDATE CASCADE;

ALTER TABLE `honin`.`ireply`
    ADD INDEX `ireply_f1_idx` (`writer` ASC) VISIBLE,
    ADD INDEX `ireply_f2_idx` (`inum` ASC) VISIBLE;


ALTER TABLE `honin`.`ireply`
    ADD CONSTRAINT `ireply_f1`
        FOREIGN KEY (`writer`)
            REFERENCES `honin`.`member` (`nickname`)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
    ADD CONSTRAINT `ireply_f2`
        FOREIGN KEY (`inum`)
            REFERENCES `honin`.`infoshare` (`inum`)
            ON
DELETE
CASCADE
            ON
UPDATE CASCADE;

ALTER TABLE `honin`.`myfood`
    ADD INDEX `myfood_f1_idx` (`owner` ASC) VISIBLE;

ALTER TABLE `honin`.`myfood`
    ADD CONSTRAINT `myfood_f1`
        FOREIGN KEY (`owner`)
            REFERENCES `honin`.`member` (`nickname`)
            ON DELETE CASCADE
            ON UPDATE CASCADE;

ALTER TABLE `honin`.`secondhand`
    ADD INDEX `secondhand_f1_idx` (`seller` ASC) VISIBLE;

ALTER TABLE `honin`.`secondhand`
    ADD CONSTRAINT `secondhand_f1`
        FOREIGN KEY (`seller`)
            REFERENCES `honin`.`member` (`nickname`)
            ON DELETE CASCADE
            ON UPDATE CASCADE;



ALTER TABLE `honin`.`sreply`
    ADD INDEX `sreply_f1_idx` (`writer` ASC) VISIBLE,
    ADD INDEX `sreply_f2_idx` (`snum` ASC) VISIBLE;

ALTER TABLE `honin`.`sreply`
    ADD CONSTRAINT `sreply_f1`
        FOREIGN KEY (`writer`)
            REFERENCES `honin`.`member` (`nickname`)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
    ADD CONSTRAINT `sreply_f2`
        FOREIGN KEY (`snum`)
            REFERENCES `honin`.`secondhand` (`snum`)
            ON
DELETE
CASCADE
            ON
UPDATE CASCADE;

-- like 테이블들의 외래키설정

ALTER TABLE `honin`.`canonymouslike`
    ADD INDEX `canonymouslike_f1_idx` (`likenick` ASC) VISIBLE,
    ADD INDEX `canonymouslike_f2_idx` (`canum` ASC) VISIBLE;

ALTER TABLE `honin`.`canonymouslike`
    ADD CONSTRAINT `canonymouslike_f1`
        FOREIGN KEY (`likenick`)
            REFERENCES `honin`.`member` (`nickname`)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
    ADD CONSTRAINT `canonymouslike_f2`
        FOREIGN KEY (`canum`)
            REFERENCES `honin`.`canonymous` (`canum`)
            ON
DELETE
CASCADE
            ON
UPDATE CASCADE;

ALTER TABLE `honin`.`cfreelike`
    ADD INDEX `cfreelike_f1_idx` (`likenick` ASC) VISIBLE,
    ADD INDEX `cfreelike_f2_idx` (`cfnum` ASC) VISIBLE;

ALTER TABLE `honin`.`cfreelike`
    ADD CONSTRAINT `cfreelike_f1`
        FOREIGN KEY (`likenick`)
            REFERENCES `honin`.`member` (`nickname`)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
    ADD CONSTRAINT `cfreelike_f2`
        FOREIGN KEY (`cfnum`)
            REFERENCES `honin`.`cfree` (`cfnum`)
            ON
DELETE
CASCADE
            ON
UPDATE CASCADE;

ALTER TABLE `honin`.`crecommendedlike`
    ADD INDEX `crecommendedlike_f1_idx` (`likenick` ASC) VISIBLE,
    ADD INDEX `crecommendedlike_f2_idx` (`crnum` ASC) VISIBLE;

ALTER TABLE `honin`.`crecommendedlike`
    ADD CONSTRAINT `crecommendedlike_f1`
        FOREIGN KEY (`likenick`)
            REFERENCES `honin`.`member` (`nickname`)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
    ADD CONSTRAINT `crecommendedlike_f2`
        FOREIGN KEY (`crnum`)
            REFERENCES `honin`.`crecommended` (`crnum`)
            ON
DELETE
CASCADE
            ON
UPDATE CASCADE;

ALTER TABLE `honin`.`ctiplike`
    ADD INDEX `ctiplike_f1_idx` (`likenick` ASC) VISIBLE,
    ADD INDEX `ctiplike_f2_idx` (`ctnum` ASC) VISIBLE;

ALTER TABLE `honin`.`ctiplike`
    ADD CONSTRAINT `ctiplike_f1`
        FOREIGN KEY (`likenick`)
            REFERENCES `honin`.`member` (`nickname`)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
    ADD CONSTRAINT `ctiplike_f2`
        FOREIGN KEY (`ctnum`)
            REFERENCES `honin`.`ctip` (`ctnum`)
            ON
DELETE
CASCADE
            ON
UPDATE CASCADE;

ALTER TABLE `honin`.`slike`
    ADD INDEX `slike_f1_idx` (`likenick` ASC) VISIBLE,
    ADD INDEX `slike_f2_idx` (`snum` ASC) VISIBLE;

ALTER TABLE `honin`.`slike`
    ADD CONSTRAINT `slike_f1`
        FOREIGN KEY (`likenick`)
            REFERENCES `honin`.`member` (`nickname`)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
    ADD CONSTRAINT `slike_f2`
        FOREIGN KEY (`snum`)
            REFERENCES `honin`.`secondhand` (`snum`)
            ON
DELETE
CASCADE
            ON
UPDATE CASCADE;

ALTER TABLE `honin`.`simages`
    ADD INDEX `simages_f1_idx` (`sinum` ASC) VISIBLE;

ALTER TABLE `honin`.`simages`
    ADD CONSTRAINT `simages_f1`
        FOREIGN KEY (`snum`)
            REFERENCES `honin`.`secondhand` (`snum`)
            ON DELETE CASCADE
            ON UPDATE CASCADE;

ALTER TABLE `honin`.`storeinfo`
    ADD INDEX `storeinfo_f1_idx` (`nickname` ASC) VISIBLE;

ALTER TABLE `honin`.`storeinfo`
    ADD CONSTRAINT `storeinfo_f1`
        FOREIGN KEY (`nickname`)
            REFERENCES `honin`.`member` (`nickname`)
            ON DELETE CASCADE
            ON UPDATE CASCADE;

ALTER TABLE `honin`.`storereview`
    ADD INDEX `storereview_f1_idx` (`nickname` ASC) VISIBLE;

ALTER TABLE `honin`.`storereview`
    ADD CONSTRAINT `storereview_f1`
        FOREIGN KEY (`nickname`)
            REFERENCES `honin`.`member` (`nickname`)
            ON DELETE CASCADE
            ON UPDATE CASCADE;


INSERT INTO member(nickname, email, password, address1, address2, address3, phone, profileimg, profilemsg)
VALUES ('admin', 'admin@abc.com', '$2a$10$IIyaP8TYTPm53ojAVAUvR.Hvo7yXcfVoTG0UWEDoId4UHPfNS0SZm', '서울시 강남구 상섬동 11-23',
        '607호', '서울시 강남구 삼성동', '010-5555', 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/member/nah.jpg', '난 나옹이다옹'),
       ('양용호', 'user01@abc.com', '$2a$10$IIyaP8TYTPm53ojAVAUvR.Hvo7yXcfVoTG0UWEDoId4UHPfNS0SZm', '서울시 강남구 논현동 102-3',
        '102호', '서울시 강남구 논현동', '010-1111', 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/member/pika.png', '피카피카'),
       ('오수완', 'user02@abc.com', '$2a$10$IIyaP8TYTPm53ojAVAUvR.Hvo7yXcfVoTG0UWEDoId4UHPfNS0SZm', '서울시 종로구 낙원동 120-12',
        '504호', '서울시 종로구 낙원동', '010-2222', 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/member/pairi.jpg', '파이리파이리'),
       ('오빛나리', 'user03@abc.com', '$2a$10$IIyaP8TYTPm53ojAVAUvR.Hvo7yXcfVoTG0UWEDoId4UHPfNS0SZm', '서울시 중랑구 중동 8-12',
        'B01호', '서울시 중랑구 중동', '010-3333', 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/member/seed.png', '이상해씨이상해씨'),
       ('송테무깡', 'user04@abc.com', '$2a$10$IIyaP8TYTPm53ojAVAUvR.Hvo7yXcfVoTG0UWEDoId4UHPfNS0SZm', '서울시 은평구 녹번동 108-30',
        '101호', '서울시 은평구 녹번동', '010-4444', 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/member/yadoran.jpg', '야도란야도란'),
       ('송버그', 'user05@abc.com', '$2a$10$IIyaP8TYTPm53ojAVAUvR.Hvo7yXcfVoTG0UWEDoId4UHPfNS0SZm', '서울시 강남구 삼성동 11-23',
        '1104호', '서울시 강남구 삼성동', '010-5555', 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/member/majayong.jpg', '마자용마자용'),
       ('이학바리', 'user06@abc.com', '$2a$10$IIyaP8TYTPm53ojAVAUvR.Hvo7yXcfVoTG0UWEDoId4UHPfNS0SZm', '서울시 도봉구 가리봉길 14-3',
        '102호', '서울시 도봉구 가리봉동', '010-3333-3333', 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/member/carrot.jpg', '당근당근'),
       ('김태희', 'user07@abc.com', '$2a$10$IIyaP8TYTPm53ojAVAUvR.Hvo7yXcfVoTG0UWEDoId4UHPfNS0SZm', '서울시 강남구 역삼동 123-45',
        '203호', '서울시 강남구 역삼동', '010-3333-3334', 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/member/apple.jpg', '사과사과'),
       ('조준서', 'user08@abc.com', '$2a$10$IIyaP8TYTPm53ojAVAUvR.Hvo7yXcfVoTG0UWEDoId4UHPfNS0SZm', '서울시 서초구 반포동 67-89',
        '304호', '서울시 서초구 반포동', '010-3333-3335', 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/member/bae.jpg', '배배'),
       ('김민주', 'user09@abc.com', '$2a$10$IIyaP8TYTPm53ojAVAUvR.Hvo7yXcfVoTG0UWEDoId4UHPfNS0SZm', '서울시 송파구 잠실동 32-21',
        '405호', '서울시 송파구 잠실동', '010-3333-3336', 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/member/orange.jpg', '오렌지오렌지'),
       ('박정빈', 'user10@abc.com', '$2a$10$IIyaP8TYTPm53ojAVAUvR.Hvo7yXcfVoTG0UWEDoId4UHPfNS0SZm', '서울시 마포구 합정동 98-76',
        '506호', '서울시 마포구 합정동', '010-3333-3337', 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/member/strowberry.jpg', '딸기딸기'),
       ('이정주', 'user11@abc.com', '$2a$10$IIyaP8TYTPm53ojAVAUvR.Hvo7yXcfVoTG0UWEDoId4UHPfNS0SZm', '서울시 용산구 이태원동 12-34',
        '607호', '서울시 용산구 이태원동', '010-3333-3338', 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/member/podo.jpg', '포도포도'),
       ('김현재', 'user12@abc.com', '$2a$10$IIyaP8TYTPm53ojAVAUvR.Hvo7yXcfVoTG0UWEDoId4UHPfNS0SZm', '서울시 광진구 자양동 55-44',
        '708호', '서울시 광진구 자양동', '010-3333-3339', 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/member/banana.jpg', '바나나바나나'),
       ('이대승', 'user13@abc.com', '$2a$10$IIyaP8TYTPm53ojAVAUvR.Hvo7yXcfVoTG0UWEDoId4UHPfNS0SZm', '서울시 강서구 화곡동 22-15',
        '809호', '서울시 강서구 화곡동', '010-3333-3340', 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/member/cherry.jpg', '체리체리'),
       ('박단비', 'user14@abc.com', '$2a$10$IIyaP8TYTPm53ojAVAUvR.Hvo7yXcfVoTG0UWEDoId4UHPfNS0SZm', '서울시 동작구 노량진동 100-12',
        '910호', '서울시 동작구 노량진동', '010-3333-3341', 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/member/watermelon.jpg', '수박수박'),
       ('곽수아', 'user15@abc.com', '$2a$10$IIyaP8TYTPm53ojAVAUvR.Hvo7yXcfVoTG0UWEDoId4UHPfNS0SZm', '서울시 서대문구 충정로 45-67',
        '1010호', '서울시 서대문구 충정동', '010-3333-3342', 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/member/mango.png', '망고망고');

INSERT INTO cfree (cfnum, content, image, readcount, savefilename, title, writedate, writer)
VALUES (1, '6월 실화냐ㄹㅇ 누가 훔쳐감?', '6th.png', 152, 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/community/6th.png', '벌써 6월 실화냐 5월 돌려줘요', '2024-05-15', '양용호'),
       (2, 'ㅅㅂ개갈구던 선임 면상나오더라', 'bearmy.webp', 263, 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/community/bearmy.webp', '재입대하는 꿈 꿨다 질문안받는다', '2024-08-21', '이정주'),
       (3, '이사업체 추천 <양용호 이사>라고 든든하고 듬직하더라 근데 업체추천 게시판은 뭐냐?', 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/community/movebox.jpg', 331, 'movebox.jpg', '이사업체 추천 받냐?',
        '2024-03-11', '곽수아'),
       (4, '나머지 나이는 뒷마당에 두고옴ㅇㅇ', 'myage.jpg', 278, 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/community/myage.jpg', '용호는 10짤', '2024-08-09', '이학바리'),
       (5, '이미 늦었삼ㅋ', 'toolate.jpeg', 84, 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/community/toolate.jpeg', '여태까지 살아온 인생이 후회될때 있냐?', '2022-10-05', '송테무깡'),
       (6, '짤로 내용 대체', 'thanksfreinds.jpeg', 112, 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/community/thanksfreinds.jpeg', '길가다 급똥마려웠던 썰', '2024-01-28', '오빛나리'),
       (7, '다 읽었니? 자 이제 할일을 하자', 'whatthe.jpg', 198, 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/community/whatthe.jpg', '다들 힘내 좋아를 거꾸로 읽어보자', '2024-02-03', '박정빈'),
       (8, '상체 쉬었더니 점심 닭가슴살 빼먹은 기분이다', 'helchang.jpeg', 46, 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/community/helchang.jpeg', '헬스 2주차인데 이런 기분 드는거 정상임?', '2024-08-17',
        '조준서'),
       (9, '응 오늘의 집', 'myhouse2.avif', 300, 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/community/myhouse2.avif', '이런 집은 어디서 구하냐', '2024-07-14', '오수완'),
       (10, '어떻게 생각해?', 'myiq.jpg', 212, 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/community/myiq.jpg', '나 요즘 ㄹㅇ 지능 문제 있는거같다', '2024-05-30', '양용호'),
       (11, '난 우선 맛있음ㅇㅇ', 'mymeal.webp', 189, 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/community/mymeal.webp', '오늘 식단 어떰', '2024-07-20', '곽수아'),
       (12, '예쁘지 않음?', 'food.jpeg', 375, 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/community/food.jpeg', '컨셉사진 찍어봤어', '2024-04-16', '송버그'),
       (13, '트럭 하나로 운전해서 옴', 'move3.jpg', 158, 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/community/move3.jpg', '방금 이사왔습니다 인사 오지게 박습니다', '2024-06-21', '이학바리'),
       (14, '자꾸 옆집 여자가 잼얘해달라는데 이거 무슨 뜻이냐', 'funnystory2.jpeg', 68, 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/community/funnystory2.jpeg', '잼얘 없냐?', '2024-08-09', '오빛나리'),
       (15, 'ㅇㅇ?', 'whereismymoney.jpg', 343, 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/community/whereismymoney.jpg', '내 나이 서른 500원 모았습니다 결혼 가능할까요?', '2024-08-11', '박정빈');



INSERT INTO `ctip` (`content`, `readcount`, `title`, `writer`, `writedate`)
VALUES ('자취방에서 간단히 만들 수 있는 요리 레시피 모음', 220, '자취 요리 레시피', '김태희', NOW() - INTERVAL 1 MINUTE),
       ('저렴하게 방을 꾸미는 인테리어 팁', 185, '저렴한 인테리어', '곽수아', NOW() - INTERVAL 2 MINUTE),
       ('자취생을 위한 생활 필수품 리스트', 150, '생활 필수품', '박정빈', NOW() - INTERVAL 3 MINUTE),
       ('월세 절약하는 방법과 팁', 210, '월세 절약 팁', '이정주', NOW() - INTERVAL 4 MINUTE),
       ('자취생이 알아두면 좋은 청소 꿀팁', 195, '청소 꿀팁', '이학바리', NOW() - INTERVAL 5 MINUTE),
       ('혼자서 간단하게 할 수 있는 운동 방법', 170, '간단한 운동법', '박단비', NOW() - INTERVAL 6 MINUTE),
       ('자취생을 위한 빨래 효율적으로 하는 법', 180, '효율적인 빨래법', '조준서', NOW() - INTERVAL 7 MINUTE),
       ('혼자서 쉽게 수리할 수 있는 집안 수리 방법', 165, '간단한 집안 수리', '송테무깡', NOW() - INTERVAL 8 MINUTE),
       ('자취 생활에서의 스트레스 관리법', 190, '스트레스 관리법', '송테무깡', NOW() - INTERVAL 9 MINUTE),
       ('자취방에서 절약할 수 있는 전기 및 수도 요금 절약 팁', 200, '전기/수도 절약 팁', '송테무깡', NOW() - INTERVAL 10 MINUTE);

INSERT INTO `ctip` (`content`, `readcount`, `title`, `writer`, `writedate`)
VALUES ('자취 생활을 더욱 즐겁게 해주는 팁', 155, '즐거운 자취 생활', '이정주', NOW() - INTERVAL 1 HOUR),
       ('자취생을 위한 간단한 인테리어 아이디어', 175, '간단한 인테리어 아이디어', '곽수아', NOW() - INTERVAL 6 HOUR),
       ('자취방 청소를 효과적으로 하는 법', 185, '효과적인 청소법', '오빛나리', NOW() - INTERVAL 12 HOUR),
       ('자취생을 위한 경제적인 팁', 195, '경제적인 자취 팁', '오수완', NOW() - INTERVAL 20 HOUR),
       ('자취방의 안전을 높이는 간단한 방법', 205, '자취방 안전', '양용호', NOW() - INTERVAL 30 HOUR),
       ('자취 방의 방충 팁', 215, '방충 팁', '김태희', NOW() - INTERVAL 50 HOUR),
       ('자취 생활을 위한 다양한 아이템 추천', 225, '생활 아이템 추천', '조준서', NOW() - INTERVAL 80 HOUR),
       ('자취 시작 8일 전의 팁과 요령', 235, '자취 시작 팁', '박단비', NOW() - INTERVAL 8 DAY),
       ('자취 생활의 30일 전 준비 팁', 245, '30일 전 준비 팁', '양용호', NOW() - INTERVAL 30 DAY),
       ('자취 1년을 맞이하며 느낀 점', 255, '1년 자취 후기', '오빛나리', NOW() - INTERVAL 1 YEAR);


INSERT INTO `crecommended` (`content`, `readcount`, `title`, `writer`, `writedate`)
VALUES ('서울에서 저렴하고 친절한 이삿짐 센터 추천합니다. 최근 이용했는데 서비스가 훌륭했습니다.', 150, '서울 이삿짐 센터 추천', '오수완', NOW() - INTERVAL 1 MINUTE),
       ('자취생들을 위한 가성비 좋은 청소 업체를 소개합니다. 청소 품질이 매우 좋았습니다.', 120, '가성비 좋은 청소 업체', '이학바리', NOW() - INTERVAL 2 MINUTE),
       ('원룸 수리할 때 이용할 만한 수리 업체를 찾았습니다. 친절하고 가격도 합리적입니다.', 130, '원룸 수리 업체 추천', '이정주', NOW() - INTERVAL 3 MINUTE),
       ('이사를 도와주는 작은 이삿짐 센터를 찾고 계신다면 여기를 추천합니다. 서비스가 좋습니다.', 140, '작은 이삿짐 센터 추천', '박정빈', NOW() - INTERVAL 4 MINUTE),
       ('자취방 청소할 때 이용하기 좋은 청소 업체를 추천합니다. 매우 청결하게 해줍니다.', 110, '자취방 청소 업체 추천', '김태희', NOW() - INTERVAL 5 MINUTE),
       ('이사할 때 필요한 모든 것을 제공해주는 종합 이삿짐 센터를 소개합니다. 아주 편리했습니다.', 160, '종합 이삿짐 센터 추천', '곽수아', NOW() - INTERVAL 6 MINUTE),
       ('자취생에게 필요한 간단한 수리 서비스를 제공하는 회사를 추천합니다. 가격도 착합니다.', 125, '간단한 수리 서비스 추천', '이대승', NOW() - INTERVAL 7 MINUTE),
       ('이사 후 청소가 필요할 때 이용할 수 있는 청소 업체를 추천합니다. 서비스가 빠르고 좋습니다.', 135, '이사 후 청소 업체', '박단비', NOW() - INTERVAL 8 MINUTE),
       ('이사 비용 절감을 원하시면 이 업체를 추천합니다. 합리적인 가격에 서비스를 제공합니다.', 145, '이사 비용 절감 업체', '김민주', NOW() - INTERVAL 9 MINUTE),
       ('전문적이고 신뢰할 수 있는 수리 업체를 찾고 계신다면 여기를 추천합니다. 매우 만족스러웠습니다.', 155, '전문 수리 업체 추천', '김민주',
        NOW() - INTERVAL 10 MINUTE);


INSERT INTO `crecommended` (`content`, `readcount`, `title`, `writer`, `writedate`)
 VALUES ('서울의 추천 이삿짐 센터', 165, '서울 이삿짐 센터', '김민주', NOW() - INTERVAL 1 HOUR),
        ('자취방 청소를 도와주는 훌륭한 업체', 175, '자취방 청소 업체', '송테무깡', NOW() - INTERVAL 6 HOUR),
        ('원룸 수리의 좋은 업체 추천', 185, '원룸 수리 업체', '송버그', NOW() - INTERVAL 12 HOUR),
        ('작은 이삿짐 센터의 장점', 195, '작은 이삿짐 센터', '이학바리', NOW() - INTERVAL 20 HOUR),
        ('자취방 청소를 완벽하게 해주는 업체', 205, '청소 업체', '이정주', NOW() - INTERVAL 30 HOUR),
        ('모든 이사를 지원해주는 종합 이삿짐 센터', 215, '종합 이삿짐 센터', '박정빈', NOW() - INTERVAL 50 HOUR),
        ('자취생을 위한 간단한 수리 서비스', 225, '수리 서비스', '곽수아', NOW() - INTERVAL 80 HOUR),
        ('이사 후 청소의 중요성과 추천 업체', 235, '이사 후 청소', '오수완', NOW() - INTERVAL 8 DAY),
        ('이사 비용 절감을 위한 업체 추천', 245, '이사 비용 절감', '박단비', NOW() - INTERVAL 30 DAY),
        ('전문적인 수리 업체의 신뢰도', 255, '전문 수리 업체', '조준서', NOW() - INTERVAL 1 YEAR);


INSERT INTO `canonymous` (`content`, `readcount`, `title`, `writer`, `writedate`)
VALUES ('최근 자취를 시작했는데, 혼자 있는 시간이 많아 외로움을 느낍니다. 어떻게 극복할 수 있을까요?', 180, '자취 생활의 외로움 극복 방법', '오빛나리',
        NOW() - INTERVAL 1 MINUTE),
       ('시험 기간이 다가오는데 집중이 잘 안 됩니다. 공부에 집중할 수 있는 팁이 있을까요?', 160, '시험 공부 집중 팁', '송테무깡', NOW() - INTERVAL 2 MINUTE),
       ('방 청소를 꾸준히 하기 어려워요. 좋은 습관을 기르는 방법이 있을까요?', 150, '청소 습관 기르기', '박정빈', NOW() - INTERVAL 3 MINUTE),
       ('친구와의 갈등 때문에 고민입니다. 어떻게 해결하면 좋을까요?', 170, '친구와의 갈등 해결 방법', '조준서', NOW() - INTERVAL 4 MINUTE),
       ('자취하면서 식비를 절약하고 싶은데, 좋은 방법이 있을까요?', 200, '식비 절약 방법', '오수완', NOW() - INTERVAL 5 MINUTE),
       ('자취방에서 벌레가 나와서 걱정입니다. 효과적인 방충 방법이 있을까요?', 190, '자취방 방충 팁', '양용호', NOW() - INTERVAL 6 MINUTE),
       ('학교 생활과 자취 생활을 균형 있게 할 수 있는 방법이 궁금합니다.', 140, '학교와 자취 생활 균형 맞추기', '곽수아', NOW() - INTERVAL 7 MINUTE),
       ('밤에 잠이 잘 오지 않아서 고민입니다. 수면의 질을 높이는 방법이 있을까요?', 130, '수면의 질 향상 방법', '송버그', NOW() - INTERVAL 8 MINUTE),
       ('자취하면서 친구를 사귀기가 어렵네요. 어떻게 하면 좋을까요?', 175, '자취 생활에서 친구 사귀기', '박단비', NOW() - INTERVAL 9 MINUTE),
       ('혼자 지내다 보니 건강 관리가 잘 안 됩니다. 자취생을 위한 건강 관리 팁이 있을까요?', 185, '자취생 건강 관리 팁', '이정주', NOW() - INTERVAL 10 MINUTE);


INSERT INTO `canonymous` (`content`, `readcount`, `title`, `writer`, `writedate`)
 VALUES ('자취 생활의 외로움을 극복하는 방법', 190, '외로움 극복 방법', '조준서', NOW() - INTERVAL 1 HOUR),
        ('시험 기간 집중력을 높이는 팁', 170, '시험 집중 팁', '박정빈', NOW() - INTERVAL 6 HOUR),
        ('청소 습관을 기르는 좋은 방법', 160, '청소 습관', '이학바리', NOW() - INTERVAL 12 HOUR),
        ('갈등 해결을 위한 효과적인 방법', 150, '갈등 해결', '송버그', NOW() - INTERVAL 20 HOUR),
        ('식비 절약의 다양한 방법', 140, '식비 절약', '김민주', NOW() - INTERVAL 30 HOUR),
        ('방충 팁과 자취 생활', 130, '방충 팁', '곽수아', NOW() - INTERVAL 50 HOUR),
        ('학교와 자취 생활의 균형 맞추기', 120, '균형 맞추기', '곽수아', NOW() - INTERVAL 80 HOUR),
        ('수면 질 향상 방법', 110, '수면 질 향상', '송버그', NOW() - INTERVAL 8 DAY),
        ('자취 친구 사귀기 노하우', 105, '친구 사귀기', '박정빈', NOW() - INTERVAL 30 DAY),
        ('자취생 건강 관리 팁', 100, '건강 관리', '이정주', NOW() - INTERVAL 1 YEAR);

-- 예제 데이터를 삽입하기 위해 'secondhand' 테이블에 데이터 삽입
INSERT INTO secondhand (snum, content, price, readcount, seller, title)
VALUES (1, '에어팟 프로2 팔아요 상태 좋아요 근데 가끔 왼쪽이 안들리는데 충전 잘하시면 될것 같습니다', '230000', '80', '김민주', '에어팟 프로2'),
       (2, '가방 팝니다. 세번 썼어요. 평소 스타일과 맞지 않아 판매합니다 15만원에 샀어요. 카키색 검은색 있습니다 문의주세요. 예민한 분 사절', '50000', '100', '오빛나리',
        '디스커버리 백팩'),
       (3, '핏 좋은 와이드 카고 팬츠입니다. 잘 입다가 스타일이 바뀌어서 판매해요. 제 착샷도 첨부합니다. 핏 보시고 구매하실분만 연락주세요', '20000', '60', '이학바리',
        '와이드핏 카고 팬츠'),
       (4, '10년 정도 쓰던건데 최근 헐거운 부분 나사 조이니까 새것 같습니다. 빈티지한 세월의 흐름이 느껴져요. 빈티지의 가치를 아시는 분만 연락 부탁드립니다', '150000', '50', '박정빈',
        '빈티지한 원목 의자'),
       (5, '이사가게 되면서 필요한 분 있을까 올려봅니다. 10개 모아뒀어요 필요한분 연락주세요. 아메리카노 10개는 드실 수 있을 겁니다', '30000', '80', '이정주',
        '동네 카페 커피 쿠폰'),
       (6, '회사 탕비실에서 쿠크다스 가져왔는데 안먹을것 같아서 팝니다... 예민한 분 사절', '5000', '120', '조준서', '쿠크다스 2박스'),
       (7, '그릇으로 유명한 메종 디올 그릇입니다. 선물할려다가 기분나빠져서 그냥 팝니다 비싼거에요 예쁩니다', '130000', '130', '곽수아', '메종 디올 그릇'),
       (8, '사용감 있으나 전체적으로 좋은 컨디션입니다. 안그래도 싸게 파는데 이것저것 재실 분은 연락주지 마세요', '40000', '135', '양용호', '퓨마 건담 운동화'),
       (9, '야마하 기타 유명한 거 다들 아실 겁니다. 기타 입문 2주만에 질려서 팝니다... 저보다 좋은 주인 만나길 바랍니다', '100000', '90', '박정빈', '야마하 일렉기타'),
       (10, '자취방에 이만한 조명 없습니다. 사진 보시죠', '30000', '80', '오수완', '이케아 조명'),
       (11, '이니스프리 미개봉 스킨&로션입니다. 너무 많이 쟁여둬서 팝니다.', '30000', '50', '박단비', '이니스프리 스킨&로션'),
       (12, '사이즈 280 네고문의 절대사절 직거래시 정품 영수증 보여드립니다', '280000', '180', '오빛나리', '나이키 조던 280'),
       (13, '집 꾸미려고 샀는데 몇개는 인테리어랑 안어울려서 팝니다. 사진 중 맘에 드는 거 골라서 연락주세요, 개당 가격입니다.', '20000', '50', '오빛나리', '앙리 마티스 액자'),
       (14, '상태 좋아요 롯데백화점에서 샀습니다 예민한분은 거절합니다 색깔 맘에 드는 거 보고 문의주세요', '30000', '80', '이정주', '나이키 헤리티지 볼캡 팝니다'),
       (15, '리미티드 에디션입니다. 같이 들어있던 게임팩도 드립니다.', '330000', '280', '양용호', '닌텐도 포켓몬 피카츄 에디션'),
       (16, '파혼해서 팝니다. 기타문의 사양합니다. 급처합니다.', '230000', '70', '박정빈', '14K 금 귀걸이'),
       (17, '살려주세요 명절이라고 스팸을 너무 많이 받았습니다... 누가 저 대신 먹어주세요', '30000', '120', '이학바리', '스팸'),
       (18, '산지 이틀된 블루투스 스피커입니다. 소리 잘나옵니다.', '40000', '120', '오수완', '블루투스 스피커'),
       (19, '자취생 필수품 아닌가요? 많이 샀는데 환불교환 귀찮아서 올립니다. 필요한 분 싼 값에 가져가세요', '10000', '40', '박단비', '스탠 반찬통'),
       (20, '상태 좋아요', '35000', '80', '곽수아', '원목스툴'),
       (21, '3년 썼습니다. 3만원 추가시 배송해드립니다.', '230000', '80', '오빛나리', 'LG트롬 드럼세탁기');


-- 예제 데이터를 삽입하기 위해 'simages' 테이블에 데이터 삽입
INSERT INTO simages (savefilename, snum)
VALUES ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/airpot1.jpg', 1),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/airpot2.jpg', 1),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/airpot3.jpg', 1),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/bag1.jpg', 2),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/bag2.jpg', 2),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/bag3.jpg', 2),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/bag4.jpg', 2),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/bag5.jpg', 2),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/cargopants1.jpg', 3),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/cargopants2.jpg', 3),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/cargopants3.jpg', 3),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/chair1.jpg', 4),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/chair2.jpg', 4),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/coupon1.png', 5),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/coupon2.png', 5),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/couque1.jpg', 6),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/couque2.jpg', 6),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/dior1.jpeg', 7),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/dior2.jeg', 7),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/puma1.jpg', 8),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/puma2.jpg', 8),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/puma3.jpg', 8),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/guitar1.jpg', 9),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/guitar2.jpg', 9),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/ikea1.jpg', 10),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/ikea2.jpg', 10),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/ikea3.jpg', 10),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/innisfree1.jpg', 11),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/innisfree2.jpg', 11),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/jordan1.jpg', 12),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/jordan2.jpg', 12),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/jordan3.jpg', 12),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/jordan4.jpg', 12),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/martis1.jpg', 13),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/martis2.jpg', 13),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/martis3.jpg', 13),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/nike1.jpg', 14),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/nike2.jpg', 14),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/nike3.jpg', 14),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/nike4.jpg', 14),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/nintendo1.jpg', 15),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/nintendo2.jpg', 15),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/ring1.jpg', 16),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/ring2.jpg', 16),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/spam1.jpg', 17),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/spam2.jpg', 17),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/spam3.jpg', 17),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/speaker1.jpg', 18),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/speaker2.jpg', 18),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/stan1.jpg', 19),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/stan2.jpg', 19),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/stan3.jpg', 19),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/stool1.jpg', 20),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/stool2.jpg', 20),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/trom1.jpg', 21),
       ('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/secondhand/trom2.jpg', 21);

INSERT INTO cfreelike (cflnum, cfnum, likenick)
VALUES (1, 1, '오수완'),
       (2, 1, '오빛나리'),
       (3, 1, '오빛나리'),
       (4, 1, '조준서'),
       (5, 1, '이학바리'),
       (6, 2, '곽수아'),
       (7, 2, '김민주'),
       (8, 3, '이대승');

INSERT INTO canonymouslike (calnum, canum, likenick)
VALUES (1, 1, '조준서'),
       (2, 1, '오수완'),
       (3, 1, '박정빈'),
       (4, 2, '이학바리'),
       (5, 3, '박단비');

INSERT INTO crecommendedlike (crlnum, crnum, likenick)
VALUES (1, 1, '조준서'),
       (2, 1, '오수완'),
       (3, 2, '박정빈'),
       (4, 2, '김민주'),
       (5, 3, '곽수아');

INSERT INTO ctiplike (ctlnum, ctnum, likenick)
VALUES (1, 1, '이정주'),
       (2, 2, '박정빈'),
       (3, 2, '오빛나리'),
       (4, 3, '오수완'),
       (5, 4, '이학바리');

INSERT INTO `cfreereply` (`cfnum`, `content`, `writer`)
VALUES (1, 'This is a comment 1', '조준서'),
       (2, 'This is a comment 2', '오수완'),
       (3, 'This is a comment 3', '오빛나리'),
       (4, 'This is a comment 4', '양용호'),
       (5, 'This is a comment 5', '김민주'),
       (6, 'This is a comment 6', '곽수아'),
       (7, 'This is a comment 7', '이학바리'),
       (8, 'This is a comment 8', '송테무깡'),
       (9, 'This is a comment 9', '송버그'),
       (10, 'This is a comment 10', '송테무깡'),
       (1, 'This is a comment 11', '송테무깡'),
       (2, 'This is a comment 12', '김현재'),
       (3, 'This is a comment 13', '김현재'),
       (4, 'This is a comment 14', '송버그'),
       (5, 'This is a comment 15', '송테무깡'),
       (6, 'This is a comment 16', '이학바리'),
       (7, 'This is a comment 17', '박정빈'),
       (8, 'This is a comment 18', '이학바리'),
       (9, 'This is a comment 19', '박정빈'),
       (10, 'This is a comment 20', '이정주');

INSERT INTO member_member_role_list (member_nickname, member_role_list)
VALUES ('양용호', '0'),
       ('오수완', '0'),
       ('오빛나리', '0'),
       ('송테무깡', '0'),
       ('송버그', '0'),
       ('이학바리', '0'),
       ('김태희', '0'),
       ('조준서', '0'),
       ('김민주', '0'),
       ('박정빈', '0'),
       ('이정주', '0'),
       ('김현재', '0'),
       ('이대승', '0'),
       ('박단비', '0'),
       ('곽수아', '0'),
       ('admin', '1');


-- update 된 엔폴리시 엔커리어 더미데이터

INSERT INTO honin.ncareer (ncnum, content, readcount, title, writedate, writer)
VALUES (1, '최신 IT 기업의 채용 동향과 전망에 대해 알아보세요. 다양한 IT 직무와 요구되는 기술들에 대해 설명합니다.', 120, '2024년 IT 산업 채용 동향', '2024-08-01',
        'ADMIN'),
       (2, '2024년 상반기 금융권 취업 전략과 필수 자격증 정보를 제공합니다. 면접 준비 방법도 포함되어 있습니다.', 85, '금융권 취업 전략 및 자격증', '2024-07-25', 'ADMIN'),
       (3, '해외 취업을 위한 필수 준비 사항과 유용한 팁을 제공합니다. 글로벌 취업 시장의 트렌드도 함께 확인해 보세요.', 95, '해외 취업 준비 가이드', '2024-08-05', 'ADMIN'),
       (4, '최신 스타트업의 채용 공고와 창업 생태계의 변화를 알아보세요. 스타트업에서 요구되는 역량에 대해서도 설명합니다.', 70, '스타트업 채용 및 창업 트렌드', '2024-07-30',
        'ADMIN'),
       (5, '정부 지원 일자리와 공공기관의 채용 정보에 대한 상세한 내용을 제공합니다. 공공기관의 채용 절차도 안내합니다.', 60, '공공기관 채용 및 일자리 정보', '2024-07-28',
        'ADMIN'),
       (6, '최신 IT 기업의 채용 동향과 전망에 대해 알아보세요. 다양한 IT 직무와 요구되는 기술들에 대해 설명합니다.', 120, '2024년 IT 산업 채용 동향', '2024-08-01',
        'ADMIN'),
       (7, '2024년 상반기 금융권 취업 전략과 필수 자격증 정보를 제공합니다. 면접 준비 방법도 포함되어 있습니다.', 85, '금융권 취업 전략 및 자격증', '2024-07-25', 'ADMIN'),
       (8, '해외 취업을 위한 필수 준비 사항과 유용한 팁을 제공합니다. 글로벌 취업 시장의 트렌드도 함께 확인해 보세요.', 95, '해외 취업 준비 가이드', '2024-08-05', 'ADMIN'),
       (9, '최신 스타트업의 채용 공고와 창업 생태계의 변화를 알아보세요. 스타트업에서 요구되는 역량에 대해서도 설명합니다.', 70, '스타트업 채용 및 창업 트렌드', '2024-07-30',
        'ADMIN'),
       (10, '정부 지원 일자리와 공공기관의 채용 정보에 대한 상세한 내용을 제공합니다. 공공기관의 채용 절차도 안내합니다.', 60, '공공기관 채용 및 일자리 정보', '2024-07-28',
        'ADMIN');

update honin.ncareer
set content = '정부 지원 일자리와 공공기관의 채용 정보에 대한 상세한 내용을 제공합니다1. 공공기관의 채용 절차도 안내합니다. 정부 지원 일자리와 공공기관의 채용 정보에 대한 상세한 내용을 제공합니다2. 공공기관의 채용 절차도 안내합니다. 정부 지원 일자리와 공공기관의 채용 정보에 대한 상세한 내용을 제공합니다3. 공공기관의 채용 절차도 안내합니다.'
where ncnum = '10';

INSERT INTO honin.npolicy (npnum, content, readcount, title, writedate, writer)
VALUES (1, '공공기관 채용 및 일자리 정보 제공.', 60, '공공기관 채용 정보', '2024-08-01', 'ADMIN'),
       (2, '스타트업 채용 공고와 창업 생태계 변화 설명.', 70, '스타트업 채용 및 트렌드', '2024-08-02', 'ADMIN'),
       (3, '해외 취업을 위한 필수 준비 사항 및 유용한 팁 제공.', 95, '해외 취업 준비 가이드', '2024-08-03', 'ADMIN'),
       (4, '2024년 상반기 금융권 취업 전략 및 필수 자격증 정보.', 120, '금융권 취업 전략', '2024-08-04', 'ADMIN'),
       (5, '청년들을 위한 최신 공기업 채용 정보 제공.', 85, '공기업 채용 정보', '2024-08-05', 'ADMIN'),
       (6, 'AI와 데이터 분석 직무의 취업 트렌드 분석.', 110, 'AI 및 데이터 분석 취업', '2024-08-06', 'ADMIN'),
       (7, '공공 기관 채용 지원 절차와 필요 서류 안내.', 45, '공공 기관 채용 절차', '2024-08-07', 'ADMIN'),
       (8, '청년 스타트업 지원 정책 및 혜택 안내.', 150, '청년 스타트업 지원', '2024-08-08', 'ADMIN'),
       (9, '정부의 청년 주거 지원 정책 설명.', 130, '청년 주거 지원 정책', '2024-08-09', 'ADMIN'),
       (10, '해외 취업 성공 사례 및 노하우 공유.', 200, '해외 취업 성공 사례', '2024-08-10', 'ADMIN');
insert into npimages(savefilename, npnum)
values ('policy1.jpg', 1),
       ('policy2.jpg', 2),
       ('policy3.jpg', 3),
       ('policy4.jpg', 4),
       ('policy5.jpg', 5),
       ('policy6.jpg', 6),
       ('policy7.jpg', 7),
       ('policy8.jpg', 8),
       ('policy9.jpg', 9),
       ('policy10.jpg', 10);

insert into ncimages(savefilename, ncnum)
values ('career1.jpg', 1),
       ('career2.jpg', 2),
       ('career3.jpg', 3),
       ('career4.jpg', 4),
       ('career5.jpg', 5),
       ('career1.jpg', 6),
       ('career2.jpg', 7),
       ('career3.jpg', 8),
       ('career4.jpg', 9),
       ('career5.jpg', 10);

-- 취업정보 데이터
INSERT INTO honin.ncareer(content, readcount, title, writer)
VALUES ('남양주도시공사 공고 제2024-475호

 - 2024년도 제11회 청년 체험형 인턴（청소년 활동 프로그램 및 시설 운영, 운영보조）-
 공개경쟁채용 공고
 2024년도 남양주도사공사 제11회 청년 체험형 인턴（청소년 활동 프로그램 및 시설 운영, 운영보조） 공개경쟁채용 공고 일정을 다음과 같이 공고합니다.

 2024년 8월 21일
 남양주도시공사 사장

 자세한 사항은 남양주도시공사 홈페이지 채용 게시판을 참고해주시기 바랍니다.', 0, '2024년 제11회 청년 체험형 인턴 공개경쟁채용 공고', 'ADMIN'),
    ('남양주시 2024년 장애인일자리사업 현황입니다.', 0, '2024년 장애인일자리사업 현황', 'ADMIN');
INSERT INTO honin.ncimages(savefilename, ncnum)
VALUES('채험형인턴.png', 11),
      ('제11회 공고（청년）.pdf', 11),
      ('장애인일자리.png', 12),
      ('2024년도 장애인복지일자리사업 현황.hwp', 12);

INSERT INTO honin.npolicy(content, readcount, title, writer)
VALUES ('24년 7월 청년고용동향입니다', 0, '[통계] 7월 청년고용동향', 'ADMIN');
INSERT INTO honin.npimages(savefilename, npnum)
VALUES('고용동향.PNG', 11),
      ('24.7월 고용동향(기재부).PDF', 11),
      ('24.7월 고용동향(통계청).PDF', 11);

-- AWS 배포로 인해 이미지 경로 수정
INSERT INTO honin.myfood (mfnum, category, exdate, fname, image, indate, memo, owner, safestate, savefilename) VALUES
(1, 1, '2024-08-30', '우유', '', '2024-09-08 00:00:00', '냉장고 아래', '오빛나리', 'n', 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/myrefrigerator/food11.jpg'),
(2, 3, '2024-09-10', '바나나킥', '', '2024-08-06 00:00:00', '책상 위', '오빛나리', 'y', 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/myrefrigerator/food2.jpg'),
(3, 3, '2024-08-26', '초코칩', '', '2024-08-11 00:00:00', '서랍 속에 있음', '오빛나리', 'n', 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/myrefrigerator/food3.jpg'),
(4, 3, '2024-09-09', '김', '', '2024-09-17 00:00:00', '주방쪽에 있음', '오빛나리', 'y', 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/myrefrigerator/food14.jpg'),
(5, 3, '2024-09-09', '스팸', '', '2024-08-17 00:00:00', '주방 위에', '오빛나리', 'y', 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/myrefrigerator/food15.jpg'),
(6, 2, '2024-09-11', '아이스크림', '', '2024-08-18 00:00:00', '냉동실 맨위', '오빛나리', 'y', 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/myrefrigerator/food6.jpg'),
(7, 1, '2024-09-01', '치즈', '', '2024-08-20 00:00:00', '냉장고 문짝', '오빛나리', 'y', 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/myrefrigerator/food7.jpg'),
(8, 1, '2024-09-15', '요거트', '', '2024-08-25 00:00:00', '냉장고 중간쪽', '오빛나리', 'n', 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/myrefrigerator/food8.png'),
(9, 3, '2024-09-05', '감자칩', '', '2024-08-28 00:00:00', '내 방', '오빛나리', 'y', 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/myrefrigerator/food9.jpg');

UPDATE honin.ncimages
SET savefilename = CASE ncinum
                       WHEN 1 THEN 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/npolicyncareer/career1.jpg'
                       WHEN 2 THEN 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/npolicyncareer/career2.jpg'
                       WHEN 3 THEN 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/npolicyncareer/career3.jpg'
                       WHEN 4 THEN 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/npolicyncareer/career4.jpg'
                       WHEN 5 THEN 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/npolicyncareer/career5.jpg'
                       WHEN 6 THEN 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/npolicyncareer/career1.jpg'
                       WHEN 7 THEN 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/npolicyncareer/career2.jpg'
                       WHEN 8 THEN 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/npolicyncareer/career3.jpg'
                       WHEN 9 THEN 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/npolicyncareer/career4.jpg'
                       WHEN 10 THEN 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/npolicyncareer/career5.jpg'
                       WHEN 11 THEN 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/npolicyncareer/채험형인턴.png'
                       WHEN 12 THEN 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/npolicyncareer/제11회 공고（청년）.pdf'
                       WHEN 13 THEN 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/npolicyncareer/장애인일자리.png'
                       WHEN 14 THEN 'https://honin-bucket.s3.ap-northeast-2.amazonaws.com/npolicyncareer/2024년도 장애인복지일자리사업 현황.hwp'
                       ELSE savefilename
    END
WHERE ncinum IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14);

UPDATE honin.npimages
SET savefilename = CONCAT('https://honin-bucket.s3.ap-northeast-2.amazonaws.com/npolicyncareer/', savefilename)
WHERE savefilename IN (
                       'policy1.jpg',
                       'policy2.jpg',
                       'policy3.jpg',
                       'policy4.jpg',
                       'policy5.jpg',
                       'policy6.jpg',
                       'policy7.jpg',
                       'policy8.jpg',
                       'policy9.jpg',
                       'policy10.jpg',
                       '고용동향.PNG',
                       '24.7월 고용동향(기재부).PDF',
                       '24.7월 고용동향(통계청).PDF'
    );

-- 메인페이지 더미데이터 신규/HOT 맞추기 작업
INSERT INTO `honin`.`cfreelike` (`cflnum`, `cfnum`, `likenick`) VALUES ('9', '15', '곽수아');
INSERT INTO `honin`.`cfreelike` (`cflnum`, `cfnum`, `likenick`) VALUES ('10', '15', '김민주');
INSERT INTO `honin`.`cfreelike` (`cflnum`, `cfnum`, `likenick`) VALUES ('11', '15', '김태희');
INSERT INTO `honin`.`cfreelike` (`cflnum`, `cfnum`, `likenick`) VALUES ('12', '15', '김현재');
INSERT INTO `honin`.`cfreelike` (`cflnum`, `cfnum`, `likenick`) VALUES ('13', '12', '곽수아');
INSERT INTO `honin`.`cfreelike` (`cflnum`, `cfnum`, `likenick`) VALUES ('14', '12', '김민주');
INSERT INTO `honin`.`cfreelike` (`cflnum`, `cfnum`, `likenick`) VALUES ('15', '12', '김태희');
INSERT INTO `honin`.`cfreelike` (`cflnum`, `cfnum`, `likenick`) VALUES ('16', '6', '곽수아');
INSERT INTO `honin`.`cfreelike` (`cflnum`, `cfnum`, `likenick`) VALUES ('17', '6', '김민주');
INSERT INTO `honin`.`cfreelike` (`cflnum`, `cfnum`, `likenick`) VALUES ('18', '6', '김태희');
INSERT INTO `honin`.`cfreelike` (`cflnum`, `cfnum`, `likenick`) VALUES ('19', '6', '김현재');
INSERT INTO `honin`.`cfreelike` (`cflnum`, `cfnum`, `likenick`) VALUES ('20', '6', '박단비');
INSERT INTO `honin`.`cfreelike` (`cflnum`, `cfnum`, `likenick`) VALUES ('21', '6', '박정빈');
UPDATE `honin`.`cfree` SET `readcount` = '312' WHERE (`cfnum` = '10');
UPDATE `honin`.`cfree` SET `readcount` = '621' WHERE (`cfnum` = '6');
UPDATE `honin`.`cfreelike` SET `cfnum` = '10' WHERE (`cflnum` = '1');
UPDATE `honin`.`cfreelike` SET `cfnum` = '10' WHERE (`cflnum` = '2');
UPDATE `honin`.`cfreelike` SET `cfnum` = '10' WHERE (`cflnum` = '3');
UPDATE `honin`.`cfreelike` SET `cfnum` = '10' WHERE (`cflnum` = '4');
UPDATE `honin`.`cfreelike` SET `cfnum` = '10' WHERE (`cflnum` = '5');
UPDATE `honin`.`ctip` SET `readcount` = '325' WHERE (`ctnum` = '18');
UPDATE `honin`.`ctip` SET `readcount` = '355' WHERE (`ctnum` = '2');
UPDATE `honin`.`ctip` SET `readcount` = '355' WHERE (`ctnum` = '20');
INSERT INTO `honin`.`ctiplike` (`ctlnum`, `ctnum`, `likenick`) VALUES ('6', '18', '이정주');
INSERT INTO `honin`.`ctiplike` (`ctlnum`, `ctnum`, `likenick`) VALUES ('7', '18', '박정빈');
INSERT INTO `honin`.`ctiplike` (`ctlnum`, `ctnum`, `likenick`) VALUES ('8', '20', '이정주');
INSERT INTO `honin`.`ctiplike` (`ctlnum`, `ctnum`, `likenick`) VALUES ('9', '20', '박정빈');
INSERT INTO `honin`.`ctiplike` (`ctlnum`, `ctnum`, `likenick`) VALUES ('10', '20', '오빛나리');
INSERT INTO `honin`.`ctiplike` (`ctlnum`, `ctnum`, `likenick`) VALUES ('11', '18', '오수완');
UPDATE `honin`.`crecommended` SET `readcount` = '325' WHERE (`crnum` = '12');
UPDATE `honin`.`crecommended` SET `readcount` = '345' WHERE (`crnum` = '19');
INSERT INTO `honin`.`crecommendedlike` (`crlnum`, `crnum`, `likenick`) VALUES ('6', '12', '조준서');
INSERT INTO `honin`.`crecommendedlike` (`crlnum`, `crnum`, `likenick`) VALUES ('7', '12', '오수완');
INSERT INTO `honin`.`crecommendedlike` (`crlnum`, `crnum`, `likenick`) VALUES ('8', '12', '박정빈');
INSERT INTO `honin`.`crecommendedlike` (`crlnum`, `crnum`, `likenick`) VALUES ('9', '19', '김민주');
INSERT INTO `honin`.`crecommendedlike` (`crlnum`, `crnum`, `likenick`) VALUES ('10', '19', '곽수아');
INSERT INTO `honin`.`crecommendedlike` (`crlnum`, `crnum`, `likenick`) VALUES ('11', '19', '오수완');
UPDATE `honin`.`canonymous` SET `readcount` = '390' WHERE (`canum` = '11');
UPDATE `honin`.`canonymous` SET `readcount` = '340' WHERE (`canum` = '15');
UPDATE `honin`.`canonymouslike` SET `canum` = '11' WHERE (`calnum` = '1');
UPDATE `honin`.`canonymouslike` SET `canum` = '11' WHERE (`calnum` = '2');
UPDATE `honin`.`canonymouslike` SET `canum` = '11' WHERE (`calnum` = '3');
INSERT INTO `honin`.`canonymouslike` (`calnum`, `canum`, `likenick`) VALUES ('6', '15', '오수완');
INSERT INTO `honin`.`canonymouslike` (`calnum`, `canum`, `likenick`) VALUES ('7', '15', '조준서');
INSERT INTO `honin`.`canonymouslike` (`calnum`, `canum`, `likenick`) VALUES ('8', '15', '박정빈');

-- 찜 목록 더미 데이터
INSERT INTO honin.slike (slnum, likenick, snum) VALUES
(1, '오빛나리', 18),
(2, '오빛나리', 19),
(3, '오빛나리', 9);

