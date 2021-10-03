/*
    ENTENDENDO O COMPORTAMENTO ASSÍNCRONO DO JAVASCRIPT
    Problema: Criar uma função que simule uma consulta a um 
    banco de dados. Implementar as funções obterUsuario, 
    obterTelefone (a partir do idUsuario) e obterEndereco
    (a partir do idUsuario).
    Conceitos: Async-Await  
*/

function obterUsuario() {
    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(() => {
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

function obterEndereco(idUsuario) {
    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(() => {
            return resolve({
                numero: 33,
                endereco: 'Baker Street'
            })
        }, 3000)
    })
}


/*
    Ao invés de encadear vários .then para resolver promise uma a uma,
    podemos utilizar da palavra reservada Async antes da assinatura da função
    principal que automaticamente converterá a função em promise.
    O melhor desse método é que utilizando a palavra reservada Await, podemos
    aninhar outras promises, dentro da função principal, que serão resolvidas 
    de maneira simplificada, sem a necessidade de aninhar vários .then. 
    Veja o exemplo: 
*/
main()
async function main() {
    // Como não utilizaremos a função .then não poderemos utilizar do .catch
    // para capturar os erros, o que nos força a capturamos da maneira genérica
    // com try/catch.
    try {
        // PROBLEMA ⚠️
        // Dessa maneira vamos esperar a resolução das promises
        // uma a uma, o que significa esperar todos os timeouts.
        // A ideia é que funções executadas de maneira indepente
        // não necessitem esperar a execução de funções anteriores.
        console.time('Medida-Nao-Otimizada')
        const usuario = await obterUsuario()
        const telefone = await obterTelefone(usuario.id)
        const endereco = await obterEndereco(usuario.id)

        console.log(`
        Nome: ${usuario.nome}
        Endereço: ${endereco.endereco}, ${endereco.numero}
        Telefone: (${telefone.ddd}) ${telefone.telefone}
        `)
        console.timeEnd('Medida-Nao-Otimizada')

        // SOLUÇÃO ✅
        // Para contornar esse problema podemos utilizar do método
        // all do objeto Promise. O qual vai resolver as promises de
        // maneira indepentende.
        console.time('Medida-Otimizada')
        const usuarioOtimizado = await obterUsuario()
        const telefoneAndEndereco = await Promise.all([
            obterTelefone(usuario.id),
            obterEndereco(usuario.id)
        ])
        
        const telefoneOtimizado = telefoneAndEndereco[0]
        const enderecoOtimizado = telefoneAndEndereco[1]

        console.log(`
        Nome: ${usuarioOtimizado.nome}
        Endereço: ${enderecoOtimizado.endereco}, ${enderecoOtimizado.numero}
        Telefone: (${telefoneOtimizado.ddd}) ${telefoneOtimizado.telefone}
        `)
        console.timeEnd('Medida-Otimizada')

    }
    catch (error) {
        console.error("Error função main: ", error)
    }
}