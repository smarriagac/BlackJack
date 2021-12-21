/*
* 2C = Two of Clubs (Treboles)
* 2D = Two of Diamonds (Diamantes)
* 2H = Two of Hearts (Corazones)
* 2S = Two of Spades (Pica)
*/

let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0,
    puntosComputadora = 0;

// Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const puntosHTML = document.querySelectorAll('small');

// Esta funcion crea una nueva baraja
const crearDeck = () =>{

    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }

    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo);
        }
    }
    // console.log(deck);
    deck = _.shuffle(deck);
    // console.log(deck);

    return deck;
}

crearDeck();

// Esta funcion me permite tomar una carta
const pedirCarta = () => {

    if(deck.length === 0){
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop();

    // console.log(deck);
    // console.log(carta); // ka carta debe ser de la baraja
    return carta;
}

// pedirCarta();

const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length-1);
    return ( isNaN(valor) ) 
    ? puntos = (valor === 'A') ? 11 : 10 
    : puntos = valor * 1; // para convertir a numero
}

// Eventos 
btnPedir.addEventListener('click', () => {
    
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);

    console.log(puntosJugador);
    puntosHTML[0].innerText = puntosJugador;

});