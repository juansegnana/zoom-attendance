import { presentes } from "./getAttendance";

export default function orderByName (array: presentes[]):presentes[] {
    return array.sort(({nombre:a},{nombre:b}) => { return a.localeCompare(b) });
}