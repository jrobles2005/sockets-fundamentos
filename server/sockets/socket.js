const { io } = require('../server');

io.on('connection', (client) => {
    console.log('usuario conectado');

    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido !!!!'
    });

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
    //Escuchar cliente con envio de confirmacion
    client.on('enviarMensaje', (data, callback) => {
        console.log(data);
        /* 
        if (data.usuario) {
            callback({
                resp: 'Todo salio bien!'
            });
        } else {
            callback({
                resp: 'Todo salio mal!!!!'
            });
        } */

        //reenvio el mensaje recibido de un cliente
        //a todos los demas
        client.broadcast.emit('enviarMensaje', data);

    });
});