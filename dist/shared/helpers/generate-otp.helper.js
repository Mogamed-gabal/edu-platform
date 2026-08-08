"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtp = void 0;
const crypto_1 = require("crypto");
const generateOtp = (length = 6) => {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length);
    const otpNumber = (0, crypto_1.randomInt)(min, max);
    return otpNumber.toString();
};
exports.generateOtp = generateOtp;
//# sourceMappingURL=generate-otp.helper.js.map