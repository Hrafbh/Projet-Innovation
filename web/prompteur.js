const url = "ws://localhost:8080/myWebsocket"
const mywsServer = new WebSocket(url)

const affichageTexte = document.getElementById("affichagetexte")

var vitesseDefilement = 100
var defilementActif = false





let heures = 0;
let minutes = 0;
let secondes = 0;

let timeout;

let estArrete = true;

let defileurTexte ;


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

    document.getElementById("chronoo").textContent = `${heures}:${minutes}:${secondes}`;

    
  
    timeout = setTimeout(defilerTemps, 1000);
};

const defilerTexte = () =>{
  defileurTexte=setInterval(function(){
    window.scrollBy(0,1)
  },vitesseDefilement)
}
const stopdefiler = () =>{
  clearInterval(defileurTexte)
}


mywsServer.onmessage = function(event) {
    message = JSON.parse(event.data) 
    console.log(message)

    switch (message.typemessage){
        case "texte":
            affichageTexte.innerText = message.contenu
            break

        case "changement taille":
            affichageTexte.style.fontSize = message.contenu + "px"
            break
        
        case "Démarrer défilement":
            defilementActif = true
            if (estArrete) {
                estArrete = false;
                defilerTemps();
                defilerTexte();
              }
            break

        case "Arreter défilement":
            defilementActif = false
            if (!estArrete) {
                estArrete = true;
                clearTimeout(timeout);
                clearInterval(defileurTexte);
              }
            
            
            break
        
        case "Remettre à zéro":
            defilementActif = false
            document.getElementById("chronoo").textContent = "00:00:00";
            estArrete = true;
            heures = 0;
            minutes = 0;
            secondes = 0;
            clearTimeout(timeout);
            window.scrollTo(0,0)
            clearInterval(defileurTexte)

            break
        
        case "changement vitesse":
            vitesseDefilement = message.contenu
            if (defilementActif){
                clearInterval(defileurTexte)
                defileurTexte = setInterval(function(){
                    window.scrollBy(0,1)
                },vitesseDefilement)
                
            }
            break
            
    }
}


  

