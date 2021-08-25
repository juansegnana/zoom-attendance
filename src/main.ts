import getAttendance, { attParams } from "./utils/getAttendance";
import orderByName from "./utils/orderByName";

const filePath = './zoom.txt';

const consulta:attParams = {
    filePath,
    buscar: 'presente',
    horaInicio: '18:13:00',
    horaFinal: '18:20:00'
}

const { success, results } = getAttendance(consulta);

if (!success || !results) {
    console.error("No se encontraron resultados o el archivo no existe.");
    process.exit(1);
}
console.log('Se encontraron resultados:');
// Sort opcional
const filtered = orderByName(results);
console.log('Total de:', results?.length);
console.log('-----');
console.log(filtered);
process.exit(0);

