//FRONT END
//comando para establecer la conexion
var socket = io();

//la variable label tiene una referencia directa al elemnto html lbNuevo Ticket
var label = $('#lblNuevoTicket')


socket.on('connect',function(){
    console.log('Servidor conectado');
});

socket.on('disconnect',function(){
    console.log('Servidor desconectado');
});



socket.on('estadoActual',function(resp){
    label.text(resp.actual);
    console.log(resp);
})



$('button').on('click',function(){
    socket.emit('siguienteTicket',null,function(siguienteTicket){
        label.text(siguienteTicket)
    });
});