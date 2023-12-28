botones = document.querySelectorAll("button");
operadores = document.querySelectorAll(".operator");
display = document.querySelector(".display");
enter = document.querySelector(".enter");
deleter = document.querySelector(".delete");
clear = document.querySelector(".clear");
numeros = document.querySelectorAll(".number");
coma = document.querySelector(".coma");
let numero1 = "";
let numero2 = "";
let operadorElegido = "";
let clickedTimes = 0;

add = (num1, num2) => {
  if ((num1 + num2) % 2 === 0) {
    display.innerHTML = num1 + num2;
  } else {
    display.innerHTML = (num1 + num2).toFixed(3);
  }
};

substract = (num1, num2) => {
  display.innerHTML = num1 - num2;
};

multiply = (num1, num2) => {
  display.innerHTML = num1 * num2;
};

divide = (num1, num2) => {
  if (num2 === 0) {
    display.innerHTML = "lmao";
  } else {
    display.innerHTML = num1 / num2;
  }
};

operate = (num1, num2, operator) => {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return substract(num1, num2);
    case "×":
      return multiply(num1, num2);
    case "÷":
      return divide(num1, num2);
  }
};

deleter.addEventListener("click", () => {
  display.innerHTML = display.innerHTML.toString().slice(0, -1);
});

botones.forEach((boton) => {
  boton.classList.add("boton");
  boton.addEventListener("click", () => {
    display.innerHTML += boton.value;
  });
});

coma.addEventListener("click", () => {
  if (display.innerHTML.includes(".")) {
    coma.disabled = !coma.disabled;
  } else {
    display.innerHTML += ".";
    coma.disabled = !coma.disabled;
  }
});

operadores.forEach((operador) => {
  operador.addEventListener("click", () => {
    coma.disabled = !coma.disabled;
    if (clickedTimes === 0) {
      numero1 = parseFloat(display.innerHTML);
      display.innerHTML = "";
      operadorElegido = operador.value;
      clickedTimes = clickedTimes + 1;
    } else {
      numero2 = parseFloat(display.innerHTML);
      operate(numero1, numero2, operadorElegido);

      numero1 = parseFloat(display.innerHTML);
      operadorElegido = operador.value;

      numeros.forEach((boton) => {
        boton.addEventListener("click", () => {
          if (!display.innerHTML.includes(".")) {
            display.innerHTML = "";
            display.innerHTML += boton.value;
          }
        });
      });
    }
  });
});

enter.addEventListener("click", () => {
  clickedTimes = 0;
  numero2 = parseFloat(display.innerHTML);
  if (numero2 !== null) {
    operate(numero1, numero2, operadorElegido);
  } else {
    display.innerHTML = "El segundo numero no ha sido ingresado";
  }
});

clear.addEventListener("click", () => {
  numero1 = "";
  operadorElegido = "";
  numero2 = "";
  display.innerHTML = "";
  coma.disabled = !coma.disabled;
});
