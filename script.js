let puerto;
let escritor;

const btnConectar = document.getElementById("btnConectar");
const estado = document.getElementById("estado");

const btnAzulOn = document.getElementById("btnAzulOn");
const btnAzulOff = document.getElementById("btnAzulOff");
const btnRojoOn = document.getElementById("btnRojoOn");
const btnRojoOff = document.getElementById("btnRojoOff");

btnConectar.addEventListener("click", async () => {
    try {
        puerto = await navigator.serial.requestPort();
        await puerto.open({ baudRate: 9600 });

        escritor = puerto.writable.getWriter();

        estado.textContent = "Arduino conectado";
        btnConectar.disabled = true;

        btnAzulOn.disabled = false;
        btnAzulOff.disabled = false;
        btnRojoOn.disabled = false;
        btnRojoOff.disabled = false;

    } catch (error) {
        estado.textContent = "Error al conectar";
        console.error(error);
    }
});

async function enviarOrden(orden) {
    const datos = new TextEncoder().encode(orden + "\n");
    await escritor.write(datos);
}

btnAzulOn.addEventListener("click", () => enviarOrden("AZUL_ON"));
btnAzulOff.addEventListener("click", () => enviarOrden("AZUL_OFF"));

btnRojoOn.addEventListener("click", () => enviarOrden("ROJO_ON"));
btnRojoOff.addEventListener("click", () => enviarOrden("ROJO_OFF"));