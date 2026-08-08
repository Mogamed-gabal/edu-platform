import { BcryptHelper } from './hash.helper';

describe('BcryptHelper', () => {
  const plainText = 'MySecurePassword123!';

  describe('hash', () => {
    it('should successfully hash a plain text password', async () => {
      const hashedPassword = await BcryptHelper.hash(plainText);

      expect(hashedPassword).toBeDefined();
      expect(typeof hashedPassword).toBe('string');
      expect(hashedPassword).not.toEqual(plainText);
      expect(hashedPassword.startsWith('$2b$')).toBe(true);
    });

    it('should generate different hashes for the same input due to salt', async () => {
      const hash1 = await BcryptHelper.hash(plainText);
      const hash2 = await BcryptHelper.hash(plainText);

      expect(hash1).not.toEqual(hash2);
    });
  });

  describe('compare', () => {
    it('should return true for matching plain text and hash', async () => {
      const hashedPassword = await BcryptHelper.hash(plainText);
      const isMatch = await BcryptHelper.compare(plainText, hashedPassword);

      expect(isMatch).toBe(true);
    });

    it('should return false for non-matching plain text and hash', async () => {
      const hashedPassword = await BcryptHelper.hash(plainText);
      const isMatch = await BcryptHelper.compare(
        'WrongPassword!',
        hashedPassword,
      );

      expect(isMatch).toBe(false);
    });
  });
});
