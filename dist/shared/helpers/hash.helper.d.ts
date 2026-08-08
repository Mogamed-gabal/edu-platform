export declare class BcryptHelper {
    private static readonly SALT_ROUNDS;
    static hash(data: string): Promise<string>;
    static compare(data: string, hashedData: string): Promise<boolean>;
}
