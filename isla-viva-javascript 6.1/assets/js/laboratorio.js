'use strict';

// Variable de alcance global para esta página.
const nombreSitio = 'Isla Viva';

// Arreglo que será recorrido con diferentes estructuras repetitivas.
const destinos = [
  { nombre: 'Viejo San Juan', categoria: 'Historia' },
  { nombre: 'El Yunque', categoria: 'Naturaleza' },
  { nombre: 'Piñones', categoria: 'Cultura' }
];

// Función con if, else if y else para tomar una decisión.
function evaluarNivelInteres(nivel) {
  if (Number.isNaN(nivel) || nivel < 1 || nivel > 10) {
    return { clase: 'alert-danger', mensaje: 'Escribe un número válido entre 1 y 10.' };
  } else if (nivel >= 8) {
    return { clase: 'alert-success', mensaje: '¡Excelente! Te recomendamos explorar los tres proyectos.' };
  } else if (nivel >= 5) {
    return { clase: 'alert-warning', mensaje: 'Comienza con el proyecto del Viejo San Juan.' };
  } else {
    return { clase: 'alert-info', mensaje: 'Mira primero los resúmenes y selecciona el tema que prefieras.' };
  }
}

// Función que demuestra for, while y do...while.
function ejecutarDemostracionBucles() {
  const resultadosFor = [];

  // for: itera todos los elementos del arreglo.
  for (let indice = 0; indice < destinos.length; indice += 1) {
    resultadosFor.push(`${indice + 1}. ${destinos[indice].nombre} — ${destinos[indice].categoria}`);
  }

  // while: repite mientras la condición sea verdadera.
  const resultadosWhile = [];
  let paso = 1;
  while (paso <= 3) {
    resultadosWhile.push(`Paso ${paso}`);
    paso += 1;
  }

  // do...while: ejecuta el bloque al menos una vez.
  const resultadosDoWhile = [];
  let intento = 1;
  do {
    resultadosDoWhile.push(`Intento ${intento}`);
    intento += 1;
  } while (intento <= 2);

  return { resultadosFor, resultadosWhile, resultadosDoWhile };
}

// Función para demostrar alcance global, local y de bloque.
function demostrarAlcance() {
  const variableLocal = 'Solo existe dentro de demostrarAlcance().';
  let mensajeBloque = '';

  if (true) {
    const variableBloque = 'Solo existe dentro de este bloque if.';
    mensajeBloque = variableBloque;
    console.log('Variable de bloque:', variableBloque);
  }

  console.log('Variable global:', nombreSitio);
  console.log('Variable local:', variableLocal);
  console.log('Fuera del bloque, typeof variableBloque:', typeof variableBloque);

  return [
    `Global: ${nombreSitio}`,
    `Local: ${variableLocal}`,
    `Bloque: ${mensajeBloque}`,
    `Fuera del bloque: ${typeof variableBloque}`
  ].join('\n');
}

// Clausura: la función interna conserva acceso a la variable privada valor.
function crearContador() {
  let valor = 0;

  return function incrementar() {
    valor += 1;
    return valor;
  };
}

const contadorVisitas = crearContador();

function mostrarResultadoInteres() {
  const campo = document.querySelector('#nivelInteres');
  const resultado = document.querySelector('#resultadoInteres');
  const evaluacion = evaluarNivelInteres(Number(campo.value));

  resultado.className = `alert ${evaluacion.clase} mt-3 mb-0`;
  resultado.textContent = evaluacion.mensaje;
  console.log('Resultado del condicional:', evaluacion);
}

function mostrarBucles() {
  const salida = ejecutarDemostracionBucles();
  const resultado = document.querySelector('#resultadoBucles');

  resultado.innerHTML = `
    <h3 class="h6">Arreglo recorrido con for</h3>
    <ul>${salida.resultadosFor.map((elemento) => `<li>${elemento}</li>`).join('')}</ul>
    <p><strong>while:</strong> ${salida.resultadosWhile.join(' → ')}</p>
    <p class="mb-0"><strong>do...while:</strong> ${salida.resultadosDoWhile.join(' → ')}</p>
  `;

  console.group('Demostración de bucles');
  console.log('for:', salida.resultadosFor);
  console.log('while:', salida.resultadosWhile);
  console.log('do...while:', salida.resultadosDoWhile);
  console.groupEnd();
}

function ejecutarPruebas() {
  console.group('Pruebas automáticas — Isla Viva');
  console.assert(evaluarNivelInteres(9).clase === 'alert-success', 'La evaluación alta debe ser exitosa.');
  console.assert(evaluarNivelInteres(6).clase === 'alert-warning', 'La evaluación media debe mostrar advertencia.');
  console.assert(evaluarNivelInteres(2).clase === 'alert-info', 'La evaluación baja debe ser informativa.');

  const contadorPrueba = crearContador();
  console.assert(contadorPrueba() === 1, 'El contador debe comenzar en 1.');
  console.assert(contadorPrueba() === 2, 'La clausura debe recordar el valor anterior.');

  console.table(destinos);
  console.log('Pruebas completadas. Si no aparecen errores de aserción, todas pasaron.');
  console.groupEnd();
}

document.querySelector('#evaluarInteres').addEventListener('click', mostrarResultadoInteres);
document.querySelector('#ejecutarBucles').addEventListener('click', mostrarBucles);
document.querySelector('#probarAlcance').addEventListener('click', () => {
  document.querySelector('#resultadoAlcance').textContent = demostrarAlcance();
});
document.querySelector('#incrementarContador').addEventListener('click', () => {
  document.querySelector('#valorContador').textContent = contadorVisitas();
});

ejecutarPruebas();
