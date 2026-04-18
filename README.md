Tasky es una aplicación web que permite a los usuarios gestionar sus tareas personales de forma segura.
Los usuarios pueden registrarse con su correo electrónico, iniciar sesión mediante autenticación con JWT y realizar operaciones CRUD sobre sus tareas.

Arquitectura:
El sistema está estructurado siguiendo el patrón MVC:
Modelos: Definen la estructura de los datos (Usuario y Tarea)
Controladores: Contienen la lógica de negocio
Rutas: Definen los endpoints de la API
Middlewares: Manejan autenticación y errores

La aplicación utiliza JWT para la autenticación. Una vez que el usuario inicia sesión, 
se genera un token que debe enviarse en cada petición protegida mediante el header:
Authorization: token

Funcionalidades principales
Registro e inicio de sesión con correo
Autenticación con JWT
CRUD completo de tareas
Filtrado de tareas por estado
Protección de rutas
Manejo global de errores
Interfaz básica funcional
