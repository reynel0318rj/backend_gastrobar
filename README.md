# Backend Gastrobar

API en Express y MongoDB para controlar usuarios, menus y reservas de un gastrobar.

## Tecnologias

- Express
- MongoDB y Mongoose
- JWT para autenticacion
- bcryptjs para contraseñas

## Configuracion

1. Instala dependencias con `npm install`.
2. Ajusta el archivo `.env` con tus credenciales de MongoDB y JWT.
3. Ejecuta el servidor con `npm run dev`.

## Variables de entorno

- `PORT`
- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `CLIENT_URL`