var express = require("express");
var app = express();
/*
com socket.io não e possivel usar o servidor do express 
precisa ser o servidor nativo de node por isso a blioteca http
esta criando o serviddor ao inves da express
*/
var http = require("http").createServer(app); 
var io = require("socket.io")(http);


app.set("view engine","ejs");

            app.get("/",(req,res)=>{
                res.render("index");
            });




io.on("connection", (socket)=>{

    
    socket.on("disconnect",()=>{

        console.log('Se desconectou: '+ socket.id);

    });

    

    socket.on('msg',(data)=>{

        socket.emit('showMsg',data);

        console.log(data);

    })


    
});




http.listen(3000,()=>{
    console.log("App online");
})