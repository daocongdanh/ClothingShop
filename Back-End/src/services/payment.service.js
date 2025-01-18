class PaymentService {
  constructor() {
    this.vnpPayUrl = process.env.VNPAY_URL;
    this.vnpReturnUrl = process.env.VNPAY_RETURN_URL;
    this.vnpTmnCode = process.env.VNPAY_TMN_CODE;
    this.secretKey = process.env.VNPAY_SECRET_KEY;
    this.vnpVersion = process.env.VNPAY_VERSION;
    this.vnpCommand = process.env.VNPAY_COMMAND;
    this.orderType = process.env.VNPAY_ORDERTYPE;
  }

  getRandomNumber(length) {
    const randomNumber = Math.random().toString().slice(2);
    return randomNumber.slice(0, length); 
}

  getVNPayConfig() {
    const vnpParamsMap = {};
    vnpParamsMap["vnp_Version"] = this.vnpVersion;
    vnpParamsMap["vnp_Command"] = this.vnpCommand;
    vnpParamsMap["vnp_TmnCode"] = this.vnpTmnCode;
    vnpParamsMap["vnp_CurrCode"] = "VND";
    vnpParamsMap["vnp_TxnRef"] = this.getRandomNumber(8);
    vnpParamsMap[
      "vnp_OrderInfo"
    ] = `Thanh toan don hang: ${this.getRandomNumber(8)}`;
    vnpParamsMap["vnp_OrderType"] = this.orderType;
    vnpParamsMap["vnp_Locale"] = "vn";

    const timeZone = "Etc/GMT+7";
    const currentDate = utcToZonedTime(new Date(), timeZone);
    vnpParamsMap["vnp_CreateDate"] = format(currentDate, "yyyyMMddHHmmss");

    const expireDate = new Date(currentDate.getTime() + 15 * 60 * 1000); // Add 15 minutes
    vnpParamsMap["vnp_ExpireDate"] = format(expireDate, "yyyyMMddHHmmss");

    return vnpParamsMap;
  }

}
