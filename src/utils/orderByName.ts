import { presents } from "./getAttendance";

export default function orderByName (array: presents[]):presents[] {
    return array.sort(({name:a},{name:b}) => { return a.localeCompare(b) });
}