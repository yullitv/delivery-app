export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const NORM_PHONE_REGEX = /^\+380\d{9}$/;

export const normalizePhoneNumber = (phone: string): string => {
  let clean = phone.replace(/[^\d+]/g, "");
  if (clean.startsWith("80")) clean = clean.substring(1);
  if (clean.startsWith("0")) clean = "+38" + clean;
  if (clean.startsWith("380") && !clean.startsWith("+")) clean = "+" + clean;
  return clean;
};

export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const normalized = normalizePhoneNumber(phone);
  return NORM_PHONE_REGEX.test(normalized);
};