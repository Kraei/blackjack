/*
* 2C =  two of Clubs (Tréboles)
* 2D =  two of Diamonds (Diamantes)
* 2H =  two of Hearts (Corazones)
* 2S =  two of Spades (Espadas/picas)
*/

//Creando Deck de cartas en órden aleatorio

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;
    puntosComputadora = 0;

//Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
const puntosHTML = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }
    for (let tipo of tipos) {
        for (let esepecial of especiales) {
            deck.push(esepecial + tipo)
        }
    }
    //console.log(deck);
    deck.sort(() => Math.random() - 0.5);
    //console.log(deck);
    return deck;
}

crearDeck();

//Tomar una carta de la baraja

const pedirCarta = () => {
    if (deck.length === 0) {
        throw 'No hay más cartas';
    }
    //console.log(deck);
    const carta = deck.pop();
    //console.log(carta);
    return carta;
}

pedirCarta();

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10
        : parseInt(valor);
    /*if (isNaN(valor)) {
      puntos = (valor === 'A') ? 11 : 10;
    } else {
       puntos = parseInt(valor);
    }
    console.log(puntos); */
}

//Valores para computadora

const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora; //la posisción del array es la posición del elemento en el html

        //Agregar imagen de cartas
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);
        if (puntosMinimos > 21) {
            break;
        }
    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
    
    setTimeout(() => {
        if (puntosComputadora === puntosMinimos) {
            alert('Nadie gana');
        } else if (puntosMinimos > 21) {
            alert('la computadora gana');
        } else if (puntosComputadora > 21) {
            alert('Gana el jugador'); 
        } else {
            alert('Computadora gana');
        }
    }, 1000) 
    // if (puntosComputadora > puntosJugador && puntosComputadora <= 21) {
    //     alert('Lo siento, has perdido');
    // } else if (puntosComputadora === 21 && puntosJugador === 21 ){
    //     alert('Juego reñido, esto es un empate');
    // } else if (puntosComputadora < 21 && puntosJugador < 21) {
    //     alert('Nadie gana');
    // } else {
    //     alert('Gran juego! Eres el ganador');
    // }
}

//Eventos

//Agregar puntos en jugador
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador; //la posisción del array es la posición del elemento en el html
    console.log(puntosJugador);
    //Agregar imagen de cartas
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    divCartasJugador.append(imgCarta);
    imgCarta.classList.add('carta');
    //Lógica de puntos del jugador
    if (puntosJugador > 21) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        alert('21, genial');
        turnoComputadora(puntosJugador);
    }
});

//Boton detener
btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
})

//Botón nuevo juego
btnNuevo.addEventListener('click', () => {

    console.clear;
    deck = [];
    deck = crearDeck();
    puntosJugador = 0;
    puntosComputadora = 0;
    
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    console.log(deck);
})
