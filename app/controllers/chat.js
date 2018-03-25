module.exports.iniciaChat = function(application, req, res){

	var dadosForm = req.body;

	req.assert('apelido', 'Nome/apelido é obrigatório').notEmpty();
	req.assert('apelido', 'Nome/apelido deve conter entre 3 e 15 caracteres').len(3, 15);
	var erros = req.validationErrors();

	if (erros) {
		res.render('index', {validacao: erros});
		return;
	}

	// recuperando a variável global
	application.get('io').emit(
		'msgParaCliente',
		{apelido: dadosForm.apelido, mensagem: 'Acabou de entrar no chat'}
	);

	res.render('chat', {dadosForm: dadosForm});
}