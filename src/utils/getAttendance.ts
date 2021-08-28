import cleanByString from "./cleanByString";
import { languages } from "./languages";

type minutesAndSeconds = number;
type hours = number;
/**
 * Time format allowed to search for.
*/
export type allowedHours = `${hours}:${minutesAndSeconds}:${minutesAndSeconds}`;

/**
 * Receives an string (meant to be a Zoom Meeting chat), looks for
 * users who said "here", or the message to look for.
*/
export interface attParams {
    /**
     * String to analize.
    */
    text: string;
    /**
     * Language that chat is in. By default: es (Spanish)
    */
    language?: 'es' | 'en';
    /**
     * Keyword to search for. Example: "here"
    */
    searchFor?: string;
    /**
     * Initial hour to allow attendance message. E.g.: 12:20:00
    */
    initalHour?: allowedHours | false;
    /**
     * Final hour to stop allowing attendance message. E.g.: 12:40:00
    */
    finalHour?: allowedHours | false;
    /**
     * Delete dots, numbers, dash and underscore. By default: false
    */
    cleanName?: boolean;
    /**
     * Clean name by string given, it also accepts any regex symbol. Example: ['COM A', 'ISI A', 'ISI .']
    */
    cleanNameByString?: string[];
}

export interface presents {
    hour: string;
    name: string;
    message: string;
}

export interface attendance {
    success: boolean;
    results: presents[];
}

const getAttendance = ({
    text,
    language = 'es',
    searchFor = 'presente',
    initalHour,
    finalHour,
    cleanName = false,
    cleanNameByString,
}: attParams): attendance => {

    let success = true;
    if (!text) return { success: false, results: [] };

    const { from, to, everyone } = languages[language];
    const expression = `((?:\\d{2}:?){3})\\W(?:${from})\\W*((?:.)+).*(?:${to}\\W+${everyone}:).*\\W*(.*${searchFor}.*)`;
    const zoomExp: RegExp = new RegExp(expression, 'gi');

    let matches = text.matchAll(zoomExp);
    const presents = [];

    /*
        continue: saltea a la sig. iteración. Más info:
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue
    */
    for (const match of matches) {

        const hour = match[1];
        const replaceSymbols = /[\d-_\.]/g;
        if (cleanName) {
            match[2] = match[2].replaceAll(replaceSymbols, '');
        }
        let name = match[2].trim();
        const message = match[3].trim();

        if (initalHour) {
            // Caso: quiero los presentes desde las 10.
            // Si el mensaje fue enviado antes de las 10, no aceptar.
            // Ej. desde 10... | mensaje 9...
            if (initalHour > hour) continue;
        }
        if (finalHour) {
            // Caso: quiero los presentes hasta las 10.
            // Si el mensaje fue enviado desde de las 10 inclusive, no aceptar.
            // Ej. (10(horaFinal) < 9(horaActual)) ? NoAceptar : aceptar. 
            if (finalHour <= hour) continue;
        }
        if (cleanNameByString) {
            name = cleanByString(name, cleanNameByString);
        }

        presents.push({
            hour,
            name,
            message
        });

    };

    // There was no match
    if (presents.length === 0) success = false;

    return {
        success,
        results: presents
    };
};

export default getAttendance;