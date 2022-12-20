const url = "ws://localhost:4040/myWebsocket"
const mywsServer = new WebSocket(url)



let chrono = document.getElementById("chrono");
let resetBtn = document.getElementById("remettreazero");
let stopBtn = document.getElementById("arreterdefilement");
let startBtn = document.getElementById("demarrerdefilement");

let heures = 0;
let minutes = 0;
let secondes = 0;

let timeout;

let estArrete = true;



const boutonDemarrer = document.getElementById("demarrerdefilement")

boutonDemarrer.addEventListener("click",demarrer = () =>{
    if (estArrete) {
        estArrete = false;
        defilerTemps();
      }
    mywsServer.send( JSON.stringify({
        typemessage: "Démarrer défilement",
        contenu: ""
    }))
}, false)

const boutonArreter = document.getElementById("arreterdefilement")

boutonArreter.addEventListener("click", arreter = () =>{
    if (!estArrete) {
        estArrete = true;
        clearTimeout(timeout);
      }
    mywsServer.send( JSON.stringify({
        typemessage: "Arreter défilement",
        contenu: ""
    }))
}, false)

const boutonRemettreazero = document.getElementById("remettreazero")

boutonRemettreazero.addEventListener("click",reset = () =>{
    chrono.textContent = "00:00:00";
    estArrete = true;
    heures = 0;
    minutes = 0;
    secondes = 0;
    clearTimeout(timeout);
    mywsServer.send( JSON.stringify({
        typemessage: "Remettre à zéro",
        contenu: ""
    }))
}, false)




mywsServer.onopen = function() {
      console.log("OK")
}


const defilerTemps = () => {
    if (estArrete) return;
  
    secondes = parseInt(secondes);
    minutes = parseInt(minutes);
    heures = parseInt(heures);
  
    secondes++;
  
    if (secondes == 60) {
      minutes++;
      secondes = 0;
    }
  
    if (minutes == 60) {
      heures++;
      minutes = 0;
    }
  
    //   affichage
    if (secondes < 10) {
      secondes = "0" + secondes;
    }
  
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
  
    if (heures < 10) {
      heures = "0" + heures;
    }
  
    chrono.textContent = `${heures}:${minutes}:${secondes}`;
  
    timeout = setTimeout(defilerTemps, 1000);
};
  

  
startBtn.addEventListener("click", demarrer);
stopBtn.addEventListener("click", arreter);
resetBtn.addEventListener("click", reset);