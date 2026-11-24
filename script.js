
/* Obtenemos los elementos HTML */
const btnConectar = document.getElementById("btnConectar");
const btnEncender = document.getElementById("btnEncender");
const btnApagar = document.getElementById("btnApagar");
const estado = document.getElementById("estado");

/* Variables para la comunicación con Arduino */
let puerto;
let escritor;

/* Conectar con Arduino */
btnConectar.addEventListener("click", async () => {
    try {
        // Seleccionamos el puerto USB
        puerto = await navigator.serial.requestPort();

        // Abrimos la conexión a 9600 baudios
        await puerto.open({ baudRate: 9600 });

        // Creamos el sistema para enviar datos
        escritor = puerto.writable.getWriter();

        // Actualizamos la página
        estado.textContent = "Arduino conectado";
        btnEncender.disabled = false;
        btnApagar.disabled = false;
        btnConectar.disabled = true;

    } catch (error) {
        estado.textContent = "Error al conectar con Arduino";
        console.error(error);
    }
});

/* Función para enviar órdenes a Arduino */
async function enviarOrden(orden) {
    if (!escritor) {
        return;
    }

    // Convertimos la orden en bytes
    const datos = new TextEncoder().encode(orden + "\n");

    // Enviamos la orden por USB
    await escritor.write(datos);

    // Mostramos la orden enviada
    estado.textContent = "Orden enviada: " + orden;
}

/* Botón para encender el LED */
btnEncender.addEventListener("click", () => {
    enviarOrden("ON");
});

/* Botón para apagar el LED */
btnApagar.addEventListener("click", () => {
    enviarOrden("OFF");
});
