import { readFileSync } from 'fs';

export default (filePath: string): string => {
    let output = '';
    try {
        output = readFileSync(filePath, 'utf-8');
    } catch (err) {
        console.error(err.message);
    }
    return output;
}