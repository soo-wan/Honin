# 🏠 자취생들을 위한 종합 커뮤니티 사이트

## 소개 (Abstract)
Honin은 자취생들의 생활을 보다 편리하고 풍요롭게 만들기 위해 설계된 종합 커뮤니티 플랫폼입니다. 유저 간의 소통을 촉진하고, 자취 생활에 필요한 다양한 정보를 한 곳에서 제공합니다.

## 컨셉 (Concept)
Honin은 자취생의 다양한 요구(중고거래, 취업정보 등)에 대응하는 기존 커뮤니티와 달리, 한 플랫폼에서 모든 요구를 충족할 수 있는 종합 커뮤니티로 개발되었습니다. 사용자가 능동적이고 효율적으로 정보를 활용할 수 있도록 기술적 고민을 거쳐 탄생한 플랫폼입니다.

# 📌 주요 기능
1. 커뮤니티
다양한 게시판: 자유 게시판, 정보 공유, 업체 추천, 고민 상담 등 다양한 주제로 소통 가능<br />
활발한 소통: 자취생들끼리 질문과 답변을 주고받으며 경험 공유<br />
2. 소식지<br />
취업 정보 제공: 최신 취업 정보와 공고 공유<br />
청년 정책 소개: 정부의 청년 지원 정책 및 프로그램 안내<br />
3. 맛집 지도<br />
지도 API 연동: 동네 맛집 정보를 지도에서 쉽게 확인 가능<br />
유저 참여형 등록: 사용자들이 직접 맛집을 등록하고 후기를 작성<br />
4. 중고 거래<br />
1:1 실시간 채팅: 사용자 간 채팅을 통해 중고 물품 거래<br />
신뢰 기반 거래: 실시간 소통으로 신뢰할 수 있는 거래 환경 제공<br />
5. 나의 냉장고<br />
유통기한 관리: 보관 중인 식품의 유통기한을 관리하여 식품 낭비 방지<br />
알림 기능: 유통기한이 임박한 식품에 대해 알림 제공<br />
6. 관리자 페이지<br />
회원 관리: 사용자 정보 조회 및 관리<br />
소식지 관리: 소식지 업데이트 및 게시물 관리<br />

# 핵심 포인트 (Point)
실시간 기능: 사용자 간 실시간 1:1 채팅 및 실시간 위치 기반 맛집 등록/공유<br />
사용자 경험 증진: 자취생이라는 공통된 정체성을 중심으로 구성된 기능들<br />
종합적인 정보 접근: 하나의 플랫폼에서 자취 생활의 모든 필요를 충족

# Benchmarking
당근마켓 (https://www.daangn.com/) : 사용자간 중고거래 커뮤니티<br />
블라인드 (https://www.teamblind.com/kr/) : 직장인 커뮤니티<br />
커리어리 (https://careerly.co.kr/) : 직장인 커뮤니티

# 사용 기술
![image](https://github.com/user-attachments/assets/85f2dfc2-f63d-4b5d-87af-a1faab1c946d)

# DATABASE
## DB 전체 구조
![image](https://github.com/user-attachments/assets/9c8e5e49-4978-49a2-bef7-fdfa187c43ff)

## 중요 DB 세부
![image](https://github.com/user-attachments/assets/33d438aa-ab6b-433b-9af8-400dd9d192d4)
![image](https://github.com/user-attachments/assets/5f1b8276-e646-48fb-9df1-8f993d81a821)
![image](https://github.com/user-attachments/assets/7a105eb9-6a00-450d-9f9e-ca6f66a106e2)

## VIEW
![image](https://github.com/user-attachments/assets/44c1f6c2-ed19-416d-984c-0aa4d0dafffe)

## USECASEDIAGRAM
![image](https://github.com/user-attachments/assets/e648c2aa-c8ec-4c33-b5c7-c84b2f342de3)

👨‍💻 본인이 구현한 부분
1. 전체적인 CSS 및 화면 구성<br />
프로젝트 전반에 걸친 디자인: 모든 페이지에 대한 레이아웃 및 스타일링 구현<br />
반응형 웹 디자인: 다양한 기기에서 일관된 사용자 경험 제공<br />
2. 메인 화면 (헤더, 푸터 포함)<br />
CSS 구현: 메인 화면의 레이아웃, 스타일링, 애니메이션 처리<br />
백엔드 구현: 사용자 데이터를 기반으로 동적인 콘텐츠 출력<br />
3. 소식지 기능<br />
CSS 구현: 소식지 페이지 레이아웃 및 스타일링<br />
백엔드 구현:
취업 정보 및 청년 정책 데이터를 불러와 사용자에게 제공<br />
관리자 페이지와 연동하여 소식지 업데이트 기능 구현<br />
4. 나의 냉장고<br />
CSS 구현: 냉장고 페이지 스타일링 및 UX 최적화<br />
백엔드 구현:<br />
식품 유통기한 관리 및 알림 기능 개발<br />
데이터 저장 및 수정 처리<br />
5. 마이페이지
1.사용자 프로필 및 활동 내역 관리<br />
2.회원 탈퇴<br />
3.사용자 설정 저장 및 수정 기능 제공<br />
4.직관적인 레이아웃 디자인<br />

# 프로그램 화면 캡쳐
![image](https://github.com/user-attachments/assets/3a74f24d-125d-470a-8009-25e703f0bea3)

![로그인](https://github.com/user-attachments/assets/55b8e03a-9a69-4a07-bdb1-2acc7d9d97d6)
<br />
![회원가입](https://github.com/user-attachments/assets/1281e8e1-1a7f-4261-8a02-be35b276fc75)
<br />
![image](https://github.com/user-attachments/assets/5b2825d6-76f7-413e-8113-be5379596b5c)
<br />
![image](https://github.com/user-attachments/assets/0634ef47-c25b-44d9-bc24-9f0698308fdd)

![image](https://github.com/user-attachments/assets/0df69d2c-9254-4ca1-9fc2-fa1a4fad5709)

![image](https://github.com/user-attachments/assets/ca779f8e-4246-4b18-bd61-bb7a114f93ed)
<br />
![image](https://github.com/user-attachments/assets/832929f8-5859-46a6-950b-a228602dff87)
<br />
![image](https://github.com/user-attachments/assets/e2b251ad-ab23-440b-b7bf-ef91b08b9251)
<br />
![image](https://github.com/user-attachments/assets/6ca90c95-b939-4a75-8b50-e2af47f35a70)

![image](https://github.com/user-attachments/assets/ac4626a3-66af-4fc4-b446-9849b41753ab)

![image](https://github.com/user-attachments/assets/423e7a8b-a0f9-4bc6-8958-43bb772e4b91)

![image](https://github.com/user-attachments/assets/08e9baf2-68e7-45b6-86ae-3c35bdfaf62f)
<br />
![image](https://github.com/user-attachments/assets/f4de88e3-df15-4871-9252-3064ea19a90d)
<br />
![관리자1](https://github.com/user-attachments/assets/ff0125d2-c9a8-46a9-94ef-9cbc62a1691d)

![관리자2](https://github.com/user-attachments/assets/a686c75a-a68f-4c8a-9a3f-0960965809bd)

![관리자3](https://github.com/user-attachments/assets/119251ed-80f3-4091-96b3-fc323c77edef)

















