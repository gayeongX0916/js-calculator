let displayInput = document.querySelector(".display-input");
const resultInput = document.querySelector(".result-input");

const buttons = document.querySelectorAll("td");

const operators = ["+", "-", "*", "/"];

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.textContent.trim();

    let lastOperatorIndex = Math.max(
      displayInput.value.lastIndexOf("+"),
      displayInput.value.lastIndexOf("-"),
      displayInput.value.lastIndexOf("*"),
      displayInput.value.lastIndexOf("/")
    );
    let lastNum = displayInput.value.slice(lastOperatorIndex + 1);

    // 계산 결과 출력
    if (value === "=") {
      try {
        resultInput.value = eval(displayInput.value);
      } catch {
        resultInput.value = "오류";
      }
      return;
    }

    // AC 기능
    if (value === "AC") {
      displayInput.value = "";
      resultInput.value = "";
      return;
    }

    // 연산자 먼저 입력 방지
    if (displayInput.value === "" && operators.includes(value)) {
      return;
    }

    // 소수점 중복 입력 방지
    if (value === ".") {
      if (lastNum.includes(".")) return;
    }

    // 0으로 시작하는 숫자 입력 제한
    if (!isNaN(value) && displayInput.value) {
      if (lastNum.startsWith(0) && value !== "." && !lastNum.includes("."))
        return;
    }

    // 연산자 연속 입력시 마지막 연산자로 자동 대체
    const lastChar = displayInput.value.slice(-1);
    if (operators.includes(lastChar) && operators.includes(value)) {
      displayInput.value = displayInput.value.slice(0, -1) + value;
      return;
    }

    displayInput.value += value;
  });
});
