# Sistema de Gestión de Tareas Empresariales - Angular

## Descripción

Aplicación web desarrollada con Angular y TypeScript para la gestión de tareas empresariales. El sistema permite consultar, registrar, actualizar y eliminar tareas mediante una interfaz interactiva.

El proyecto implementa una arquitectura SPA (Single Page Application), integrando servicios REST, programación reactiva con RxJS, interceptores HTTP, protección de rutas y navegación mediante Angular Router.

## Tecnologías utilizadas

- Angular 20
- TypeScript
- HTML y CSS
- Node.js y npm
- Angular Router
- HttpClient
- RxJS y Observables
- Formularios con ngModel

## Estructura del proyecto

El código fuente está organizado en carpetas según las responsabilidades de cada componente:

- `src/app/models/`: Interfaces para definir la estructura de los datos.
- `src/app/services/`: Servicios para gestionar tareas, autenticación y peticiones HTTP.
- `src/app/interceptors/`: Configuración del interceptor HTTP.
- `src/app/guards/`: Protección de rutas mediante AuthGuard.
- `src/app/components/tarea-lista/`: Visualización y administración de tareas.
- `src/app/components/tarea-form/`: Formulario para registrar nuevas tareas.
- `src/app/components/login/`: Pantalla de inicio de sesión.
- `src/app/app-routing.module.ts`: Configuración de las rutas de navegación.

## Funcionalidades

- Visualización de tareas registradas.
- Registro de nuevas tareas.
- Eliminación y actualización de tareas.
- Clasificación de tareas por prioridad.
- Consulta del estado de las actividades.
- Búsqueda de tareas.
- Consulta de información mediante una API REST.
- Manejo de datos asíncronos con RxJS y Pipe Async.
- Protección de rutas mediante AuthGuard.
- Interceptación de solicitudes HTTP.
- Navegación entre las diferentes secciones de la aplicación.

## Instalación y ejecución

Para ejecutar el proyecto es necesario disponer de Node.js y npm.

**1.** Abrir el proyecto en Visual Studio Code.

**2.** Abrir una terminal dentro de la carpeta principal del proyecto.

**3.** Instalar las dependencias:

```bash
npm install
```

**4.** Iniciar el servidor de desarrollo:

```bash
npm start
```

**5.** Acceder desde el navegador a:

http://localhost:4200

## Funcionamiento

La aplicación presenta un panel principal con el listado de tareas y un resumen de las actividades registradas.

Cada tarea contiene información relacionada con su título, descripción, prioridad y estado.

El sistema permite agregar nuevas tareas mediante un formulario, marcar actividades como completadas o pendientes y eliminar registros del listado.

Para el consumo de servicios REST se utiliza HttpClient, realizando peticiones a la API pública JSONPlaceholder:

https://jsonplaceholder.typicode.com/todos?_limit=5

La información obtenida se procesa mediante Observables de RxJS y se presenta en la interfaz utilizando el Pipe Async.

## Seguridad y enrutamiento

El proyecto incorpora un interceptor HTTP que permite agregar una cabecera de autorización de demostración a las solicitudes.

También utiliza AuthGuard para controlar el acceso a las rutas protegidas y redirigir a la pantalla de inicio de sesión cuando no existe una sesión activa.

La autenticación implementada tiene fines académicos y no utiliza un sistema de seguridad real.

## Gestión de datos

Los registros se administran mediante servicios de Angular. La aplicación utiliza información local y datos obtenidos de una API REST.

Las operaciones de registro, actualización y eliminación se realizan temporalmente en memoria, por lo que los cambios no se almacenan en una base de datos permanente.

## Compilación

Para generar una versión de producción se ejecuta:

```bash
npm run build
```

## Arquitectura

El sistema está organizado en diferentes capas:

- **Modelos:** Definen la estructura de los datos mediante interfaces TypeScript.
- **Servicios:** Gestionan la información y las solicitudes HTTP.
- **Interceptores:** Permiten modificar las peticiones HTTP antes de enviarlas.
- **Guards:** Controlan el acceso a las rutas de la aplicación.
- **Componentes:** Administran la interacción del usuario y presentan la información.
- **Enrutamiento:** Gestiona la navegación entre las diferentes vistas sin recargar la página.