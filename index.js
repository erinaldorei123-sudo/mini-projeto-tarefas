function abrirModal() {
    overlay.classList.add("active");
    criarTarefa.classList.add("active");
}

function fecharModal() {
    overlay.classList.remove("active");
    criarTarefa.classList.remove("active");
}

function buscarTarefas() {
    fetch("http://localhost:3000/tarefas")
        .then(res => res.json())
        .then(res => {
            inserirTarefas(res);
        });
}

buscarTarefas();

function inserirTarefas(listaDeTarefas) {
    if (listaDeTarefas.length > 0) {
        lista.innerHTML = "";
        listaDeTarefas.map(tarefa => {
            lista.innerHTML += `
                <li>
                    <div>
                        <h5>${tarefa.titulo}</h5>
                        <p>${tarefa.descricao}</p>
                    </div>
                    <div class="acoes">
                        <box-icon name='trash' size="sm" onclick="deletarTarefa(${tarefa.id})"></box-icon>
                    </div>
                </li>
            `;
        });
    } else {
        lista.innerHTML = "<h6>Nenhuma tarefa registrada</h6>";
    }
}

function novaTarefa(event) {
    event.preventDefault();

    let tarefa = {
        titulo: titulo.value,
        descricao: descricao.value
    };

    fetch("http://localhost:3000/tarefas", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(tarefa)
    })
    .then(res => res.json())
    .then(() => {
        fecharModal();
        buscarTarefas();
        let form = document.querySelector("#criarTarefa form");
        form.reset();
    });
}

function deletarTarefa(id) {
    fetch(`http://localhost:3000/tarefas/${id}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(() => {
        buscarTarefas();
    });
}

function pesquisarTarefas() {
    let lis = document.querySelectorAll("ul li");
    let termo = busca.value.toLowerCase();

    if (termo.length > 0) {
        lis.forEach(li => {
            let tituloTarefa = li.children[0].children[0].innerText.toLowerCase();
            if (!tituloTarefa.includes(termo)) {
                li.classList.add("oculto");
            } else {
                li.classList.remove("oculto");
            }
        });
    } else {
        lis.forEach(li => {
            li.classList.remove("oculto");
        });
    }
}