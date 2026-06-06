const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const counter = document.getElementById('task-counter');
const dateEl = document.getElementById('current-date');

// Data atual em português
const hoje = new Date();
dateEl.textContent = hoje.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'short'
});

function atualizarContador() {
    const pendentes = list.querySelectorAll('input[type="checkbox"]:not(:checked)').length;
    counter.textContent = pendentes;
}

function criarTarefa(texto) {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const label = document.createElement('label');
    label.textContent = texto;

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            label.classList.add('concluida');
        } else {
            label.classList.remove('concluida');
        }
        atualizarContador();
    });

    const btnDeletar = document.createElement('button');
    btnDeletar.classList.add('btn-deletar');
    btnDeletar.innerHTML = '<i class="ph-bold ph-trash"></i>';
    btnDeletar.setAttribute('aria-label', 'Deletar tarefa');

    btnDeletar.addEventListener('click', () => {
        li.remove();
        atualizarContador();
    });

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(btnDeletar);
    list.appendChild(li);

    atualizarContador();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const texto = input.value.trim();
    if (texto === '') return;
    criarTarefa(texto);
    input.value = '';
    input.focus();
});