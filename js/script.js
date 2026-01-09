console.log("JavaScript conectado");

const form = document.getElementById("form-compromisso");
const lista = document.getElementById("lista-compromissos");
const emptyState = document.getElementById("empty-state");

let compromissos = [];
let indiceEditando = null;


form.addEventListener("submit", function (event) {
  event.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const data = document.getElementById("data").value;
  const hora = document.getElementById("hora").value;

  const compromisso = {
    titulo,
    data,
    hora,
    concluido: false
  };

if (indiceEditando === null) {
  // criando novo
  compromissos.push(compromisso);
} else {
  // editando existente
  compromissos[indiceEditando] = compromisso;
  indiceEditando = null;
  form.querySelector("button").textContent = "Adicionar";
}

salvarNoLocalStorage();
renderizarCompromissos();
form.reset();


});

function renderizarCompromissos() {
  lista.innerHTML = "";

  compromissos.forEach(function (compromisso, index) {
    const li = document.createElement("li");

    if (compromisso.concluido) {
  li.classList.add("concluido");
}


    const texto = document.createElement("div");
texto.classList.add("texto-compromisso");

const titulo = document.createElement("strong");
titulo.textContent = compromisso.titulo;

const dataHora = document.createElement("span");
dataHora.textContent = `${compromisso.data} • ${compromisso.hora}`;

texto.appendChild(titulo);
texto.appendChild(dataHora);

    if (compromisso.concluido) {
      
    }

    texto.addEventListener("click", function () {
      compromisso.concluido = !compromisso.concluido;
      salvarNoLocalStorage();
      renderizarCompromissos();

    });

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";

    botaoExcluir.addEventListener("click", function () {
      compromissos.splice(index, 1);
      salvarNoLocalStorage();
      renderizarCompromissos();
    });
    
    const botaoEditar = document.createElement("button");
botaoEditar.textContent = "Editar";

botaoEditar.addEventListener("click", function () {
  document.querySelector(".form-container").classList.add("editando");
  document.getElementById("titulo").value = compromisso.titulo;
  document.getElementById("data").value = compromisso.data;
  document.getElementById("hora").value = compromisso.hora;

  indiceEditando = index;
  document.querySelector(".form-container").classList.remove("editando");
  form.querySelector("button").textContent = "Salvar edição";
});
  
  
    li.appendChild(texto);
    li.appendChild(botaoEditar);
    li.appendChild(botaoExcluir);
    

    lista.appendChild(li);
    atualizarEmptyState();

    
  });
}

function atualizarEmptyState() {
  if (lista.children.length === 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
  }
}


function salvarNoLocalStorage() {
  localStorage.setItem("compromissos", JSON.stringify(compromissos));
}
function carregarDoLocalStorage() {
  const dados = localStorage.getItem("compromissos");

  if (dados) {
    compromissos = JSON.parse(dados);
    renderizarCompromissos();
  }
}

carregarDoLocalStorage();

atualizarEmptyState();


