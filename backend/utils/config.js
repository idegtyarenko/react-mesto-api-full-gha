import 'dotenv/config';

const {
  NODE_ENV,
  JWT_SECRET,
  DB_HOST,
  SERVER_PORT,
  FRONTEND_HOST,
} = process.env;

const DEV_JWT_SECRET = 'some-secret-key';
const DEV_DB_HOST = 'mongodb://127.0.0.1:27017/mydatabase';
const DEV_SERVER_PORT = 3000;
const DEV_FRONTEND_HOST = 'http://localhost:3001';

const DATABASE_URL = NODE_ENV === 'production'
&& DB_HOST ? DB_HOST : DEV_DB_HOST;

const PORT = NODE_ENV === 'production'
&& SERVER_PORT ? SERVER_PORT : DEV_SERVER_PORT;

const JWT_KEY = NODE_ENV === 'production'
&& JWT_SECRET ? JWT_SECRET : DEV_JWT_SECRET;

const allowedCors = [DEV_FRONTEND_HOST];
if (NODE_ENV === 'production' && FRONTEND_HOST) {
  allowedCors.push(`http://${FRONTEND_HOST}`, `https://${FRONTEND_HOST}`);
}

export {
  DATABASE_URL,
  PORT,
  JWT_KEY,
  allowedCors,
};
