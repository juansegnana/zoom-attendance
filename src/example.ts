import getAttendance, { attParams } from "./utils/getAttendance";
import readTxt from "./utils/readTxt";
import orderByName from "./utils/orderByName";

const filePath = './zoom.txt';
const text = readTxt(filePath);

const consulta: attParams = {
    text,
    language: 'es',
    searchFor: 'presente',
    cleanNameByString: ['ISI..'], // It will match ISI A, ISI B, ISI.B, etc.
}

const { success, results } = getAttendance(consulta);

if (!success) {
    console.error("There was no match.");
    process.exit(1);
}

console.log('Results found:');
// Optional sort
// const filtered = orderByName(results);

console.log('Total de:', results?.length);
console.log('-----');
console.log(results);
process.exit(0);

