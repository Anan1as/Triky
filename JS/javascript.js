// Obtener todos los inputs de color
const colorInputs = document.querySelectorAll('input[type="color"]');

// Matriz para mantener el seguimiento de los colores en el tablero
const tablero = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

// Bandera para verificar el turno del jugador
let turnoJugador1 = true;

// Función para verificar si un jugador ha ganado
function verificarGanador() {
    const combinacionesGanadoras = [
        // Combinaciones horizontales
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        // Combinaciones verticales
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        // Combinaciones diagonales
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    for (const combinacion of combinacionesGanadoras) {
        const [a, b, c] = combinacion;
        const colorA = tablero[a[0]][a[1]];
        const colorB = tablero[b[0]][b[1]];
        const colorC = tablero[c[0]][c[1]];

        if (colorA !== '' && colorA === colorB && colorA === colorC) {
            alert(`¡El jugador ${colorA} gana!`);
            reiniciarJuego();
            return;
        }
    }

    // Verificar si hay empate
    if (!tablero.flat().includes('')) {
        alert('¡Empate!');
        reiniciarJuego();
    }
}

// Función para manejar el clic en los inputs de color
function manejarClic(event) {
    const input = event.target;
    const fila = input.parentNode.parentNode.rowIndex;
    const columna = input.parentNode.cellIndex;

    if (tablero[fila][columna] === '') {
        const color = turnoJugador1 ? 'Jugador 1' : 'Jugador 2';
        input.disabled = true;
        tablero[fila][columna] = color;
        verificarGanador();
        turnoJugador1 = !turnoJugador1;
    }
}

// Función para reiniciar el juego
function reiniciarJuego() {
    for (const fila of tablero) {
        fila.fill('');
    }

    for (const input of colorInputs) {
        input.disabled = false;
    }
}

// Asignar evento 'click' a los inputs de color
for (const input of colorInputs) {
    input.addEventListener('change', manejarClic);
}