const sizes = document.querySelectorAll(".size");
const colors = document.querySelectorAll(".color");
const shoes = document.querySelectorAll(".shoe");
const gradients = document.querySelectorAll(".gradient");
const shoeBg = document.querySelector(".shoeBackground");
let prevColor = "blue";
let animationEnd = true;
// Tamaño seleccionado
function changeSize() {
  sizes.forEach((size) => size.classList.remove("active"));
  this.classList.add("active");
}
sizes.forEach((size) => size.addEventListener("click", changeSize));

// Color seleccionado
function changeColor() {
  if (!animationEnd) {
    console.log("error");
    return;
  }
  //------------------------------------------------------------------
  //   captura los atributos del color seleccionado que indican su nombre de color y su valor hexadecimal
  //------------------------------------------------------------------
  let primary = this.getAttribute("primary");
  let color = this.getAttribute("color");
  //------------------------------------------------------------------
  // captura la imagen, la gradiente actual que tiene el atributo color con el valor capturado arriba
  //------------------------------------------------------------------
  let shoeColor = document.querySelector(`.shoe[color="${color}"]`);
  let gradient = document.querySelector(`.gradient[color="${color}"]`);
  let prevGradient = document.querySelector(`.gradient[color="${prevColor}"]`);
  if (gradient != prevGradient) {
    //------------------------------------------------------------------
    //remueve la clase active de todos y se la agrega al seleccionado
    //------------------------------------------------------------------
    colors.forEach((color) => color.classList.remove("active"));
    this.classList.add("active");
    //------------------------------------------------------------------
    //cambia el color :root para que cambie el color de todos los elementos
    //------------------------------------------------------------------
    document.documentElement.style.setProperty("--primary", primary);
    //------------------------------------------------------------------
    //remueve la clase show de todos y se la agrega al seleccionado
    //------------------------------------------------------------------
    shoes.forEach((s) => s.classList.remove("show"));
    shoeColor.classList.add("show");
    //------------------------------------------------------------------
    //remueve la clase show de todos y se la agrega al seleccionado
    //------------------------------------------------------------------
    gradients.forEach((g) => g.classList.remove("first", "second"));
    gradient.classList.add("first");
    prevGradient.classList.add("second");
    prevColor = color;
    animationEnd = false;
    gradient.addEventListener("animationend", () => {
      animationEnd = true;
    });
  } else {
    console.log("son iguales");
  }
}
colors.forEach((c) => c.addEventListener("click", changeColor));

// cuando decimos x.matches, es como decir: @media (max-width: 1000px) {}
let x = window.matchMedia("(max-width: 1000px)");
function changeHeight() {
  if (x.matches) {
    //  a medida que se achica la altura de la imagen se achica el contenedor
    let shoeHeight = shoes[0].offsetHeight;
    shoeBg.style.height = `${shoeHeight * 0.9}px`;
  } else {
    shoeBg.style.height = "475px";
  }
}
changeHeight();
window.addEventListener("resize", changeHeight);
