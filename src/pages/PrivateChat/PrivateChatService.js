import CryptoJS from "crypto-js";

export const generateChatKey = (userId1, userId2) => {
  const sortedIds = [userId1, userId2].sort();
  const keySeed = `${sortedIds[0]}:${sortedIds[1]}`;
  return CryptoJS.SHA256(keySeed).toString(); // 256 bits = 64 hex chars
};

export const encryptMessage = (message, key) => {
  const iv = CryptoJS.lib.WordArray.random(16);
  const encrypted = CryptoJS.AES.encrypt(
    message,
    CryptoJS.enc.Utf8.parse(key),
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  const result = {
    ciphertext: encrypted.ciphertext.toString(CryptoJS.enc.Base64),
    iv: iv.toString(CryptoJS.enc.Hex),
  };

  return JSON.stringify(result);
};

export const decryptMessage = (encryptedData, key) => {
  const iv = CryptoJS.enc.Hex.parse(encryptedData.iv);
  const ciphertext = CryptoJS.enc.Base64.parse(encryptedData.ciphertext);

  const cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: ciphertext,
  });

  const decrypted = CryptoJS.AES.decrypt(
    cipherParams,
    CryptoJS.enc.Utf8.parse(key),
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return decrypted.toString(CryptoJS.enc.Utf8);
};
