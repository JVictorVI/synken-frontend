import CryptoJS from "crypto-js";

/** Deriva a chave simétrica a partir dos usernames */
export const deriveSymmetricKey = (id1, id2) => {
  const [low, high] = [id1, id2].sort();
  const keyMaterial = `${low}:${high}`;
  return CryptoJS.SHA256(keyMaterial).toString();
};

/** Criptografa a mensagem */
export const encryptMessage = (message, keyHex) => {
  const key = CryptoJS.enc.Hex.parse(keyHex);
  const iv = CryptoJS.lib.WordArray.random(16);

  const encrypted = CryptoJS.AES.encrypt(message, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return `${iv.toString(CryptoJS.enc.Hex)}:${encrypted.ciphertext.toString(
    CryptoJS.enc.Base64
  )}`;
};

/** Descriptografa a mensagem */
export const decryptMessage = (payload, keyHex) => {
  const [ivHex, cipherBase64] = payload.split(":");
  const key = CryptoJS.enc.Hex.parse(keyHex);
  const iv = CryptoJS.enc.Hex.parse(ivHex);
  const ciphertext = CryptoJS.enc.Base64.parse(cipherBase64);

  const cipherParams = CryptoJS.lib.CipherParams.create({ ciphertext });
  const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
};
