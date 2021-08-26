# Zoom-attendance

Módulo que analiza un `.txt` exportado de una reunión de Zoom. Busca por una palabra clave y retorna un objeto con el nombre del usuario, la hora y el mensaje completo. 

Ideal para obtener una planilla de asistencia.

## Uso

- Clonar repositorio
- Instalar dependencias de desarrollo con: `npm i`.
- Scripts:

```bash
npm run dev # ejecuta TS sin pre-compilar
npm run build # compila a JS
npm run start # compila a JS y ejecuta
```
Importar `getAttendance` y pasar por parámetros:
```ts
{
    text: string;                       // String del txt.
    language?: 'es' | 'en';             // Por defecto: es
    searchFor?: string;                 // Por defecto: presente
    initalHour?: allowedHours | false;  // Ej: 11:20:00
    finalHour?: allowedHours | false;   // Ej: 11:25:00
    cleanName?: boolean;                // Por defecto: true
}
```

También se pueda usar `readTxt`, donde se pasa por parámetro la `ruta` del archivo y devuelve un string. En caso de que haya un error leyendo (como que no exista el archivo), devolverá un string vacío: `''`. 

## Expresión regular

```js
/((?:\d{2}:?){3})\W(?:de)\W*((?:.)+)\W+(?:a\W+todos).*\W*(presente)/gi
```
### Notas: 
- no distingue mayúsculas o minúsculas.
- `presente` es cambiado por la palabra a buscar. 
- `de`, `a`, `todos` es cambiado según el idioma elegido. Por defecto, español.

![Representación gráfica de la expresión regular](https://i.imgur.com/VKe7joD.png)

- `group[1]`: la hora del mensaje, teniendo el formato: `HH:MM:ss`.
- `group[2]`: nombre del usuario/alumno.
- `group[3]`. mensaje matcheado.

Ejemplo de `zoom.txt`:

```txt
18:10:55 De  Inez J. Quandt  a  Todos:
	Presente
18:11:25 De  Julia D. Bellew  a  Todos:
	presente
18:11:55 De  Herman S. McCain  a  Todos:
	PRESENTE
18:12:40 De  Brian B. Humes  a  Todos:
	presente
```

Devolvera un arreglo de objetos:

```json
[
    {
        hour: "18:10:55",
        name: "Inez J. Quandt",
        message: "Presente"
    },
    // ...
]
```
## Contribuciones
Hacer `fork` y editar en el lenguaje TS, luego hacer un pull request y lo miro!

Si te resultó útil:
[![Invitame un café en cafecito.app](https://cdn.cafecito.app/imgs/buttons/button_1.svg)](https://cafecito.app/juansegnana)