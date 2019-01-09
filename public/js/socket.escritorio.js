//FRONT END

var socket = io();

//obtenemos los parametros del URL
var searchParams = new URLSearchParams(window.location.search);

//ver si hay el parametro escritorio es .searchParams.has('escritorio')
if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es necesario')
    
}

var escritorio = searchParams.get('escritorio');
var label = $('small');


console.log(escritorio);
$('h1').text('Escritorio ' + escritorio)


$('button').on('click',function(){
    socket.emit('atenderTicket',{escritorio: escritorio},function(resp){
        if(resp==='No hay tickets'){
            label.text(resp);
            alert(resp);
            return ;
        }
        label.text('Ticket ' + resp.numero);

    })
    


});