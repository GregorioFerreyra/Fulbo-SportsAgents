/*********Local Storage**********************/

let jugadores = JSON.parse(localStorage.getItem('jugadores')) || [];

/*********Agregar clase de persona ************/

class Persona {
    constructor(nombre, apellido, edad, deporte, valorMercado, foto) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.deporte = deporte;
        this.valorMercado = valorMercado;
        this.foto = foto;
        this.fotoUrl = URL.createObjectURL(foto); 
    }
}

/******************************Eventos ****************************************/

/* AGREGAR JUGADORES*/

const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputEdad = document.getElementById("edad");
const inputDeporte = document.getElementById("deporte");
const inputFoto = document.getElementById("foto"); 
const inputValor = document.getElementById("valor");
const btnRegistrar = document.getElementById("addplayer");

btnRegistrar.onclick = (e) => {
    e.preventDefault();
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let edad = Number(inputEdad.value);
    let deporte = inputDeporte.value;
    let foto = inputFoto.files[0]; 
    let valorDEmercado = Number(inputValor.value);

    if (nombre != "" && apellido != "" && edad > 0 && foto) {
        let player = new Persona(nombre, apellido, edad, deporte, valorDEmercado, foto);

        jugadores.push(player);
        console.log(jugadores);

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Jugador registrado correctamente",
            showConfirmButton: false,
            timer: 1500
        });
    } else {
        alert("FALTAN RELLENAR CAMPOS O AGREGAR UNA FOTO");
    }

    localStorage.setItem('jugadores', JSON.stringify(jugadores));
}

/* VER JUGADORES*/

const inputDeporteConsulta = document.getElementById("deporte-consulta")
const btnVerJugadores = document.getElementById("findplayer")

btnVerJugadores.onclick = (e) => {
    e.preventDefault();
    filtrarJugadores();
}

function filtrarJugadores() {
    let deporteSeleccionado = inputDeporteConsulta.value;
    let jugadoresFiltrados = jugadores.filter(elemento => elemento.deporte == deporteSeleccionado);
    let listaJugadoresElement = document.getElementById('tablaJugadoresBody');
    listaJugadoresElement.innerHTML = '';

    jugadoresFiltrados.forEach(jugador => {
        const tr = document.createElement('tr');

        
        const tdFoto = document.createElement('td');
        const foto = document.createElement('img');
        foto.src = jugador.fotoUrl;
        foto.alt = `Foto de ${jugador.nombre} ${jugador.apellido}`;
        foto.style.width = '50px'; 
        tdFoto.appendChild(foto);
        tr.appendChild(tdFoto);

        
        const tdNombre = document.createElement('td');
        tdNombre.textContent = jugador.nombre;
        tr.appendChild(tdNombre);

        const tdApellido = document.createElement('td');
        tdApellido.textContent = jugador.apellido;
        tr.appendChild(tdApellido);

        const tdEdad = document.createElement('td');
        tdEdad.textContent = jugador.edad;
        tr.appendChild(tdEdad);

        const tdDeporte = document.createElement('td');
        tdDeporte.textContent = jugador.deporte;
        tr.appendChild(tdDeporte);

        const tdValor = document.createElement('td');
        tdValor.textContent = jugador.valorMercado;
        tr.appendChild(tdValor);

        listaJugadoresElement.appendChild(tr);
    });
}




