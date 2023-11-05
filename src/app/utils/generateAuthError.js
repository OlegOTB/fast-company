export function generationAuthError(message) {
  switch (message) {
    case `INVALID_LOGIN_CREDENTIALS`:
      return "Неверное имя пользователя или пароль.";
    case `EMAIL_NOT_FOUND`:
      return "нет записи пользователя, соответствующей этому идентификатору. Возможно, пользователь был удален.";
    case `INVALID_PASSWORD`:
      return "Пароль недействителен или у пользователя нет пароля.";
    case `USER_DISABLED`:
      return "Учетная запись пользователя отключена администратором.";
    case `EMAIL_EXISTS`:
      return "Пользователь с таким email уже существует.";
    default:
      return "Слишком много попыток входа. Попробуйте позже...";
  }
}
