<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Para levantar este proyecto de manera local siga las instrucciones

- 1. Descargue e instale Node en su versión LTS > 20.x.x
- 2. Dirigase al directorio del proyecto y ejecute 'npm install'
- 3. Cree un archivo .env en el root del directorio con las siguientes claves y valores (el valor de JWT_SECRET es de su preferencia):

USER_SERVICE_HOST=https://userservice-2c99.onrender.com
SEARCH_SERVICE_HOST=https://ads-searchservice.onrender.com
RESTRICTION_SERVICE_HOST=https://restrictions-service-api.onrender.com
GRADES_SERVICE_HOST=https://taller1arqsistemas.onrender.com
JWT_SECRET=eL2H[XnY-uU{TzL$m=:X:yGCrg+!WZ

- 4. Ejecute 'npm run start'

## Endpoints

### Iniciar Sesión

- **URL**: `POST https://main-app-in30.onrender.com/api/auth/login`
- **Descripción**: Inicia Sesión al sistema como docente o administrador
- **Cuerpo**:
  ```json
  {
    "email": "correo electronico del docente o administrador",
    "password": "Nombre del docente o administrador"
  }
  ```

### Asignar Calificación

- **URL**: `POST https://main-app-in30.onrender.com/api/calificacion/asignar`
- **Descripción**: Crea una calificación tras verificar que el estudiante existe e inserta la calificación en Grades-Service y Search-Service (Debe iniciar sesión)
- **Cuerpo**:
  ```json
  {
    "studentId": "UUID del estudiante",
    "grades": [
      {
        "subject": "Asignatura",
        "gradeName": "Nombre de la calificación",
        "gradeValue": "Valor de la calificacion (entre 1 a 7)",
        "comment": "Comentario"
      }
    ]
  }
  ```

### Crear estudiante

- **URL**: `POST https://main-app-in30.onrender.com/api/estudiante/crear`
- **Descripción**: Crea un estudiante e inserta en User-Service y Search-Service (Debe iniciar sesión)
- **Cuerpo**:
  ```json
  {
    "nombre": "Nombre del estudiante",
    "apellido": "Apellido del estudiante",
    "email": "correo electronico del docente o administrador"
  }
  ```
