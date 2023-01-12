### 원티드 프로온보딩 챌린지 사전과제 [프론트엔드]
---
#### 참여동기
 - 처음에는 챌린지 참여목적으로 사전과제를 했다기 보다는 평소 파이어베이스로만 데이터를 주고 받고 하다보니 이 과제를 하면 그 외의 방식도 공부할 수 있을거 같아 하게 되었습니다. 과제를 할수록 다른 지식을 배운다는게 너무 재미있게 느껴졌고 이 챌린지에 참여하게 되면 더 많은 것들을 배우고 습득하면서 더 재미를 채울수 있을거 같아서 신청하게 되었습니다.

 #### 하고나서 느낀점 
- 평소에 혼자서 하는 프로젝트는 나도 모르게 내가 아는 것만 만드려고 했구나! 하고 반성하게되었습니다.
- 심화적인 부분까지 이해가 되지 않아도 백엔드가 어떠한 건지 조금이나마 느낄 수 있었습니다.
- 전에는 server쪽 파일들을 보면 검색해도 전혀 이해가 되지 않았는데 이제는 왜 이 파일이 있고 이 파일이 무슨일을 하고 이 코드는 왜 적었는지 모르는 부분을 검색하면서 배울 수 있는 정도까지는 올라왔다고 생각합니다.
- token이나 서버의 localhost 주소처럼 많이 사용하는 부분들은 **redux나 useContext**를 이용해보고 싶습니다.
- graphql을 적용해서 데이터를 가져올시 over fetching 같은 문제도 해결해보고 싶어졌습니다.

#### 설치한 라이브러리
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
<img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=react router&logoColor=white">
<img src="https://img.shields.io/badge/Reactstrap-61DAFB?style=for-the-badge&logo=reactstrap&logoColor=white">
<img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white">

#### 수정사항

##### 1. function 명과 server-url 
- 수정 전
<img src='/client/public/images/change1.png' width='400'> 
- 수정 후
<img src='/client/public/images/change1-1.png' width='400'>

    - **해당 function을 포함하고 있는 components의 이름이 Login**이라 기존login이라고 적혀있던 function 명을 signIn으로 교체
    - 기존 로컬 서버 주소의 쉬운 관리와 배포시 보안을 위해 .env을 사용하여 설정
---

##### 2. 회원가입 페이지 리팩토링
- 수정 전
 <img src='/client/public/images/change2-1.png' width='400'> 
- 수정 후
 <img src='/client/public/images/change2.png' width='400'>

    - 정규식을 밖으로 빼고 id,password,passwordconfirm의 코드를 리팩토링해서 한 곳에 응집
    - 기존 60줄 코드가 27줄로 변경
--- 

##### 3. TodoList 리팩토링 
- 수정 전
 <img src='/client/public/images/change3.png' width='400'>
- 수정 후
 <img src='/client/public/images/change3-1.png' width='400'>

    - 비슷한 기능을 하는 function을 하나로 합치기
---

#### 4. todolist 삭제시 재확인 추가
- 수정 전
<img src='/client/public/images/change4.png' width='400'>
<img src='/client/public/images/change4-3.gif' width='400'>
- 수정 후
<img src='/client/public/images/change4-1.png' width='400'>
<img src='/client/public/images/change4-4.gif' width='400'>
    - deleteTodoConfirmBox 라는 변수를 toggle로 설정하여 껐다 켰다 할 수 있다.
