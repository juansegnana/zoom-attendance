import { readFileSync } from 'fs';

type minsec = number;
type hours = number;
type hoursAllowed = `${hours}:${minsec}:${minsec}`;

/**
 * Leer archivo y buscar según el mensaje que tuvo que dar el usuario.
*/
export interface attParams {
    /**
     * Ruta del archivo
    */
    filePath: string;
    /**
     * Palabra o frase a buscar
    */
    buscar?: string | 'presente';
    /**
     * Desde que hora aceptar. Ejemplo: 12:20:00
    */
    horaInicio?: hoursAllowed | false;
    /**
     * Desde que hora NO aceptar. Ejemplo: 12:40:00
    */
    horaFinal?: hoursAllowed | false;
};

export interface presentes {
    hora: string;
    nombre: string;
    mensaje: string;
}

interface attendance {
    success: boolean;
    results?: presentes[];
};

const getAttendance = ({ filePath, buscar, horaInicio, horaFinal }: attParams): attendance => {
    let success = true;
    let text: string;
    try {
        text = readFileSync(filePath, 'utf-8');
    } catch (err) {
        console.error(err.message);
        success = false;
        return { success };
    }

    const expression = `((?:\\d{2}:?){3})\\W(?:de)\\W*((?:.(?!\\b[a]\\b))+).*(?:a).*\\W*(${buscar})`;
    const zoomExp: RegExp = new RegExp(expression, 'gi');

    let matches = text.matchAll(zoomExp);
    const presentes = [];

    /*
        continue: saltea a la sig. iteración. Más info:
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue
    */
    for (const match of matches) {

        const hora = match[1];
        const nombre = match[2].trim();
        const mensaje = match[3].trim();

        if (horaInicio) {
            // Caso: quiero los presentes desde las 10.
            // Si el mensaje fue enviado antes de las 10, no aceptar.
            // Ej. desde 10... | mensaje 9...
            if (horaInicio > hora) continue;
        }
        if (horaFinal) {
            // Caso: quiero los presentes hasta las 10.
            // Si el mensaje fue enviado desde de las 10 inclusive, no aceptar.
            // Ej. (10(horaFinal) < 9(horaActual)) ? NoAceptar : aceptar. 
            if (horaFinal <= hora) continue;
        }

        presentes.push({
            hora,
            nombre,
            mensaje
        });

    };

    // No hubo match
    if (presentes.length === 0) success = false;

    return {
        success,
        results: presentes
    };
};

export default getAttendance;