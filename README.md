# Zoom-attendance

Analiza un `.txt` exportado de una reunión de Zoom. Busca por una palabra clave y retorna un objeto con el nombre del usuario, la hora y el mensaje completo. 

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

## To-Do

[] Exportar a un excel
[] Comandos por terminal con [commander](https://www.npmjs.com/package/commander).

## Expresión regular

```js
/((?:\d{2}:?){3})\W(?:de)\W*((?:.)+)\W+(?:a\W+todos).*\W*(presente)/gi
```

Nota: `presente` es cambiado por la palabra a buscar.

![Representación gráfica de la expresión regular](https://i.imgur.com/VKe7joD.png)

- `match[1]`: la hora del mensaje, teniendo el formato: `HH:mm:ss`.
- `match[2]`: nombre del usuario/alumno.
- `match[3]`. mensaje matcheado.

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
        hora: '18:10:55',
        nombre: 'Inez J. Quandt',
        mensaje: 'Presente'
    },
    // ...
]
```
