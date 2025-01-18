const crypto = require("crypto");
const { URLSearchParams } = require("url");

function hmacSHA512(key, data) {
  if (!key || !data) {
    throw new Error("Key and data must not be null or undefined.");
  }
  const hmac = crypto.createHmac("sha512", key);
  return hmac.update(data, "utf8").digest("hex");
}

function getIpAddress(req) {
  try {
    const ipAddress =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    return ipAddress || "Unknown IP";
  } catch (error) {
    return `Invalid IP: ${error.message}`;
  }
}

function getRandomNumber(length) {
  const chars = "0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function getPaymentURL(paramsMap, encodeKey = true) {
  const params = Object.entries(paramsMap)
    .filter(
      ([key, value]) => value !== null && value !== undefined && value !== ""
    )
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([key, value]) => {
      const encodedKey = encodeKey ? encodeURIComponent(key) : key;
      return `${encodedKey}=${encodeURIComponent(value)}`;
    })
    .join("&");
  return params;
}

module.exports = {
  hmacSHA512,
  getIpAddress,
  getRandomNumber,
  getPaymentURL,
};
