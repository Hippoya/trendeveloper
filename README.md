# Trendeveloper
세종대학생을 위한 직군 및 로드맵 추천 웹 서비스

개발팀: 캡스톤 1조 파워레인저팀  
개발기간: 2023/3/10 ~ 2023/6/14

> 이 프로젝트는 세종대학교 'Capstone디자인(산학협력프로젝트)'에서 개발되었습니다.

## 기획 의도
IT 계열 구직을 희망하는 학생들을 위해 성적 엑셀 파일을 활용해 채용 동향을 분석하고 맞춤형 취업 추천을 제공하는 서비스를 기획했습니다.

이 서비스는 IT 경력을 목표로 하는 학생들을 대상으로 개인화된 지도를 제공함으로써 표준 구직 플랫폼과 대조됩니다. 이를 통해 학업 및 프로젝트 경험을 활용하여 자신의 강점을 파악하고 향후 취업 지원을 위한 전략적 계획을 세울 수 있습니다.

## 주요 기능
1. 기업별 뉴스 헤드라인 감정분석
2. 과거 동향 기반 직군별 채용 동향 예측
3. 성적 기반 직군 추천
4. 채용정보 검색
5. 채용정보 상세 요건 조

## 기술 스택
### 프론트 엔드

javascript

### 백엔드
- Framework: [JAVA/SPRING](https://flask-docs-kr.readthedocs.io/ko/latest/index.html)
- Framework: [Flask](https://flask-docs-kr.readthedocs.io/ko/latest/index.html)

### AI
- Framework: [PYTORCH/KERAS](https://flask-docs-kr.readthedocs.io/ko/latest/index.html)
- Framework: [Flask](https://flask-docs-kr.readthedocs.io/ko/latest/index.html)


## 기술적 챌린지
### 1. marked.js의 코드 블록 미지원
- 코드 블록은 CSS를 이용해 별도 스타일 시트를 만들어 해결하였습니다.

### 2. TailwindCSS로 인한 기본 CSS 초기화
- marked.js 변환 후에 기본 스타일이 초기화되어 렌더링이 제대로 되지 않는 문제가 있었습니다.
- 마크다운 렌더링이 필요한 페이지에 h, ol, ul 등 기본 태그에 대한 스타일을 별도로 설정하였습니다.

### 3. 로그아웃 시 JWT 쿠키 미삭제 문제
- JWT를 쿠키에 저장했는데 로그아웃 시 쿠키가 삭제되지 않는 문제가 있었습니다.
- 이 문제의 원인은 서버에서 http 응답 시 httponly옵션이 True로 전송되어, 클라이언트단에서 자바스크립트로 쿠키 제어가 불가능해서 생긴 문제였습니다. httponly옵션을 False로 변경 후 정상적으로 쿠키 삭제가 되었습니다.
- 다만, 이 경우 자바스크립트로 쿠키 조작이 가능해 보안이 취약해 질 수 있습니다. 따라서 로그인 프로세스에 보안성을 강화에 대한 고민이 필요합니다.

## 개발 일정
2023/10/10 : 기획, 발표 자료 준비  
2023/10/11 : 로그인 관련 API, 페이지 CSS 구현  
2023/10/12 : 마크다운 렌더링 구현, 반응형 최적화, 배포  
2023/10/13 : 최종 발표

## 역할 분배
**1조 파워레인저팀**

[김**] 기획, UI, 페이지 API, 발표  
[서**] 백엔드, 각종 API, EC2 및 DB 세팅  
[조윤희](https://github.com/y0c0y) 프론트엔드, 마크다운 렌더링(JS, CSS)
[천**] 백엔드, 각종 API, EC2 및 DB 세팅  
