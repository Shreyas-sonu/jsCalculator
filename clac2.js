let num = document.querySelector(".num");
let equ = document.querySelector("#res");
let res = document.querySelector("input");
let reset = document.querySelector("#reset");

const operators = ["+", "-", "*", "/"];

//! Event Delegation for input of numbers and operators
num.addEventListener("click", function(e) {
  if (e.target.tagName !== "BUTTON") return;

  let val = e.target.innerText.trim();
  let current = res.value;

  // Clear error state before accepting new input
  if (current === "Error") {
    if (operators.includes(val)) return;
    res.value = val;
    return;
  }

  // Prevent starting expression with +, * or /
  if (["+", "*", "/"].includes(val) && current === "") return;

  // Replace last operator instead of stacking (e.g. 5+- becomes 5-)
  if (operators.includes(val) && operators.includes(current.slice(-1))) {
    res.value = current.slice(0, -1) + val;
    return;
  }

  // Prevent multiple decimal points in the same number.
  // Note: consecutive operators are replaced above, so the display can never
  // contain sequences like "5+-3" — split on operators is safe here.
  if (val === ".") {
    let parts = current.split(/[+\-*/]/);
    let lastPart = parts[parts.length - 1];
    if (lastPart.includes(".")) return;
    // Prefix a lone decimal with 0 (e.g. . becomes 0.)
    if (lastPart === "") {
      res.value += "0";
    }
  }

  res.value += val;
});

//! Equal
equ.addEventListener("click", function() {
  if (res.value === "" || res.value === "Error") return;
  // The regex guard below ensures only digits and arithmetic operators reach
  // eval(), making this call safe against code injection.
  if (!/^[\d+\-*/.]+$/.test(res.value)) {
    res.value = "Error";
    return;
  }
  try {
    let result = eval(res.value);
    if (!isFinite(result) || isNaN(result)) {
      res.value = "Error";
    } else {
      res.value = result;
    }
  } catch (e) {
    res.value = "Error";
  }
});

//! Clear
reset.addEventListener("click", function() {
  res.value = "";
});

//! Back Space
function bac() {
  if (res.value === "Error") {
    res.value = "";
    return;
  }
  res.value = res.value.slice(0, -1);
}

//! Square (x²) — raises the current value to the power of 2
function squareVal() {
  if (res.value === "" || res.value === "Error") return;
  try {
    let fin = eval(res.value);
    if (isNaN(fin) || !isFinite(fin)) {
      res.value = "Error";
      return;
    }
    res.value = fin ** 2;
  } catch (e) {
    res.value = "Error";
  }
}

//! Cube (x³) — raises the current value to the power of 3
function cubeVal() {
  if (res.value === "" || res.value === "Error") return;
  try {
    let fin = eval(res.value);
    if (isNaN(fin) || !isFinite(fin)) {
      res.value = "Error";
      return;
    }
    res.value = fin ** 3;
  } catch (e) {
    res.value = "Error";
  }
}
