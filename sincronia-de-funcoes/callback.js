/*
    ENTENDENDO O COMPORTAMENTO ASSÍNCRONO DO JAVASCRIPT
    Problema: Criar uma função que simule uma consulta a um 
    banco de dados. Implementar as funções obterUsuario, 
    obterTelefone (a partir do idUsuario) e obterEndereco
    (a partir do idUsuario).
    Conceitos: Callback  
*/

function obterUsuario() {
    setTimeout(() => {
        return {
            id: 1,
            nome: 'John Doe',
            dataNascimento: new Date()
        }
    }, 1000)
}

function obterTelefone(idUsuario) {
    setTimeout(() => {
        return {
            telefone: '12345678',
            ddd: 98
        }
    }, 2000)
}

function obterEndereco(idUsuario) {
    setTimeout(() => {
        return {
            numero: 33,
            endereco: 'Baker Street'
        }
    }, 3000)
}

const usuario = obterUsuario()
console.log("Usuário: ", usuario)

// Funções com o callback
// Nota 1: As funções de callback sempre são passadas como último
// parâmetro. E possuem basicamente 2 parâmetros: error, success, 
// respectivamente. 
function obterUsuarioNew(callback) {
    setTimeout(() => {
        return callback(null, {
            id: 1,
            nome: 'John Doe',
            dataNascimento: new Date()
        })
    }, 1000)
}

function obterTelefoneNew(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            telefone: '12345678',
            ddd: 98
        })
    }, 2000)
}

function obterEnderecoNew(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            numero: 33,
            endereco: 'Baker Street'
        })
    }, 3000)
}

/*
    As funções de callback seguem como no exemplo abaixo.
    Uma função com dois parâmetros: error (para capturarmos e 
    trazer a possibilidade de tratá-los) e success (que são os 
    dados que mostram que a função foi executada corretamente).
*/
function callbackUsuario(error, usuario) {
    console.log(usuario)
}

// NOVO USUÁRIO COM CALLBACK
const novoUsuario = obterUsuarioNew(function callbackUsuario(error, usuario){
    // null || "" || 0 == false
    if(error) {
        console.error("Error ao obterUsuario. Message: ", error)
        return;
    }
    obterTelefoneNew(usuario.id, function callbackTelefone(errorTel, telefone){
        
        if(errorTel) {
            console.error("Error ao obterTelefone. Message: ", error)
            return;
        }

        obterEnderecoNew(usuario.id, function callbackEnderecos(errorEnd, endereco){
         
            if(errorEnd) {
                console.error("Error ao obterEndereço. Message: ", error)
                return;
            }

            console.log(`
            Nome: ${usuario.nome}
            Endereço: ${endereco.endereco}, ${endereco.numero}
            Telefone: (${telefone.ddd}) ${telefone.telefone}
            `)
        })
    })
})