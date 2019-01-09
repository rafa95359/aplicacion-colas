//BACKEND


const { io } = require('../server');

const {TicketControl} = require('../classes/ticket-control');


const ticketControl = new TicketControl();

io.on('connection', (client) => {

    //console.log('Usuario conectado');    
    //client.on('disconnect', () => {
    //       console.log('Usuario desconectado');
    //});
    
    client.on('siguienteTicket',(data,callback)=>{
        let siguiente = ticketControl.siguiente();

        console.log('Cual es el siguiente ticket');
        console.log(siguiente);
        callback(siguiente)
    });


    //emitir un evento 'EstadoActual'
    client.emit('estadoActual',
        {  
            actual: ticketControl.getUltimoTicket(),
            ultimos4: ticketControl.getUltimos4(),            
        }

    );
    
   


    client.on('atenderTicket',(data,callback)=>{
        if(!data.escritorio){
            return callback({
                err:true,
                mensaje:'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        
        callback(atenderTicket);

        //actualizar notificar en los ultimos4
        client.broadcast.emit('ultimos4',{
            ultimos4: ticketControl.getUltimos4()
        })
    });
   
    
});