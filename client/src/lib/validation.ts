export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Регулярка для вже нормалізованого номера (+380 та 9 цифр)
export const NORM_PHONE_REGEX = /^\+380\d{9}$/;

/**
 * Призводить номер телефону до канонічного вигляду +380XXXXXXXXX
 */
export const normalizePhoneNumber = (phone: string): string => {
  // 1. Прибираємо все, крім цифр та плюса на початку
  let clean = phone.replace(/[^\d+]/g, "");

  // 2. Якщо людина ввела 80... -> перетворюємо в 0...
  if (clean.startsWith("80")) clean = clean.substring(1);
  
  // 3. Додаємо префікси для українських номерів
  if (clean.startsWith("0")) clean = "+38" + clean;
  if (clean.startsWith("380") && !clean.startsWith("+")) clean = "+" + clean;
  
  return clean;
};

/**
 * Валідація імейла
 */
export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

/**
 * Валідація телефону через попередню нормалізацію
 */
export const validatePhone = (phone: string): boolean => {
  const normalized = normalizePhoneNumber(phone);
  return NORM_PHONE_REGEX.test(normalized);
};