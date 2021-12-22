/*
* 2C = Two of Clubs (Treboles)
* 2D = Two of Diamonds (Diamantes)
* 2H = Two of Hearts (Corazones)
* 2S = Two of Spades (Pica)
*/

const miModulo =  (() => {
    'use strict'

    
    let deck = [];
    const tipos = ['C','D','H','S'],
            especiales = ['A','J','Q','K'];

    // let puntosJugador = 0,
    //     puntosComputadora = 0;
    let puntosJugadores = [];

    // Referencias del HTML
    const   btnPedir = document.querySelector('#btnPedir'),
            btnDetener = document.querySelector('#btnDetener'),
            btnNuevo = document.querySelector('#btnNuevo');

    const   divCartasJugadores = document.querySelectorAll('.divCartas'),
            puntosHTML = document.querySelectorAll('small');

            // inicializa juego
    const inicializarJuego = (numJugadores = 2) => {
        deck =  crearDeck();

        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
        
        puntosHTML.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');
    

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    // Esta funcion crea una nueva baraja
    const crearDeck = () =>{

        deck = [];
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
        return _.shuffle(deck);
    }

    // Esta funcion me permite tomar una carta
    const pedirCarta = () => {

        if(deck.length === 0){
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
    }

    // obtener valor de la carta
    const valorCarta = (carta) => {
        const a = 'A';
        const valor = carta.substring(0, carta.length-1);
        return ( isNaN(valor) ) 
        ?  (valor === a) ? 11 : 10 
        :   valor * 1; // para convertir a numero
    }

    // Turno: 0 = primer jugador y el ultimo la maquina
    const acumularPuntos = (carta, turno) =>{
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if(puntosComputadora === puntosMinimos){
                alert('Nadie Gana 😞')
            }else if(puntosMinimos > 21) {
                alert('computador Gana 😙');
            }else if (puntosComputadora > 21){
                alert('Jugador Gana');
            }else{
                alert('Computadora Gana');
            }
        }, 1000);
        
    }

    // ========== turno de la computadora =========== //
    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();

            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

        }while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
        determinarGanador();
    }


    // ============= Eventos 
    // ---- boton pedir cartas ----- //
    btnPedir.addEventListener('click', () => {
        
        const carta = pedirCarta();
        const puntosJugador =  acumularPuntos(carta, 0);
        crearCarta(carta, 0);
        validation(puntosJugador);
    });

    const validation = (vPuntos) => {
        if(vPuntos > 21) {
            console.warn('Lo siento mucho, perdistes');
            btnDetener.disabled = true;
            btnPedir.disabled = true;
            turnoComputadora( vPuntos);
        } else if(vPuntos === 21) {
            console.warn('21, genial!');
            btnDetener.disabled = true;
            btnPedir.disabled = true;
            turnoComputadora( vPuntos);
        }
    }

    // ---- boton detener juego ----- //
    btnDetener.addEventListener('click', () =>{
        
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugadores[0]);
    });

    return {
        nuevoJuego: inicializarJuego
    };

})();





