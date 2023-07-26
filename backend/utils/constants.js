export const JWT_KEY = 'some-secret-key';
export const DATABASE_URL = 'mongodb://localhost:27017/mestodb';

export const messages = {
  NOT_FOUND: 'Ресурс не найден',
  CANNOT_DELETE_OTHERS_CARD: 'Можно удалять только собственные посты',
  POST_DELETED: 'Пост удалён',
  INVALID_ID: 'Некорректный id',
  INTERNAL_SERVER_ERROR: 'На сервере произошла ошибка',
  VALIDATION_ERROR: 'Некорректные значения полей',
  CONFLICTING_EMAIL: 'Пользователь с таким email уже существует',
  INVALID_CREDENTIALS: 'Неправильный email или пароль',
  UNAUTHORIZED: 'Требуется авторизация',
  LOGIN_SUCCESFUL: 'Вы успешно авторизовались',
};

export const statusCodes = {
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const DEFAULT_USER = {
  name: 'Жак-Ив Кусто',
  about: 'Исследователь',
  avatar: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
};
