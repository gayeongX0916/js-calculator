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
    const lastNum = displayInput.value.slice(lastOperatorIndex + 1);

    if (value === "AC") {
      resultInput.value = "";
      displayInput.value = "";
      return;
    }

    if (value === "=") {
      try {
        resultInput.value = eval(displayInput.value);
      } catch {
        resultInput.value = "오류";
      }
      return;
    }

    if (displayInput.value === "" && operators.includes(value)) {
      return;
    }

    if (value === ".") {
      if (lastNum.includes(".")) return;
    }

    const lastChar = displayInput.value.slice(-1);
    if (operators.includes(lastChar) && operators.includes(value)) {
      displayInput.value = displayInput.value.slice(0, -1) + value;
      return;
    }

    if (!isNaN(value) && displayInput.value) {
      if (lastNum.startsWith("0") && !lastNum.includes(".") && value !== ".") {
        return;
      }
    }

    displayInput.value += value;
  });
});
