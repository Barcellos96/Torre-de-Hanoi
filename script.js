const movimentos = document.getElementById("movimentos");
const vitoria = document.getElementById("vitoria");
const recorde = document.getElementById("recorde")
let lista = [[],[],[]]
let contador = 0;
let dificuldadeSelecionada = null;
let modo = "origem";
let disco = null;


//CRIANDO AS TORRES
const torre1 = document.createElement("div")
const torre2 = document.createElement("div")
const torre3 = document.createElement("div")

const jogo = document.getElementById("jogo")

torre1.id = 'torre1'
torre2.id = 'torre2'
torre3.id = 'torre3'

torre1.className = 'torre'
torre2.className = 'torre'
torre3.className = 'torre'

jogo.appendChild(torre1)
jogo.appendChild(torre2)
jogo.appendChild(torre3)


const torres = document.querySelectorAll(".torre");

//INICIAR O JOGO ESCOLHENDO SUA DIFICULDADE
function iniciarJogo() {
    const torre = document.getElementById("torre1");
    
    if (dificuldadeSelecionada === "facil") {
        start()        
        let min = Math.min(...lista[0])
        recorde.innerText = min
        if(min == "Infinity"){
            recorde.innerText = 0
        }
        //CRIANDO OS DISCOS
        for (let index = 3; index >= 1; index--) {
            const disco = document.createElement("div");
            disco.className = `disco disco${index}`;
            torre.appendChild(disco);   
        }
    } else if (dificuldadeSelecionada === "medio") {
        start()           
        let min = Math.min(...lista[1])
        recorde.innerText = min
        if(min == "Infinity"){
            recorde.innerText = 0
        }
        //CRIANDO OS DISCOS
        for (let index = 4; index >= 1; index--) {
            const disco = document.createElement("div");
            disco.className = `disco disco${index}`;
            torre.appendChild(disco);
        }
    } else if (dificuldadeSelecionada === "dificil") {
        start()  
        let min = Math.min(...lista[2])
        recorde.innerText = min
        if(min == "Infinity"){
            recorde.innerText = 0
        }
        //CRIANDO OS DISCOS  
        for (let index = 5; index >= 1; index--) {
            const disco = document.createElement("div");
            disco.className = `disco disco${index}`;
            torre.appendChild(disco);
        }
    }
    
}


//MOVENDO OS DISCOS ENTRE AS TORRES
torres.forEach(function (torre) {
    torre.addEventListener("click", function (event) {
        if (modo === "origem") {
            disco = event.currentTarget.lastElementChild;
            if (disco) {
                modo = "destino";
            }
        } else if (modo === "destino") {
            const discoNoTopoDaTorreDeDestino =
                event.currentTarget.lastElementChild;

            if (
                !discoNoTopoDaTorreDeDestino ||
                disco.clientWidth < discoNoTopoDaTorreDeDestino.clientWidth
            ) {
                event.currentTarget.appendChild(disco);
                contador += 1
                movimentos.innerText = contador;
                jogoGanho();
            }
            disco = "null";
            modo = "origem";
        }
    });
    
});


//QUANDO JOGO GANHO
function jogoGanho() {
    const torre3 = document.getElementById("torre3");
    if (dificuldadeSelecionada === "facil" && torre3.childElementCount === 3) {
        vitoria.innerText = "VITORIA";
        lista[0].push(contador)
        let min = Math.min(...lista[0])
        recorde.innerText = min
            
        pause()
        iniciaModal('modal-vitoria')
    } else if (dificuldadeSelecionada === "medio" && torre3.childElementCount === 4) {
        vitoria.innerText = "VITORIA";
        lista[1].push(contador)
        let min = Math.min(...lista[1])
        recorde.innerText = min

        pause()
        iniciaModal('modal-vitoria')
    } else if (dificuldadeSelecionada === "dificil" && torre3.childElementCount === 5) {
        vitoria.innerText = "VITORIA";
        lista[2].push(contador)
        let min = Math.min(...lista[2])
        recorde.innerText = min

        pause()
        iniciaModal('modal-vitoria')
    }

}

//INICIAR NOVO JOGO
function resetJogo() {
    torres.forEach(function (torre) {
        torre.replaceChildren();
    });
    iniciarJogo(dificuldadeSelecionada);
    contador = 0;
    movimentos.innerText = 0
    disco = null;
    vitoria.innerText = "";
    stop()
}
const reset = document.getElementById("reset");
reset.addEventListener("click", resetJogo);

//CASO SELECIONAR NOVA DIFICULDADE RESETAR O JOGO
const dificuldades = document.getElementsByName("dificuldade");

dificuldades.forEach(function (dificuldade) {
    dificuldade.addEventListener("change", function (event) {
        dificuldadeSelecionada = event.currentTarget.value;
        resetJogo();
    });
});


//CRONOMETRO
let hh = 0;
let mm = 0;
let ss = 0;

let tempo = 1000; //quantos milésimos valem 1 segundo?
let cron = 0;

function start() {
    clearInterval(cron)
    cron = setInterval(() => { timer(); }, tempo)
    
}
function pause() {
    clearInterval(cron)
}
function stop() {
    hh = 0;
    mm = 0;
    ss = 0;

}
function timer() {
    ss++;

    if(ss == 60){
        ss = 0
        mm++

        if(mm == 60){
            mm = 0
            hh++
        }
    }

    let format = (hh < 10 ? '0' + hh : hh)+ ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);
    document.getElementById('cronometro').innerText = format;
}


function iniciaModal(modalID) {
    const modal = document.getElementById(modalID)

    modal.classList.add('mostrar')
    modal.addEventListener("click", (e) => {
        if(e.target.id == modalID || e.target.id == "jogar-novamente"){
            modal.classList.remove('mostrar')
        }
    })
}

const jogarDeNovo = document.getElementById("jogar-novamente");
jogarDeNovo.addEventListener("click", () => {
    resetJogo()
})

