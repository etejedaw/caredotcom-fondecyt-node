# Software de extracción de datos para proyecto FONDECYT

## From automation to home production via the gig economy: a novel gender-based análisis

Software dedicado a la extracción de millones de datos históricos almacenados en Wayback Machine, sobre los trabajos solicitados y realizados en Estados Unidos durante la pandemia por medio del sitio web care.com.

## Instrucciones

1. Clonar el repositorio.
2. Copiar el archivo `.env.example` y pegarlo en la carpeta raiz con el nombre `.env`.
3. Añadir el tipo de dato a extraer (offer o job) al lado del texto `DATA_TYPES_EXTRACTION=`. Ejemplo: `DATA_TYPES_EXTRACTION=offer`
4. El repositorio está desarrollado para ser ejecutado en la versión lts/gallium de NodeJs, por lo que no se asegura una óptima ejecución en otras versiones.
5. En caso de querer utilizar la versión específica de NodeJs con la que el software fue desarrollado, se recomienda seguir los siguientes pasos:
   1. Instalar [nvm](https://github.com/nvm-sh/nvm)
   2. Ejecutar el comando `nvm install`
   3. Ejecutar el comando `nvm use`

### Ejecución

```
npm ci
npm run start
```

output: `./dist/src/output`

## Configuración

* En caso de añadir y/o eliminar ofertas de trabajo o solicitudes de trabajo, se debe editar el `.txt` respectivo (`job.txt` u `offer.txt`) que se encuentra dentro del directorio `./src/public`.
* En caso de añadir y/o eliminar las áreas de extracción, se debe editar el fichero `local_area.txt` que se encuentra dentro del directorio `./src/public`.

## Funcionamiento

1. El software utiliza los archivos `*.txt` almacenados en el directorio `./src/public` para generar todas las posibles combinaciones de links. La estructura del link es la siguiente: `https://www.care.com/<offer o job>/<area>`. Ejemplo: https://www.care.com/child-care/alabaster-al
2. Una vez que el programa genera la lista de todas las combinaciones de links posibles; cada uno de estos es pasado por la API de TimeTravel, la cual retorna una lista de todos los links históricos que han sido almacenados en archive.org
3. Para cada uno de los links históricos, la información es extraída para luego generar su `.csv` respectivo.
