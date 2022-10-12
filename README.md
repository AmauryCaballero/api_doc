# Chat Doc API

Servicio que permite al App **Chat Doc** almacenar y consultar la información que no require listener's en tiempo real.

## Requerimientos para despliegue en Ubuntu Server

### Instalación de **Node JS**:

Para instalar hacer uso de la utilidad `nvm` que permite administrar las versiones de Node JS, ver la siguiente [guía de uso e instalación de nvm](https://github.com/nvm-sh/nvm).

### Instalación de **MySQL**:

```sh
# Comprobar actualizaciones del sistema
sudo apt update

# Instalar
sudo apt install mysql-server

# Configurar
sudo mysql_secure_installation

# Luego continuar con los pasos que indica la terminal
```

### Instalación de **PM2** para administrar procesos de Node JS:
```sh
npm install -g pm2
```

### Instalación de nodemon para iniciar el proyecto visualizando las salidas:
```sh
npm install -g nodemon
```

## Configuración e instalación de dependencias

### Agregar db chatdoc
```sh
# Entrando a MySQL
mysql -u root
```

```sql
# Crear db
create database chatdoc;
# Salir para cargar script de db
exit;
```

```sh
# Ir a la ruta del script
cd api_doc/db/

# Ejecutar script de definicion de db
mysql -u root chatdoc < chatdoc.sql
```

### Instalar dependencias del proyecto

Ir a la carpeta del proyecto `chatdoc-api-main/` y ejecutar:

```sh
npm install
```

### Configurar variables de entorno

Para las variables de entorno se hace uso del paquete [dotenv](https://www.npmjs.com/package/dotenv) (que ya se encuentra en las dependencias del proyecto), este leerá las configuraciones desde la ruta del archivo `.env` especificado. Para el servidor de producción se recomienda colocar en una ruta fuera del proyecto como: '`/root/.env`'

Ej: `.env`
```sh
NODEJS_HOST=localhost
PORT=8000
MYSQL_HOST=localhost
MYSQL_USER=chatdoc
MYSQL_DATABASE=chatdoc
MYSQL_PASSWORD="PASSWORD"
```

### Llaves públicas Google

Llaves utilizadas para validar los tokens id de la sesión, ir al siguiente [enlace](https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com) para descargar.
Debe de colocar o reemplazar ese json en el archivo `./firebase/public-cert.json`.

## Ejecución del proyecto

### Iniciar en modo para realizar verificaciones
```sh
npm run dev
```

### Dejar en ejecución para producción
```sh
pm2 start index.js --name chatdoc-api
```

Luego de hacer esto la primera vez, en las próximas ocasiones bastará con ejecutar desde cualquier ruta del servidor:
```sh
Chat Doc