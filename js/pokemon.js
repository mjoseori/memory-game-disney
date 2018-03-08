// Objetos de cada personaje
// Imágenes powered by Gema!!

const arrayPersonajes = [
    {
        nombre: "Abra",
        ruta: "img/Abra.png" 
    },
    {
        nombre: "Bulbasur",
        ruta : "img/bulbasur"
    },
    {
        nombre: "Charmander",
        ruta: "img/Charmander.png"
    },
    {
        nombre: "Draniti",
        ruta: "img/draniti.png"
    },
    {
        nombre: "Eve",
        ruta: "img/eve.png"
    },
    {
        nombre: "Mankey",
        ruta: "img/mankey.png"
    },
    {
        nombre: "Logo",
        ruta: "img/logo.png"
    },
    {
        nombre: "Pidgey",
        ruta: "img/pidgey.png"
    },
    {
        nombre: "Pikachu",
        ruta: "img/pikachu-2.png"
    },
    {
        nombre: "Jigglypuf",
        ruta: "img/jigglypuf.png"
    },
    {
        nombre: "Psyduck",
        ruta: "img/Psyduck.png"
    },
    {
        nombre: "Squirtle",
        ruta: "img/Squirtle.png"
    },
]

const game = document.getElementById("game");
const rejilla = document.createElement("section");
const winner = document.getElementById("winner");
const personajesDobles = arrayPersonajes.concat(arrayPersonajes)
                            .sort(() => 0.5 - Math.random());

const song = document.getElementById("song");
const clic = document.getElementById("clic");
const bounce = document.getElementById("bounce");
const win = document.getElementById("win");

var contador = 0; // con el contamos los que seleccionemos.
var primerSel = "";
var segundoSel = "";
var selPrevio = null;

rejilla.setAttribute("class","rejilla");
game.appendChild(rejilla);

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

var eliminar = function() {
    var seleccionados = document.querySelectorAll(".seleccionado"); // Crea un array con los 2 seleccionados
    seleccionados.forEach(elemento =>{
        elemento.classList.add("eliminado");
    });
}

var resertSel = function() {
    contador = 0;
    primerSel = "";
    segundoSel = "";

    var seleccionados = document.querySelectorAll(".seleccionado"); 
    seleccionados.forEach(elemento => {
        elemento.classList.remove("seleccionado");
    });

}

var contEliminados = function () {
    var eliminados = document.querySelectorAll(".eliminado").length + 2;// ponemos +2 para que cuente los primeros eliminados.
    if (eliminados === 24) {
        winner.classList.add("open");
        win.currentTime = 0;
        win.play();
    }
}

song.play();