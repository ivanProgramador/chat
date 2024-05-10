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
        //o io é um servidor entãoi ele recebe o evento mensagem de forma geral 
        // assim acda pessoa que entrar na aplicação vai ter seu porprio objeto 
        // de usuário e mensagem assim todos podem se comeunicar entra si dentro da aplicação 
        //porque todos podem ver as mensagens e podem enviar também

        io.emit('showMsg',data);

        console.log(data);

    })


    
});




http.listen(3000,()=>{
    console.log("App online");
})