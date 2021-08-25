import getAttendance, { attParams } from "./utils/getAttendance";

const filePath = './zoom.txt';

const consulta:attParams = {
    filePath,
    buscar: 'presente',
    horaInicio: '18:10:20',
    horaFinal: '18:20:00'
}

const { success, results } = getAttendance(consulta);

if (!success) {
    console.error("No se encontraron resultados o el archivo no existe.");
    process.exit(1);
}
console.log('Se encontraron resultados:');
// TODO: sort opcional
// results?.sort(({nombre:a},{nombre:b}) => { return a.localeCompare(b) });
console.log('Total de:', results?.length);
console.log('-----');
console.log(results);
process.exit(0);

