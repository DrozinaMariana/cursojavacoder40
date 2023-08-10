// declaracion de variables globales
let sueldo = 0;
const sueldoMayor = 200000;
const aumento20 = 1.20;
const aumento30 = 1.30;
let sueldo_minimo = 200000;
let sueldo_maximo = 0;
let empleado_maximo = "";
let cat_maxima = "";
let empleado_minimo = "";
let cat_minima = "";
let cantidadSueldoMayores = 0;
let cantidadSueldoMenores = 0;
let sueldoConAumento = 0;
let nombreEmpledo = "";
let categoriaEmpleado = "";

// funciones
function calculoAumentoSueldos(sueldo, aumento) { return (sueldo * aumento) }

function max_min(sueldo, categoria, nombre) {
    if (sueldo > sueldo_maximo) {
        sueldo_maximo = sueldo;
        cat_maxima = categoria;
        empleado_maximo = nombre;
    }
    if (sueldo < sueldo_minimo) {
        sueldo_minimo = sueldo;
        cat_minima = categoria;
        empleado_minimo = nombre;
    }
}

function cargarEmpleados() {
    nombreEmpledo = prompt("ingrese nombre empleado:(ingrese fin para terminar)");
    while (nombreEmpledo != "fin") {
        categoriaEmpleado = prompt("categoria:(a-b-c)");
        while (categoriaEmpleado != "a" && categoriaEmpleado != "b" && categoriaEmpleado != "c") {
            categoriaEmpleado = prompt("Ingrese categoria valida.categoria:(a-b-c):");
        }
        sueldo = Number(prompt("sueldo:"));
        if (sueldo < sueldoMayor) {
            cantidadSueldoMenores += 1;
            max_min(sueldo, categoriaEmpleado, nombreEmpledo);
            sueldoConAumento = calculoAumentoSueldos(sueldo, aumento30);
            alert("sueldo actualizado con 30%: " + sueldoConAumento);
        } else if (sueldo > sueldoMayor) {
            cantidadSueldoMayores += 1;
            max_min(sueldo, categoriaEmpleado, nombreEmpledo);
            sueldoConAumento = calculoAumentoSueldos(sueldo, aumento20);
            alert("sueldo actualizado con 20%: " + sueldoConAumento);
        }
        nombreEmpledo = prompt("ingrese nombre empleado:(ingrese fin para terminar");
    }
}

//programa principal
cargarEmpleados()
alert("cantidad de empleado con sueldos mayores a $200.000 :" + cantidadSueldoMayores + "\ncantidad de sueldos menores a $200.000 :" + cantidadSueldoMenores);
alert(" empleado con sueldo mayor: \nnombre empleado: " + empleado_maximo + "\ncategoria:" + cat_maxima + "\nsueldo: " + sueldo_maximo);
alert(" empleado con sueldo menor: \nnombre empleado: " + empleado_minimo + "\ncategoria:" + cat_minima + "\nsueldo: " + sueldo_minimo);