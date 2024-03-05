# Trendeveloper
세종대학생을 위한 직군 및 로드맵 추천 웹 서비스

개발팀: 캡스톤 1조 파워레인저팀  
개발기간: 2023/3/10 ~ 2023/6/14
(리팩토링 : 2023/12/28 ~ )

> 이 프로젝트는 세종대학교 'Capstone디자인(산학협력프로젝트)'에서 개발되었습니다.

## 기획 의도
IT 계열 구직을 희망하는 학생들을 위해 채용 동향을 분석하고 성적 엑셀 파일을 활용해 맞춤형 취업 추천을 제공하는 서비스를 기획했습니다.

이 서비스는 IT 경력을 목표로 하는 학생들을 대상으로 개인화된 지도를 제공함으로써 표준 구직 플랫폼과 대조됩니다. 이를 통해 학업 및 프로젝트 경험을 활용하여 자신의 강점을 파악하고 향후 취업 지원을 위한 전략적 계획을 세울 수 있습니다.

## 주요 기능
1. 기업별 뉴스 헤드라인 감정분석
2. 과거 동향 기반 직군별 채용 동향 예측
3. 성적 기반 직군 추천
4. 채용정보 검색
5. 채용정보 상세 요건 조회

## 기술 스택
### 프론트 엔드
 - [/javascript]
 - [/React.JS]

### 백엔드
- Framework: [JAVA/SPRING](https://spring.io/guides)
- Framework: [Flask](https://flask-docs-kr.readthedocs.io/ko/latest/index.html)

### AI
- Framework: [KERAS](https://keras.io/api)
- Framework: [Flask](https://flask-docs-kr.readthedocs.io/ko/latest/index.html)


## 기술적 챌린지

### 1. 메모리 용량 문제 해결

우리는 배포 서버의 메모리 용량 한계로 인해 AI 모델이 Docker 컨테이너에서 비정상 종료되는 문제를 겪었습니다. 이를 해결하기 위해서 Python 모듈을 관리하는 Docker 컨테이너의 swap 용량을 수동으로 지정하는 방법을 사용하였습니다.

### 2. 검색어 설정 최적화

워크넷에서 제공하는 기업명을 네이버 뉴스 검색에 그대로 활용하면, '주식회사', '(주)' 등의 단어가 포함된 경우 검색 결과가 제한적으로 나타나는 문제를 발견했습니다. 이를 해결하기 위해 뉴스 크롤링 시에 기업명에서 '주식회사', '(주)', '유한회사' 등의 표현을 삭제하고 검색을 진행하였습니다.

### 3.서버 보안 강화

백엔드 Restful API 서버와 프론트엔드 웹서버의 포트를 모두 개방하고, 프론트엔드 페이지 구성 시 백엔드 서버의 주소를 직접 접근하는 방식을 사용했었으나, 이는 백엔드 서버를 외부에 직접 노출하는 문제를 야기했습니다. 이를 해결하기 위해 프론트엔드 웹서버인 nginx의 프록시를 사용하여 백엔드 API 서버로 접근하게 하고, 백엔드 서버로의 외부 포트는 개방하지 않는 방향으로 수정하였습니다.

### 4. 시계열 데이터 처리 최적화

DBMS로 MariaDB를 사용하였는데, 이는 관계형 데이터베이스를 활용하므로 시계열 데이터인 채용 동향의 저장 및 처리에 적합하지 않았습니다. 그러나 대용량 데이터가 아니었기에, 시계열 데이터만을 위한 별도의 DBMS를 도입하지 않고, MariaDB의 JSON column에 시계열 데이터를 저장하는 방안을 채택하였습니다.

### 5. 사용자 경험 개선

감성분석 기능에서, 뉴스 크롤링 결과 중 기업명이 헤드라인에 없고 본문에만 존재하는 뉴스들이 발견되었습니다. 이는 사용자에게 표시되는 자료인 헤드라인에 기업명이 존재하지 않아 직관성이 결여되고, 사용자에게 혼란을 줄 수 있었습니다. 이를 해결하기 위해, 크롤링 시에 기업명이 포함된 헤드라인만 수집하도록 수정하였습니다.



## 개발 일정

2023/3/10 ~ 2023/6/14 


## 역할 분배
**1조 파워레인저팀**

[[조윤희](https://github.com/y0c0y)] Frontend, UI 디자인

[김**] Frontend, PM, UI 디자인  
[서**] Backend, devOps, 크롤러 제작  
[천**] 감성 분석 및 트렌드 미래 동향 예측 인공지능 제작  
