const clockContainer = document.querySelector(".js-clock"), //querySelector는 xx의 자식 엘리먼트중 조건에 해당하는 첫 번째 요소를 가져옴. 여기서 xx는 document
  clockTitle = clockContainer.querySelector("h1");

function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
}

function init() {
  getTime();
  setInterval(getTime, 1000); //gettime 함수를 1초에 한번씩 실행하는 메소드 millisecond 기준이기 때문에 1000 = 1초
}

init();
