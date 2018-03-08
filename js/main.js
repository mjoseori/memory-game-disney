// Objetos de cada personaje
// Imágenes powered by Gema!!

const arrayPersonajes = [
    {
        nombre: "Anna",
        ruta: "img/Anna.png"
    },
    {
        nombre: "Campanilla",
        ruta : "img/Campanilla.png"
    },
    {
        nombre: "Elsa",
        ruta: "img/Elsa.png"
    },
    {
        nombre: "Cenicienta",
        ruta: "img/Cenicienta.png"
    },
    {
        nombre: "Flynn",
        ruta: "img/Flynn.png"
    },
    {
        nombre: "Genio",
        ruta: "img/Genio.png"
    },
    {
        nombre: "HadaMadrina",
        ruta: "img/HadaMadrina.png"
    },
    {
        nombre: "Mushu",
        ruta: "img/Mushu.png"
    },
    {
        nombre: "Pascal",
        ruta: "img/Pascal.png"
    },
    {
        nombre: "Pepito",
        ruta: "img/Pepito.png"
    },
    {
        nombre: "Primavera",
        ruta: "img/Primavera.png"
    },
    {
        nombre: "Rapunzel",
        ruta: "img/Rapunzel.png"
    },
]

const game = document.getElementById("game");
const rejilla = document.createElement("section");
const winner = document.getElementById("winner");

// Bloques de código para crear la rejilla
rejilla.setAttribute("class","rejilla");
game.appendChild(rejilla);

const song = document.getElementById("song");
const clic = document.getElementById("clic");
const bounce = document.getElementById("bounce");
const win = document.getElementById("win");
const fail = document.getElementById("fail");

var contador = 0; // con el contamos los que seleccionemos.
var primerSel = "";
var segundoSel = "";
var selPrevio = null;
var eliminados = 0;

var star = document.getElementById("start");
var reloj = document.getElementById("reloj");
var gameover = document.getElementById("game-over");

var segundos = 40;


// Función para barajar los div con cada personaje

function baraja() {
   
    const personajesDobles = arrayPersonajes.concat(arrayPersonajes)
                                .sort(() => 0.5 - Math.random());

    personajesDobles.forEach(personajes => {
        const { nombre, ruta} = personajes;
        const tarjeta = document.createElement("div"); // hace que para cada personaje me cree una
        tarjeta.classList.add("tarjeta");              // tarjeta que es un div. 
        tarjeta.dataset.name = nombre;

    const anverso = document.createElement("div");
        anverso.classList.add("anverso");

    const reverso = document.createElement("div");
        reverso.classList.add("reverso");
        reverso.style.backgroundImage = `url(${ruta})`;

        rejilla.appendChild(tarjeta);
        tarjeta.appendChild(anverso);
        tarjeta.appendChild(reverso);
        });
        gameover.style.opacity = "0";
        winner.classList.remove("open");
        rejilla.classList.remove("out");
        rejilla.classList.add("start");
        start.style.display = "none";
        reloj.style.display = "initial";
        reloj.style.color = "green";
        song.play();
        eliminados = 0;
}

// Función de inicio del juego y reloj cuenta atrás

function startGame(){

    var s = parseInt(segundos % 60);
    var ss = ("0" + s).slice(-2); // Devuelve los dos últimos.
    var m = parseInt(segundos / 60);
    var mm = ("0" + m).slice(-2);
    document.getElementById("reloj").innerHTML = mm + ":" + ss;

    if (eliminados === 24) {
        return;
    }
    if (segundos <= 10){
        reloj.style.color = "red";
    }
    if (segundos > 0) {
    var t = setTimeout(function(){ // ejecuta la función cuando pasa un det. tiempo
                                    // setTimeout( función, tiempo )
                                    //

    startGame();
    },1000)
} else {
    gameOver();
}
    segundos--;  
}

// Función para ejecutar la lógica de partida perdida

function gameOver(){
    segundos = 40;
    song.pause();
    song.currentTime = 0;
    fail.play();
    fail.currentTime = 0; // para que suene todas las veces que juegues
    rejilla.classList.add("out");
    gameover.style.opacity = "1";
    start.style.display = "initial";
    reloj.style.display = "none";
    setTimeout(function(){
        while(rejilla.firstChild){
            rejilla.removeChild(rejilla.firstChild); 
        }
    },1000);
}

// Evento click para seleccionar cada personaje

rejilla.addEventListener("click",function(evento){
    clic.currentTime = 0;
    clic.play();

    var seleccionado = evento.target;

    if (seleccionado.nodeName === "SECTION" || 
        seleccionado.parentNode === selPrevio ||
        seleccionado.parentNode.classList.contains("eliminado")) {
        return; // solo pilla las tarjetas no la grande.
    }

    // condicion para que solo se seleccionen dos y si no son =, se apaga.
    if (contador < 2) {
        contador++;
        if (contador === 1) {
            primerSel = seleccionado.parentNode.dataset.name;
            seleccionado.parentNode.classList.add("seleccionado");
        } else {
            segundoSel = seleccionado.parentNode.dataset.name;
            seleccionado.parentNode.classList.add("seleccionado");
        } 
        if (primerSel !== "" && segundoSel !== "") {
            if(primerSel === segundoSel) {
                bounce.currentTime = 0;
                bounce.play();
                setTimeout(eliminar,600);
                setTimeout (resertSel,600);
                contEliminados();
         } else {
            setTimeout (resertSel,600);
             }
        }
        selPrevio = seleccionado.parentNode;
    }
    
});


// Función para eliminar los elementos coincidentes

var eliminar = function() {
    var seleccionados = document.querySelectorAll(".seleccionado"); // Crea un array con los 2 seleccionados
    seleccionados.forEach(elemento =>{
        elemento.classList.add("eliminado");
    });
}

// Función para resetear los seleccionados después de 2 intentos

var resertSel = function() {
    contador = 0;
    primerSel = "";
    segundoSel = "";

    var seleccionados = document.querySelectorAll(".seleccionado"); 
    seleccionados.forEach(elemento => {
        elemento.classList.remove("seleccionado");
    });

}

// Función para contar los eliminados y cuando lleguen a 24 realizar la lógica
// de partida ganada

var contEliminados = function () {
    eliminados = document.querySelectorAll(".eliminado").length + 2;// ponemos +2 para que cuente los primeros eliminados.
    if (eliminados === 24) {
        winner.classList.add("open");
        win.currentTime = 0;
        win.play();
        segundos = 40;
        song.pause();
        song.currentTime = 0;
        rejilla.classList.add("out");
        start.style.display = "initial";
        reloj.style.display = "none";
        setTimeout(function(){
            while(rejilla.firstChild){
                rejilla.removeChild(rejilla.firstChild); 
            }
        },1000);
    }

    
