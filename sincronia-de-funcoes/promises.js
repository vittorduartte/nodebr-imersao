/*
    ENTENDENDO O COMPORTAMENTO ASSÍNCRONO DO JAVASCRIPT
    Problema: Criar uma função que simule uma consulta a um 
    banco de dados. Implementar as funções obterUsuario, 
    obterTelefone (a partir do idUsuario) e obterEndereco
    (a partir do idUsuario).
    Conceitos: Promisses  
*/

/*
    Nessa etapa iremos resolver o mesmo problema do callback,
    com a diferença que vamos aplicar o conceito de promisses.
*/

function obterUsuario() {
    // Instanciando um novo objeto Promise.
    // Mas até aqui não manipulamos o nossa Promise, só estamos
    // retornando ela para manipulação.
    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(() => {
            // Simulando um erro para verificar o retorno na
            // manipulação da Promise.
            // return reject(new Error("Erro na promise!"))

            return resolve({
                id: 1,
                nome: 'John Doe',
                dataNascimento: new Date()
            })
        }, 1000)
    })
}

function obterTelefone(idUsuario) {
    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(() => {
            return resolve({
                telefone: '12345678',
                ddd: 98
            })
        }, 2000)
    })
}

/*
    Existe um módulo interno do Node, chamado util, 
    que nos auxilia na conversão de uma função modelada 
    com callback para uma promise. Porém depende muito de
    como ocorre o tratamento dos erros desses callbacks pois
    pode gerar comportamentos inesperados.
*/
const util = require('util')
const obterEnderecoConverted = util.promisify(obterEndereco)

function obterEndereco(idUsuario, callback) { 
    setTimeout(() => {
        return callback(null, {
            numero: 33,
            endereco: 'Baker Street'
        })
    }, 3000)
}

const usuarioPromise = obterUsuario()
usuarioPromise
    .then(function (usuario){
        return obterTelefone(usuario.id)
            .then(function resolverTelefone(resultado) {
                return {
                    usuario: {
                        nome: usuario.nome,
                        id: usuario.id
                    },
                    telefone: resultado
                }
            })
    })
    .then(function (usuarioComTelefone){
        const endereco = obterEnderecoConverted(usuarioComTelefone.usuario.id)
        return endereco
            .then(function resolverEndereco(resultado){
                return {
                    ...usuarioComTelefone,
                    endereco: resultado
                }
            })
    })
    .then(function (usuario){ 
        console.log(`
        Nome: ${usuario.usuario.nome}
        Endereço: ${usuario.endereco.endereco}, ${usuario.endereco.numero}
        Telefone: (${usuario.telefone.ddd}) ${usuario.telefone.telefone}
        `)
    })
    .catch(function (error) {
        console.log("Reject usuarioPromise: ", error)
    })
