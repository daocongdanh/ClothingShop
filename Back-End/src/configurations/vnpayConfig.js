const dayjs = require('dayjs');

const getVNPayConfig = (req) => {
  const vnpParamsMap = {
    vnp_Version: process.env.VNPAY_VERSION,
    vnp_Command: process.env.VNPAY_COMMAND,
    vnp_TmnCode: process.env.VNPAY_TMN_CODE,
    vnp_CurrCode: "VND",
    vnp_TxnRef: getRandomNumber(8),
    vnp_OrderInfo: `Thanh toan don hang: ${getRandomNumber(8)}`,
    vnp_OrderType: process.env.VNPAY_ORDERTYPE,
    vnp_Locale: "vn",
    vnp_IpAddr: getIpAddress(req),
    vnp_CreateDate: dayjs().format("YYYYMMDDHHmmss"),
    vnp_ExpireDate: dayjs().add(15, 'minute').format("YYYYMMDDHHmmss")
  };
  return vnpParamsMap;
};


const getIpAddress = (req) => {
  return (
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket?.remoteAddress
  );
};

const getRandomNumber = (length) => {
  const chars = "0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const sortObject = (obj) => {
	let sorted = {};
	let str = [];
	let key;
	for (key in obj){
		if (obj.hasOwnProperty(key)) {
		str.push(encodeURIComponent(key));
		}
	}
	str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}


module.exports = {
  getVNPayConfig,
  sortObject
};
