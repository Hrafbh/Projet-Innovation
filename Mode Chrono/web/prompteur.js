const url = "ws://localhost:4040/myWebsocket"
const mywsServer = new WebSocket(url)


let heures = 0;
let minutes = 0;
let secondes = 0;

let timeout;

let estArrete = true;



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




mywsServer.onmessage = function(event) {
    message = JSON.parse(event.data) 
    console.log(message)

    switch (message.typemessage){

        case "Démarrer défilement":
           
            if (estArrete) {
                estArrete = false;
                defilerTemps();
                
              }
            break

        case "Arreter défilement":
            
            if (!estArrete) {
                estArrete = true;
                clearTimeout(timeout);
                
              }
            break
        
        case "Remettre à zéro":
          
            document.getElementById("chronoo").textContent = "00:00:00";
            estArrete = true;
            heures = 0;
            minutes = 0;
            secondes = 0;
            clearTimeout(timeout);
            window.scrollTo(0,0)
          

            break
        

            
    }
}


  

