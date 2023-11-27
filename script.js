// Classes e Herenças
class Funcionario {
    constructor(nome, idade, cargo) {
        this.nome = nome;
        this.idade = idade;
        this.cargo = cargo;
    }
    
    get seApresentar() {
        var apresentacao = document.querySelector('div#resultado')
        apresentacao.innerHTML += `<h3>${this.nome}</h3>
        ${this.nome} possui <strong>${this.idade}</strong> anos e é <strong>${this.cargo}</strong>`    
    }
    
    get trabalhar(){
        console.log(`${this.nome} está trabalhando`)
    }
}

class Gerente extends Funcionario {
    constructor(nome, idade, cargo, departamento){
        super(nome,idade,cargo);
        this.departamento = departamento;
    }
    
    get gerenciar() {
        var program = document.querySelector('div#resultado')
        program.innerHTML += ` do departamento de <strong>${this.departamento}</strong> <hr>`  
    }
}

class Desenvolvedor extends Funcionario {
    constructor(nome, idade, cargo, linguagem) {
        super(nome, idade, cargo);
        this.linguagem = linguagem;
    }
    
    get programar() {
        var program = document.querySelector('div#resultado')
        program.innerHTML += `<strong>(a)</strong> em linguagem <strong>${this.linguagem}</strong> <hr>`  
    }

}

// Seleção de tipo de funcionário
function exibeOpcoes() {

    if(document.getElementById('gerente').checked) {
        var departamento = document.getElementById('departamento')
        departamento.style.display = 'block';
        document.getElementById('linguagem').style.display = 'none';
    } else {
    var linguagem = document.getElementById('linguagem')
    document.getElementById('departamento').style.display = 'none';
    linguagem.style.display = 'block';
    }

}

// Função de Erro
function exibirErro(nomeInput, idadeInput, dptoInput,lingInput) {

    if(!nomeInput || !idadeInput || !dptoInput && !lingInput) {
        throw new Error('Por favor, preencha <strong>todos</strong> os campos')
    }

    if(idadeInput < 14 || idadeInput > 120) {
        throw new Error('Por favor, preencha uma <strong>idade</strong> válida')
    }

    if(nomeInput.length < 3) {
        throw new Error('Por favor, preencha um <strong>nome</strong> válido')
    }

    return
}



// Cadastro
function cadastrar() {
const nomeInput = document.getElementById('nome').value;
const idadeInput = document.getElementById('idade').value;
const cargoInput = document.querySelector('input[name="tipoFuncionario"]:checked').value
const dptoInput = document.querySelector('input.dpto').value
const lingInput = document.querySelector('input.ling').value
var pegarErro = document.querySelector('span#erro')
var adicionarSpan = document.createElement('span')

try {
    exibirErro(nomeInput, idadeInput, dptoInput,lingInput)
        if(cargoInput == 'Gerente'){
            const gerente = new Gerente (nomeInput,idadeInput,cargoInput,dptoInput)
            adicionarSpan.innerHTML = `${gerente.seApresentar}<br>
            ${gerente.gerenciar}
            `
        } else {
            const desenvolvedor = new Desenvolvedor (nomeInput,idadeInput,cargoInput,lingInput)
            adicionarSpan.innerHTML = `${desenvolvedor.seApresentar}<br>
            ${desenvolvedor.programar}
            `
        }

        pegarErro.innerHTML = '<strong>Funcionário cadastrado com Sucesso</strong>'
        pegarErro.style.color = 'green'

    } catch(error) {
        pegarErro.innerHTML = error.message
        pegarErro.style.color = 'red'
        error.preventDefault()
    }
        //Limpa dados
        document.getElementById('nome').value = ''
        document.getElementById('idade').value = ''
        document.querySelector('input.dpto').value = ''
        document.querySelector('input.ling').value = ''
}