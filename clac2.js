let num = document.querySelector(".num");
let equ = document.querySelector("#res");
let res = document.querySelector("input");
let cube = document.querySelector("#cube");
let reset = document.querySelector("#reset");

//!Event Delegation for input of numbers
num.addEventListener("click", e => {
  let val = 0;
  val = e.target.innerText; //values fetched
  res.value += val; //stored to input
  //! Equal
  equ.addEventListener("click", e => {
    let fin = eval(res.value);
    res.value = fin;
  });
  //!clear
  reset.addEventListener("click", e => {
    res.value = '';
  });
})
//!back Space

bac = () => {
    let fin = res.value;
    res.value = fin.slice(0, fin.length - 1);
}
//!
sqrt = ()=> {
    let fin = eval(res.value);
    res.value = fin**2;
}
cbrt = () => {
  let fin = eval(res.value);
  res.value = fin**3;
};
