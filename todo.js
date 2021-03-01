const toDoForm = document.querySelector(".js-toDoForm"); //클래스 이름이 js-toDoForm인 선택자를 toDoForm에 선언
const toDoInput = toDoForm.querySelector("input"); //toDoForm의 자식 요소 중 input태그인 것을 toDoInput에 선언
const toDoList = document.querySelector(".js-toDoList"); //클래스 이름이 js-toDoList인 선택자를 toDoList에 선언

const TODOS_LS = "toDos"; //toDos문자열을 상수화

let toDos = []; //toDos라는 이름의 배열 선언
let idNumbers = 1; //id 값을 저장하기위한 변수 선언 후 1로 초기화

function deleteToDo(event) {
  //todo 요소하나를 삭제하기위한 메소드
  const btn = event.target; //btn 변수 선언 및 클릭한 delete버튼 반환한 후 btn 변수에 저장
  const li = btn.parentNode; //li 변수 선언 및 위에서 선언한 삭제 버튼의 부모엘리먼트인 li를 반환한 후 li 변수에 저장
  toDoList.removeChild(li); //toDoList에서 li요소를 삭제
  const cleanToDos = toDos.filter(function (toDo) {
    //cleanToDos 변수를 선언한 후 기존 toDos배열에 저장되어있던 요소에서 14행에 삭제된 요소를 필터링 하기위한 기능
    return toDo.id !== parseInt(li.id);
    // 필터함수는 각 항목을 확인하면서( 어떻게 확인 할지는 function으로 만들었죠?) return값이 true인 항목만 모아서 반환합니다.

    // toDos에 6개의 항목이 있다고 가정하면 id가 1부터 6까지 있겠죠?
    // 4번째 삭제버튼을 누르면, 삭제버튼의 parentNode (삭제버튼이 있는 li태그) 의 id값은 4겠죠?

    // 그러면 toDos가 가진 아이템들(6개)을 하나씩 확인하면서 각 아이템의 id와 삭제버튼 (li.id) 의 아이디인 4를 비교해서 return 합니다.
    // 그럼 return 이 총 6번 이루어지는데 이때 리턴값이 false이면 필터함수가 걸러냅니다.
    // return toDo.id !== parseInt(li.id)
    // 조건식이 toDos의 id와 삭제버튼의 parentNode인 li의 id와 달라야지 true 이므로
    // 하나씩 돌면서 toDos의 id가 4일때 li.id의 id가 4이면 같으므로 false를 리턴합니다.

    // 그러면 id값이 4인 항목만 건너뛰고 cleanToDos 에 5개의 아이템으로 이루어진 배열이 반환되어 할당됩니다.
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  //localStorage에 TODOS_LS라는 이름에 toDos배열을 저장하는데 배열을 그대로 저장할 경우 object형식으로 저장되어
  //json.stringify메소드를 이용해 문자열 형태로 변환한 후 저장
}

function paintToDo(text) {
  //받아온 값을 웹상에 띄우는 작업을 하는 메소드
  const li = document.createElement("li"); //li 변수를 생성하고 웹에서 태그 이름이 li인 요소를 하나 생성하여 li 변수에 저장
  const delBtn = document.createElement("button"); //delBtn 변수를 생성하고 웹에서 태그 이름이 button인 요소를 하나 생성하여 li 변수에 저장
  const span = document.createElement("span"); //span 변수를 생성하고 웹에서 태그 이름이 span인 요소를 하나 생성하여 li 변수에 저장
  const newId = idNumbers++; //newId 변수를 생성하고 5행에서 선언했던 toDos라는 배열의 길이에 + 1 한 값을 newId 변수에 저장
  const BTNCSS = "btnCss";
  const SPANCSS = "spanCss";
  delBtn.innerText = "❌"; //delBtn 변수에 ❌ 문자열을 저장 => <button>"❌"</button> 이런 식
  delBtn.addEventListener("click", deleteToDo); //delete 버튼을 클릭했을 때 삭제할 수 있는 기능을 위한 이벤트 리스너 등록, 클릭했을 때마다 deleteToDo메소드 실행
  delBtn.className = BTNCSS;
  span.className = SPANCSS;
  span.innerText = text; //span 변수에 우리가 입력했던 text 또는 기존 toDos에 입력했던 text를 저장
  li.id = newId; //li태그의 아이디에 newId값을 추가 --> <li id="1"> </li> 이런 방식으로 html 태그가 생성될 것이다.
  li.appendChild(delBtn);
  li.appendChild(span); //li(listItem)에 delBtn와 span을 append
  toDoList.appendChild(li); //집어넣었던 li를 toDoList밑에 append
  const toDoObj = {
    text: text,
    id: newId,
  }; //toDoObj object를 선언한 후 text에 파라미터로 받아온 text를, id에 newId값을 저장
  toDos.push(toDoObj); //toDos배열에 push메소드를 이용해 toDoObj를 추가
  saveToDos(); // localStorage에 저장하기위한 메소드
}

function handleSubmit(event) {
  //이벤트리스너에 의해 생성한 handleSubmit메소드
  event.preventDefault(); //기존의 default이벤트를 실행하지 않도록 변경 후 우리가 커스텀한 이벤트를 실행할 수 있도록 코드 작성
  const currentValue = toDoInput.value; //currentValue 변수를 선언한 후 2행의 toDoInput에서 우리가 할일을 작성하면 생기는 value값을 currentValue변수에 저장
  paintToDo(currentValue); //위에 저장한 value값을 웹상에 띄우기 위해 paintToDo메소드를 실행, 이때 currentValue값을 인자로 넘겨준다.
  toDoInput.value = ""; //위에서 value값을 넘겨줬으니까 초기화
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS); //loadedToDos라는 변수를 선언하고 localStorage안에 이름이 toDos인 요소 값을 loadedToDos에 저장
  if (loadedToDos !== null) {
    //만약 loadedToDos가 비어있지 않다면(이미 데이터가 저장되어 있다면)
    const parsedToDos = JSON.parse(loadedToDos); //parsedToDos라는 변수 선언 후 loadedToDos데이터를 자바스크립트가 다룰 수 있도록 object의 형태로 parsing한 후 parsedToDos에 저장
    parsedToDos.forEach(function (toDo) {
      //각각의 parsedTodos에 대하여 forEach함수 실행, text에 해당하는 문자열을 paintTodo함수를 실행하여 웹에 띄움
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
  //loadToDos메소드 실행 후 toDoForm에 대한 이벤트리스너 설정 submit버튼을 누를 때 마다 handleSubmit메소드 실행
}
init(); //초기화 함수
