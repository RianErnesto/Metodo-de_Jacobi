var body = document.getElementById("box")
var main = document.getElementById("principal")
var divEnt = document.getElementById("entr")
var matrix
var nextAprox
var previousAprox
var results
var quantity
var tolerancy
var checkCheck = true
var isConvergent = true
var decimal
var entrada

function print() {
    body.innerHTML = ""
    body.style.paddingTop = "20px"
    body.style.paddingBottom = "10px"
    body.style.borderTop = "2px solid black"
    body.style.marginTop = "20px"
    for(var i = 0; i < quantity; i++){
        for(var j = 0; j < quantity; j++){
            body.innerHTML += "<label>Coeficiente <b>" + (j+1) + "</b> da Equação <b>" + (i+1) + "</b>:<input type='number' class='coeficientes'> </label><br>"
        }
        body.innerHTML += "<br>"
    }
    body.innerHTML += "<br>"
    for(var i = 0; i < quantity; i++){
        body.innerHTML += "<label>Resultado da Equação<b> " + (i+1) + "</b>:<input type='number' class='r'> </label><br>"
    }

    body.innerHTML += "<button id='confirmarIncognitas' onclick=pegarIncognitas()>Confirmar</button><br>"
    body.innerHTML += "<p>Tolerância = " + tolerancy + "</p>"
}

function pegarIncognitas() {
    let c = document.querySelectorAll(".coeficientes")
    let res = document.querySelectorAll(".r")

    results = new Array(quantity)
    matrix = new Array(quantity)

    body.innerHTML = ""
    
    //Resultados das Equações
    for(var i = 0; i < quantity; i++){
        results[i] = res[i].value
    }

    //Criando a Matriz e Recebendo os Valores
    for(var i = 0; i < quantity; i++){
        matrix[i] = new Array(quantity)
    }
    var count = 0
    for(var i = 0; i < quantity; i++){
        for(var j = 0; j < quantity; j++, count++){
            matrix[i][j] = c[count].value
        }        
    }

    //Chamando a Função de Exibir Matriz
    exibirMatriz()
    //Checando a Convergência Tanto de Linha quanto de Coluna
    ifConvergent(checarConvergenciaLinha(), checarConvergenciaColuna())
}

function criarInput() {
    quantity = document.getElementById("incognita").value
    if(quantity < 0 || quantity == "") quantity = 0

    //Criando a matriz de aproximação
    nextAprox = new Array(quantity)
    previousAprox = new Array(quantity)

    tolerancy = document.getElementById("tolerancia").value
    if(tolerancy == "") tolerancy = 0

    decimal = document.getElementById("decimal").value
    if(decimal == "" || decimal < 0) decimal = 0

    entrada = document.getElementById("entrada").checked
    
    body.innerHTML = ""
    divEnt.innerHTML = ""

    if(!entrada){
        body.style.paddingTop = "20px"
        body.style.paddingBottom = "10px"
        body.style.borderTop = "2px solid black"
        body.style.marginTop = "20px"
        divEnt.style.borderTop = "none"
        divEnt.style.marginTop = "none"
        for(var i = 0; i < quantity; i++){
            previousAprox[i] = 0
        }

        print()
    }

    else {
        divEnt.style.paddingTop = "20px"
        divEnt.style.paddingBottom = "10px"
        divEnt.style.borderTop = "2px solid black"
        divEnt.style.marginTop = "20px"
        body.style.borderTop = "none"
        body.style.marginTop = "none"
        for(var i = 0; i < quantity; i++){
            divEnt.innerHTML += "<label>Entrada <b>" + (i+1) + "</b>: <input type='number' class='e'> </label> <br>"
        }

        divEnt.innerHTML += "<button id='confirmarEntrada' onclick='pegarEntrada()'>Confirmar</button><br> <br>"
    }
}

function pegarEntrada() {
    let ent = document.querySelectorAll(".e")
    for(var i = 0; i < quantity; i++){
        previousAprox[i] = ent[i].value
    }

    print()
}

function checarConvergenciaLinha(){
    isConvergent = true
    for(var i = 0; i < quantity; i++){
        let sum = 0
        for(var j = 0; j < quantity; j++){
            if(i == j) continue
            else sum = sum + Math.abs(matrix[i][j])
        }
        if(sum >= Math.abs(matrix[i][i])){
            // body.innerHTML += "<label>O método não é convergente porque a linha " + (i+1) + " não atende a condição</p>"
            isConvergent = false
            break
        }
        else continue
    }
    return isConvergent
}

function checarConvergenciaColuna(){
    isConvergent = true
    for(var i = 0; i < quantity; i++){
        let sum = 0
        for(var j = 0; j < quantity; j++){
            if(i == j) continue
            else sum = sum + Math.abs(matrix[j][i])
        }
        if(sum >= Math.abs(matrix[i][i])){
            // body.innerHTML += "<label>O método não é convergente porque a coluna " + (i+1) + " não atende a condição</p>"
            isConvergent = false
            break
        }
        else continue
    }
    return isConvergent
}

//Exibindo a matriz
function exibirMatriz() {
    body.innerHTML +=  "<p>MATRIZ</p>"
    body.innerHTML += "<p>"
    for(var i = 0; i < quantity; i++){
        for(var j = 0; j < quantity; j++){
            body.innerHTML += matrix[i][j] + "   "
        }
        body.innerHTML += "<br>"
    }
    body.innerHTML += "</p>"
}

function calc(){
    for(var i = 0; i < quantity; i++){
        let sum = 0
        sum = sum + Number(results[i])
        for(var j = 0; j < quantity; j++){
            if(i==j) continue
            else sum = sum - matrix[i][j] * previousAprox[j]
        }
        sum = sum / matrix[i][i]
        sum = parseFloat(sum.toFixed(decimal))
        nextAprox[i] = sum
    }
}

function running(){
    let l = 0
        while(true){
            l++
            calc()
            if(check()){
                body.innerHTML += "<p>x" + l + " = (" + nextAprox + ")</p>"
                continue
            }
            else{
                body.innerHTML += "</p>A Solução da Equação Linear é:<br> x" + l + " = (" + nextAprox + ")</p>"
                break
            }
        }
}

function ifConvergent(checarLinha, checarColuna){
    //Convergente
    if(checarLinha){
        running()
    }

    else if(checarColuna){
        running()
    }

    //Não convergente
    else body.innerHTML += "<label>O método não é convergente, por isso é impossível realizar o cálculo</label>"
}

//Função para checar se as iterações são maiores que a tolerância
function check(){
    for(var i = 0; i < quantity; i++){
        if(Math.abs(nextAprox[i] - previousAprox[i]) > tolerancy) checkCheck = false
        else continue
    }

    if(!checkCheck){
        for(var l = 0; l < quantity; l++){
            previousAprox[l] = nextAprox[l]
        }
        checkCheck = true
        return true
    }
    else return false
}