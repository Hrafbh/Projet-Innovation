const url = "ws://localhost:6060/myWebsocket"
const mywsServer = new WebSocket(url)

const affichageTexte = document.getElementById("affichagetexte")

var vitesseDefilement = 100
var defilementActif = false


let estArrete = true;

let defileurTexte ;


mywsServer.onopen = function() {
      console.log("OK")
}



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
                defilerTexte();
              }
            break

        case "Arreter défilement":
            defilementActif = false
            if (!estArrete) {
                estArrete = true;
                clearInterval(defileurTexte);
              }
            break
        
        case "Remettre à zéro":
            defilementActif = false
            estArrete = true;
            window.scrollTo(0,0);
            stopdefiler();

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


  

