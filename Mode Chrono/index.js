const WebSocket = require("ws");
const express = require("express");
const app = express()
const path = require("path")

app.use(express.static( __dirname + "/web"))
//app.use("/",express.static(path.resolve(__dirname, "../client")))
const myServer = app.listen(4040)       

const wsServer = new WebSocket.Server({
    noServer: true
})                                      

wsServer.on("connection", function(ws) {    
    ws.on("message", function(msg) {       
        wsServer.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {     
              client.send(msg.toString());
            }
        })
    })
})

myServer.on('upgrade', async function upgrade(request, socket, head) {      
        
    wsServer.handleUpgrade(request, socket, head, function done(ws) {
      wsServer.emit('connection', ws, request);
    });
});
