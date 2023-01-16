### 원티드 프론트엔드 프로온보딩 챌린지 TODO
---


### :white_square_button:  참여동기
 - 처음에는 챌린지 참여목적으로 사전과제를 했다기 보다는 평소 **파이어베이스로만 데이터를 주고 받고** 하다보니 이 과제를 하면 **그 외의 방식으로도 데이터를 주고 받는 공부**할 수 있을거 같아 하게 되었습니다. 과제를 할수록 다른 지식을 배운다는게 너무 재미있게 느껴졌고 이 챌린지에 참여하게 되면 더 많은 것들을 배우고 습득하면서 더 재미를 채울수 있을거 같아서 신청하게 되었습니다.

 #### 하고나서 느낀점 
- 평소에 혼자서 하는 프로젝트는 나도 모르게 내가 아는 것만 만드려고 했구나! 하고 반성하게되었습니다.
- 심화적인 부분까지 이해가 되지 않아도 백엔드가 어떠한 건지 조금이나마 느낄 수 있었습니다.
- 전에는 server쪽 파일들을 보면 검색해도 전혀 이해가 되지 않았는데 이제는 왜 이 파일이 있고 이 파일이 무슨일을 하고 이 코드는 왜 적었는지 모르는 부분을 검색하면서 배울 수 있는 정도까지는 올라왔다고 생각합니다.
- token이나 서버의 localhost 주소처럼 많이 사용하는 부분들은 **redux나 useContext**를 이용해보고 싶습니다.
- graphql을 적용해서 데이터를 가져올시 over fetching 같은 문제도 해결해보고 싶어졌습니다.
- typescript를 약간 사용해보니 다른 components 파일로 이동하여도 객체 안에 무엇이 들어가있는지 파악하는게 좋았다. 계속 type을 신경쓰면서 작성하다보니 처음 작성할때 예전보다 스스로도 타입에 대해 신경이 쓰이기 시작했습니다.
---

#### :hammer: 패키지
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"> <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=react router&logoColor=white"> <img src="https://img.shields.io/badge/Reactstrap-61DAFB?style=for-the-badge&logo=reactstrap&logoColor=white"> <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white">

---

### :white_square_button: 구현

#### :one: 회원가입시 아이디 비밀번호 유효성 검사
|구현화면|:pencil2:Register.jsx|
|-------|-----|
|<img src='/client/public/images/crud1.gif' width='300'>|<img src='/client/public/images/crud2.png' width='500' height='500'>|

- 아이디와 비밀번호의 정규식을 변수에 담아 id, password, passwordConfirm의 boolean 값을 가지고 회원가입시 유효성 검사를 구현하였습니다.


#### :two: 로그인시 전달받은 토큰을 localstorage에 저장하기
|:pencil2:Login.jsx|:pencil2:Nav.jsx|
|-----|----|
|<img src='/client/public/images/crud3.png' width='500' height='400'>|<img src='/client/public/images/crud4.png' width='500' height='300'>|

- axios를 이용해 로그인 성공시 서버에서 받은 토큰을 localstorage에 저장 하도록 저장하였습니다.
- localstorage에 토큰이 없을시 로그인 페이지로 이동하게 구현하였습니다.

#### :three: CREATE
|구현화면|:pencil2:Todo.jsx|
|-------|-----|
|<img src='/client/public/images/crud5.gif' width='300' height='400'>|<img src='/client/public/images/crud6.png' width='500' height='200'>

- axios를 사용하여 객체에 title, content를 담고 헤더에 token을 제출하는 방식으로 구현하였습니다.

#### :four: READ
|:pencil2:TodoList.jsx|
|-----|
|<img src='/client/public/images/crud7.png' width='500' height='200'>|

#### :five: UPDATE
|구현화면|
|-----|
|<img src='/client/public/images/crud11.gif' width='500' height='400'>|

|:pencil2:TodoList.jsx|:pencil2:TodoList.jsx|
|-----|-----|
|<img src='/client/public/images/crud8.png' width='400' height='300'>|<img src='/client/public/images/crud9.png' width='400' height='300'>|

|:pencil2:TodoUpdate.jsx|
|----|
|<img src='/client/public/images/crud10.png' width='500' height='400'>|


- 수정 버튼 클릭시 클릭한 버튼에서 Todo 내용을  추출하여 TodoUpdate Components에 Props로 전달한 다음 TodoUpdate Components에서 **axios PUT method**를 이용하여 구현하였습니다.

#### :six: DELETE
|구현화면|:pencil2:DeleteModal.jsx|
|-----|-----|
|<img src='/client/public/images/crud12.gif' width='400' height='400'>|<img src='/client/public/images/crud13.png' width='500' height='400'>

- 삭제 버튼 클릭시 재확인하는 DeleteModal창을 띄우고 삭제버튼 클릭시 **axios delete Method**를 이용하여 삭제를 구현하였습니다.

---

### :white_square_button: 수정사항

#### :one: function 명과 server-url 

|수정 전|수정 후|
|-------|-------|
|<img src='/client/public/images/change1.png' width='400'> |<img src='/client/public/images/change1-1.png' width='400'>|


- 해당 function을 포함하고 있는 components의 이름이 Login이라 기존login이라고 적혀있던 function 명을 signIn으로 교체하였습니다.
- 기존 로컬 서버 주소의 쉬운 관리와 배포시 보안을 위해 .env을 사용하여 설정하였습니다.


##### :two: 회원가입 페이지 리팩토링

|수정 전|수정 후|
|-------|-------|
|<img src='/client/public/images/change2-1.png' width='400'> |<img src='/client/public/images/change2.png' width='400' height="400">|


- 정규식을 밖으로 빼고 id,password,passwordconfirm의 코드를 리팩토링해서 한 곳에 응집하였습니다.
- 기존 60줄 코드가 27줄로 변경되었습니다.


#### :three: TodoList 리팩토링 

|수정 전|수정 후|
|-------|-------|
|<img src='/client/public/images/change3.png' width='400'> |<img src='/client/public/images/change3-1.png' width='400' height="200">|

- 비슷한 기능을 하는 function을 하나로 합쳐서 적용하였습니다.


#### :four: todolist 삭제시 재확인 추가

|수정 전|수정 후|
|-------|-------|
|<img src='/client/public/images/change4-3.gif' width='400'> |<img src='/client/public/images/crud12.gif' width='400' height="200">|


- deleteTodoConfirmBox 라는 변수를 toggle로 설정하여 껐다 켰다 할 수 있다.
