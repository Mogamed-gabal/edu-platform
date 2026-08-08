import { randomInt } from 'crypto';

export const generateOtp = (length = 6): string => {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length);

  const otpNumber = randomInt(min, max);
  return otpNumber.toString();
};
