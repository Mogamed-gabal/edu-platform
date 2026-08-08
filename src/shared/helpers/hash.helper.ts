import * as bcrypt from 'bcrypt';
export class BcryptHelper {
  private static readonly SALT_ROUNDS = 10;
  static async hash(data: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
    return await bcrypt.hash(data, salt);
  }
  static async compare(data: string, hashedData: string): Promise<boolean> {
    return await bcrypt.compare(data, hashedData);
  }
}
