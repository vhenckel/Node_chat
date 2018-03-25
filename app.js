/* importar as configurações do servidor */
app = require('./config/server');

var server = app.listen(3000, function(){
	console.log('Servidor subiu');
});

var io = require('socket.io').listen(server);

// Declarando variável global
app.set('io', io);

/* criar conexão com websocket */
io.on('connection', function(socket){
	console.log('Usuário conectou');

	socket.on('disconnect', function(){
		console.log('Desconectou');
	});

	socket.on('msgParaServidor', function(data){

		socket.emit(
			'msgParaCliente', 
			{apelido: data.apelido, mensagem: data.mensagem}
		);

		socket.broadcast.emit(
			'msgParaCliente', 
			{apelido: data.apelido, mensagem: data.mensagem}
		);

		if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
			socket.emit(
				'participantesParaCliente', 
				{apelido: data.apelido}
			);

			socket.broadcast.emit(
				'participantesParaCliente', 
				{apelido: data.apelido}
			);
		}
	});
});