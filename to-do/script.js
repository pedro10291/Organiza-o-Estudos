const localStorageKey = "Estudos de Pedro";

function newTask() {
  let input = document.getElementById("input-new-task");
  let newTaskName = input.value.trim(); // Remove espaços em branco no início e fim

  if (!newTaskName) {
    alert("Digite algo para inserir");
    return; // Sai da função se o input estiver vazio
  }

  let tasks = JSON.parse(localStorage.getItem(localStorageKey)) ?? [];

  // Verifica se já existe uma tarefa com o mesmo nome
  let taskExists = tasks.some(
    (task) => task.name.toLowerCase() === newTaskName.toLowerCase()
  );

  if (taskExists) {
    alert("Essa tarefa já existe na lista!");
  } else {
    tasks.push({
      name: newTaskName,
    });
    localStorage.setItem(localStorageKey, JSON.stringify(tasks));
    showValues();
  }

  input.value = ""; // Limpa o campo de input após adicionar a tarefa
}

function showValues() {
  let tasks = JSON.parse(localStorage.getItem(localStorageKey)) ?? [];
  let list = document.getElementById("to-do-list");
  list.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    list.innerHTML += `<li>${tasks[i]["name"]} <button onclick="removeTask(${i})" id="btn-check"><i class="bi bi-check-circle-fill"></i></button></li>`;
  }
}

function removeTask(index) {
  let tasks = JSON.parse(localStorage.getItem(localStorageKey)) ?? [];
  tasks.splice(index, 1);
  localStorage.setItem(localStorageKey, JSON.stringify(tasks));
  showValues();
}

// Chama showValues() inicialmente para exibir as tarefas ao carregar a página
showValues();