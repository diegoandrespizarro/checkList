const toDoForm = document.getElementById("todo-form");
const tasksList = document.getElementById("todo-list");
const titleTask = document.getElementById("titleTask");
const descriptionTask = document.getElementById("descriptionTask");
const priorityTask = document.getElementById("selectedPriority");
const clearAllButton = document.getElementById("clear-all")
const fechaHoy = document.getElementById("fecha")

// Cargar tareas al inicio
document.addEventListener("DOMContentLoaded", cargarTareas);

function agregarTareas(tareaTitulo = titleTask.value, tareaDescripcion = descriptionTask.value, tareaCompletada = false, tareaPrioridad = priorityTask.value) {
    if (tareaTitulo && tareaDescripcion) {
        let tareaNueva = document.createElement("div");
        tareaNueva.classList.add("tarea", "contenedorTarea");
        if (tareaCompletada) {
            tareaNueva.classList.add("completada");
        }

        if (tareaPrioridad === 'alta') {
            tareaNueva.classList.add("prioridad-alta");
        } else if (tareaPrioridad === 'media') {
            tareaNueva.classList.add("prioridad-media");
        } else {
            tareaNueva.classList.add("prioridad-baja");
        }

        

        let descripcion = document.createElement("p");
        descripcion.innerText = tareaDescripcion;
        descripcion.classList.add("descripcion");
        tareaNueva.appendChild(descripcion);

        let iconos = document.createElement("div");
        iconos.classList.add("iconos");
        tareaNueva.appendChild(iconos);

        let completar = document.createElement("i");
        completar.classList.add("bi", "bi-check-circle-fill", "icono-completar");
        completar.addEventListener("click", (e) => {
            completarTarea(e);
        });

        let eliminar = document.createElement("i");
        eliminar.classList.add("bi", "bi-trash3-fill", "icono-eliminar");
        eliminar.addEventListener("click", (e) => {
            eliminarTarea(e);
        });

        iconos.append(completar, eliminar);
        tasksList.appendChild(tareaNueva);

        titleTask.value = '';
        descriptionTask.value = '';
        priorityTask.value = '';
        guardarTareas();
    } else {
        alert("Por favor ingresa un título y una descripción para la tarea.");
    }
}

function completarTarea(e) {
    let tarea = e.target.parentNode.parentNode;
    tarea.classList.toggle("completada");
    guardarTareas();
}

function eliminarTarea(e) {
    let tarea = e.target.parentNode.parentNode; 
    tarea.remove();
    guardarTareas();
}
function borrarTodo (){
    localStorage.removeItem("tareas")
    while(tasksList.firstChild){
        tasksList.removeChild(tasksList.firstChild);
    }
}

function guardarTareas() {
    const tareas = [];
    document.querySelectorAll('.contenedorTarea').forEach(tarea => {
        const titulo = tarea.querySelector('.titulo').innerText;
        const descripcion = tarea.querySelector('.descripcion').innerText;
        const prioridad = tarea.classList.contains('prioridad-alta') ? 'alta' : 
                          tarea.classList.contains('prioridad-media') ? 'media' : 'baja';
        const completada = tarea.classList.contains('completada');
        tareas.push({ titulo, descripcion, prioridad, completada });
    });
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

function cargarTareas() {
    const tareas = JSON.parse(localStorage.getItem('tareas'));
    if (tareas) {
        tareas.forEach(tarea => {
            agregarTareas(tarea.titulo, tarea.descripcion, tarea.completada, tarea.prioridad);
        });
    }
}

toDoForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Evitar que el formulario se envíe de la manera tradicional
    agregarTareas();
});

clearAllButton.addEventListener("click",borrarTodo);

const dia = new Date ();

const semana = ["DOMINGO","LUNES","MARTES","MIERCOLES","JUEVES","VIERNES","SABADO"]
const meses = ["ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"]

fechaHoy.textContent = `${semana[dia.getDay()]} ${dia.getDate()} ${meses[dia.getMonth()]}`;


