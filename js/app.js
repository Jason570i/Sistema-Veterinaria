//Variables
let pacientes = [];
let contadorId = 1;
let dataId;

//Selectors
const containerDates = document.querySelector("#container-dates");
const namePetElement = document.querySelector("#name-pet");
const nameUserElement = document.querySelector("#name-user");
const phone_numberElement = document.querySelector("#phone-number");
const dateElement = document.querySelector("#date");
const timeElement = document.querySelector("#time");
const descriptionElement = document.querySelector("#description");
const form = document.querySelector("form");
const saveButtonElement = document.querySelector("#saveButton");
const message = document.querySelector("#modal-button");
const modal = document.querySelector("#modal-message");

//Events
saveButtonElement.addEventListener("click", (e) => {
  if (form.checkValidity()) {
    e.preventDefault();
    createAppointment();
    messageModal("Success! The appointment was created!");
    message.click();
  }
});

containerDates.addEventListener("click", (e) => {
  if (e.target.id === "cancel") {
    dataId = e.target.getAttribute("data-id");
    deleteDate(dataId);
  } else if (e.target.id === "edit") {
    dataId = e.target.getAttribute("data-id");
    editDate(dataId);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  if (cargar()[0]) {
    pacientes = cargar()[0];
    contadorId = cargar()[1];
    renderDates();
  }
});

//functions
/**Create an appointment */
function createAppointment() {
  const id = contadorId;
  const nombreMascota = namePetElement.value;
  const nombreUsuario = nameUserElement.value;
  const phone = phone_numberElement.value;
  const date = dateElement.value;
  const hour = timeElement.value;
  const description = descriptionElement.value;

  const pacienteEncontrado = pacientes.find(
    (paciente) => paciente.id === Number(dataId)
  );

  if (pacienteEncontrado) {
    pacienteEncontrado.nombreMascota = nombreMascota;
    pacienteEncontrado.nombreUsuario = nombreUsuario;
    pacienteEncontrado.phone = phone;
    pacienteEncontrado.date = date;
    pacienteEncontrado.hour = hour;
    pacienteEncontrado.description = description;
    dataId = "";
  } else {
    const paciente = {
      id,
      nombreMascota,
      nombreUsuario,
      phone,
      date,
      hour,
      description,
    };

    contadorId++;
    pacientes.push(paciente);
  }
  guardar();
  renderDates();
}
/**delete an appointment */
function deleteDate(dataId) {
  pacientes.forEach((paciente, index) => {
    if (paciente.id === Number(dataId)) {
      pacientes.splice(index, 1);
      messageModal("The appointment was deleted");
      message.click();
    }
  });
  guardar();
  renderDates();
}
/**render appointments */
function renderDates() {
  containerDates.innerHTML = `<div class="card">
    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th>Mascota</th>
                <th>Nombre</th>
                <th>Telefono</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Opciones</th>
            </tr>
        </thead>
        <tbody>
            
        </tbody>
    </table>
    </div>`;

  const tbody = document.querySelector("tbody");

  pacientes.forEach((paciente) => {
    const row = document.createElement("tr");
    row.innerHTML += `<td>${paciente.nombreMascota}</td>
        <td>${paciente.nombreUsuario}</td>
        <td>${paciente.phone}</td>
        <td>${paciente.date}</td>
        <td>${paciente.hour}</td>
        <td><button id="edit" class="btn btn-primary" data-id="${paciente.id}">editar</button></td>
        <td><button id="cancel" class="btn btn-danger" data-id="${paciente.id}">cancelar</button></td>`;

    tbody.appendChild(row);
  });
}
/**edit an appointment */
function editDate(dataId) {
  pacientes.forEach((paciente) => {
    if (paciente.id === Number(dataId)) {
      namePetElement.value = paciente.nombreMascota;
      nameUserElement.value = paciente.nombreUsuario;
      phone_numberElement.value = paciente.phone;
      dateElement.value = paciente.date;
      timeElement.value = paciente.hour;
      descriptionElement.value = paciente.description;
    }
  });
}

/**save appointments in local storage */
function guardar() {
  localStorage.setItem("pacientes", JSON.stringify(pacientes));
  localStorage.setItem("contador", contadorId);
}
/**load appointments in local storage */
function cargar() {
  return [
    JSON.parse(localStorage.getItem("pacientes")),
    JSON.parse(localStorage.getItem("contador")),
  ];
}

function messageModal(message) {
  modal.textContent = message;

}
