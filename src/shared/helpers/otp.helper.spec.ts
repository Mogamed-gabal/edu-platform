import { generateOtp } from './generate-otp.helper';

describe('generateOtp Helper', () => {
  it('should generate an OTP with default length of 6 digits', () => {
    const otp = generateOtp();

    expect(otp).toHaveLength(6);
    expect(/^\d{6}$/.test(otp)).toBe(true);
  });

  it('should generate an OTP with a custom length', () => {
    const customLength = 4;
    const otp = generateOtp(customLength);

    expect(otp).toHaveLength(customLength);
    expect(/^\d{4}$/.test(otp)).toBe(true);
  });

  it('should generate different OTPs on subsequent calls', () => {
    const otp1 = generateOtp();
    const otp2 = generateOtp();

    expect(otp1).not.toBe(otp2);
  });
});
