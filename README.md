# 야옹잡화점
<img src="https://img.shields.io/badge/JypeScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"> <img src="https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"> <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white"> <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/Bulma-00D1B2?style=for-the-badge&logo=bulma&logoColor=white">  
고양이 용품 쇼핑몰 입니다.
![ezgif com-video-to-gif-converter](https://github.com/wanted-pre-7/wanted-pre-onboarding-frontend/assets/80516736/099c892d-f11a-4019-a17d-6d8e75b6bd07)

# 프로젝트 기간
2023.07.01 ~ 2023.07.14

# 프로젝트 소개
- 목적  
따뜻한 느낌을 주는 직관적인 고양이 용품 쇼핑몰입니다.
- 페르소나
단순하게 상품을 선택할 수 있는 일상이 바쁜 20~30대 젊은 집사들

# [ERD](https://www.erdcloud.com/d/SACmA2YTbYD7JfXqR)
![image](https://github.com/haeunchoi-dev/meow-store/assets/132250432/8b718c7e-2a84-477e-acbc-26ad74b4eb44)


# 프로젝트 기능
<details>
  <summary>사용자 관련 기능</summary>
<div>
    <ul>
      <li>회원가입/로그인</li>
      <li>사용자 정부 조회/수정/삭제</li>
    </ul>
  </div>
</details>

<details>
  <summary>관리자 기능</summary>
<div>
    <ul>
      <li>관리자 계정</li>
      <li>카테고리 추가/삭제</li>
      <li>상품 추가/삭제/li>
      <li>주문 조회 및 상태변경</li>
      <li>주문 삭제 (soft delet)</li>
    </ul>
  </div>
</details>

<details>
  <summary>주문 관련</summary>
<div>
    <ul>
      <li>장바구니 추가/수정/삭제</li>
      <li>주문 수정/조회</li>
    </ul>
  </div>
</details>

# 팀원 역할 분담
| 이름 | 파트   | 담당 업무                                                            |
| ---- | ------ | -------------------------------------------------------------------- |
| 최하은(me) | 팀장/FE/BE | 1. 프로젝트 관리 <br/> 2. DB테이블 설계 <br/> 3. 사용자/관리자/주문 API <br/> 4. 주문 추가 및 수정 페이지 <br/> 5. 관리자 상품 등록 및 수정페이지 <br/> 6. 공통 헤더 푸터 적용<br/> 7. 메인화면 네비게이션<br/> 8. 카테고리 모달 모듈 생성<br/> 9. 배포 환경 구성 |
| 김기범 | FE/BE     | 1. 카테고리 API <br/> 2. 카테고리 페이지 <br/> 3. 회원가입 페이지                     |
| 박준성 | FE     | 1. 관리자 페이지          |
| 정다희 | FE     | 1. 메인 페이지  <br/> 2. 구매내역 페이지 <br/> 3. 로그인 페이지            |
| 안보란 | FE     | 1. 상품상세 페이지 <br/> 2. 장바구니        |

# 협업
- Figma: 기획 및 디자인
- discode : 참고 링크, 업무 진행 사항, 회의록
- gather town : 회의
- 변수명 => camelCase
- 함수명 => camelCase
- 파일명 => kebabCase
- 커밋 컨벤션
  - feat : 새로운 기능 추가
  - fix : 오류 수정
  - style : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우, css 작업
  - refactor : 코드 로직 수정 (리팩토링)
  - docs : 문서 수정
  - test : 테스트 코드 추가
  - chore : 빌드 업무 수정, 패키지 매니저 수정 (module 추가 시)

# 브랜치 전략
main - develop - feature/A
