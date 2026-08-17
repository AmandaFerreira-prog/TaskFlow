let tarefas=[];

//Persistência de Dados inicial, pegando dados salvos.
const tarefasSalvas = localStorage.getItem("tarefas");
if(tarefasSalvas!==null){
    tarefas = JSON.parse(tarefasSalvas);
}

const inputNome=document.getElementById("nomeTarefa");
const selectCategoria=document.getElementById("categoria");
const selectPrioridade=document.getElementById("prioridade");
const inputData=document.getElementById("data");
const selectStatus=document.getElementById("status");
const botaoAdicionar=document.getElementById("btnAdicionar");
const listaTarefas = document.getElementById("tarefas");
let idTarefaEditada = null;


function mostrarTarefaNaTela(tarefa){
    const elementoTarefa = document.createElement("li");
    elementoTarefa.innerHTML = `
                        <div>
                        <strong>Tarefa:</strong> <span>${tarefa.nome}</span> 
                        </div> 

                        <div>
                        <strong>Categoria:</strong> <span>${tarefa.categoria}</span>
                        </div>

                        <div>
                        <strong>Prioridade:</strong> <span>${tarefa.prioridade}</span>
                        </div>

                        <div>
                        <strong>Data:</strong> <span>${tarefa.data}</span>
                        </div>

                        <div>
                        <strong>Status:</strong> <span>${tarefa.status}</span>
                        </div>
                        `
    const divAcoes = criarAçoesDaTarefa(tarefa);
    elementoTarefa.append(divAcoes);

    listaTarefas.appendChild(elementoTarefa);
};

function criarAçoesDaTarefa(tarefa){
    const botaoExcluir = document.createElement("button");
    botaoExcluir.classList.add("btnExcluir");

    const botaoEditar = document.createElement("button");
    botaoEditar.classList.add("btnEditar");

    const botaoConcluir = document.createElement("button");
    botaoConcluir.classList.add("btnConcluir");

    botaoExcluir.textContent = "Excluir";
    botaoEditar.textContent = "Editar";
    botaoConcluir.textContent = "Concluir";

    botaoExcluir.addEventListener("click", function(){
        for(let i=0;i<tarefas.length;i++){
            if(tarefas[i].id === tarefa.id){
                tarefas.splice(i,1);
                atualizarTela();
                return
            }
        }
    });


    botaoConcluir.addEventListener("click", function(){
        for(let i=0;i<tarefas.length;i++){
            if(tarefas[i].id === tarefa.id){
                if(tarefa.status !== "Concluida"){
                    tarefa.status = "Concluida";
                }
                atualizarTela();
                return
            }
        }
    });

    
    botaoEditar.addEventListener("click", function(){
        document.querySelector(".cadastro").scrollIntoView();

        for(let i=0;i<tarefas.length;i++){
            if(tarefas[i].id === tarefa.id){

                idTarefaEditada = tarefa.id;

                inputNome.value = tarefa.nome;
                selectCategoria.value = tarefa.categoria;
                selectPrioridade.value=tarefa.prioridade;
                inputData.value=tarefa.data;
                selectStatus.value=tarefa.status;

                botaoAdicionar.textContent = "Salvar Alterações"
                
                return
            }
        }
    });

    const divAcoes = document.createElement("div");
    divAcoes.classList.add("divAcoes");
    
    divAcoes.append(botaoExcluir);
    divAcoes.append(botaoConcluir);
    divAcoes.append(botaoEditar);

    return divAcoes;
}

function atualizarTela(){
    listaTarefas.innerHTML="";
    for(let i=0;i<tarefas.length;i++){
        mostrarTarefaNaTela(tarefas[i]);
    }
    localStorage.setItem("tarefas", JSON.stringify(tarefas));

};

atualizarTela();

function gerarProximoId(){
    //-1 pois se for no inicio , se cria um ID igual a 0.
    let maiorID = -1;

    for(let i = 0; i < tarefas.length; i++){
        if(tarefas[i].id > maiorID){
            maiorID = tarefas[i].id;
        }
    }

    return maiorID + 1;
};

function criarTarefa(){
    const tarefa = {};
    tarefa.id = gerarProximoId();
    tarefa.nome = inputNome.value;
    tarefa.categoria = selectCategoria.value;
    tarefa.prioridade = selectPrioridade.value;
    tarefa.data = inputData.value;
    tarefa.status = selectStatus.value;

    return tarefa;
};

botaoAdicionar.addEventListener("click", function(){
if(inputNome.value ===""){
    alert("Preencha o campo Nome da Tarefa");
    return
}
if(inputData.value === ""){
    alert("Escolha uma data!");
    return
}

if(idTarefaEditada!== null){
    for(let i=0;i<tarefas.length;i++){
        if(tarefas[i].id === idTarefaEditada){
            tarefas[i].nome = inputNome.value;
            tarefas[i].categoria = selectCategoria.value;
            tarefas[i].prioridade = selectPrioridade.value;
            tarefas[i].data = inputData.value;
            tarefas[i].status = selectStatus.value;

            atualizarTela();

            inputData.value="";
            inputNome.value="";

            idTarefaEditada = null;
            botaoAdicionar.textContent = "Adicionar Tarefa";
            return
}}}

const tarefa = criarTarefa();
tarefas.push(tarefa);
atualizarTela();

inputData.value="";
inputNome.value="";


});