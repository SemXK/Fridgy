/**
 * Verifies if the password is secure enough and sends a specific message if it's not
 * @param password 
 * @returns 
 */
export const validatePassword = (password: string): string | void => {
  if (!password) {
    return ("La password è obbligatoria!");
  }

  if (password.length < 8) {
    return ("La password deve contenere almeno 8 caratteri!");
  }

  if (!/[a-z]/.test(password)) {
    return ("La password deve contenere almeno una lettera minuscola!");
  }

  if (!/[A-Z]/.test(password)) {
    return ("La password deve contenere almeno una lettera maiuscola!");
  }

  if (!/[0-9]/.test(password)) {
    return ("La password deve contenere almeno un numero!");
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    return ("La password deve contenere almeno un carattere speciale!");
  }
};

