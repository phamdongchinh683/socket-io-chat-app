export function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(email);
}

export function validatePassword(password) {
  return password.length >= 9 && password.length <= 20;
}

export function validatePhoneNumber(phoneNumber) {
  const phoneNumberPattern = /^\+?[0-9]{10,15}$/;
  return phoneNumberPattern.test(phoneNumber);
}

export function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}

export function setWithExpiry(key, value, ttl) {
  const now = new Date();

  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}
