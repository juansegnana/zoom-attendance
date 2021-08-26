import getAttendance, { attParams } from "./utils/getAttendance";
import readTxt from "./utils/readTxt";
import orderByName from "./utils/orderByName";
import { languages } from "./utils/languages";

const filePath = './zoom.txt';
const text = readTxt(filePath);

const consulta: attParams = {
    text,
    language: 'es',
    searchFor: 'presente',
    // horaInicio: '18:11:58',
    // horaFinal: '18:12:05',
    // limpiarNombre: false
}

const { success, results } = getAttendance(consulta);

if (!success || !results) {
    console.error("No se encontraron resultados o el archivo no existe.");
    process.exit(1);
}
console.log('Se encontraron resultados:');
// Sort opcional
// const filtered = orderByName(results);
console.log('Total de:', results?.length);
console.log('-----');
console.log(results);
process.exit(0);

