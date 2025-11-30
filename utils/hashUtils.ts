import { createHash } from 'crypto';
// import whirlpool from 'whirlpool';
import { whirlpool } from 'hash-wasm';

/**
 * Hashes a password using the specified encryption method.
 * @param password The plaintext password to be hashed.
 * @returns The hashed password in Base64 or Hex encoding.
 */

export const hashPassword = async (password: string): Promise<string> => {
  const encryptionMethod = (process.env.PASSWORD_ENCRYPTION_METHOD || 'sha1').toLowerCase();

  const hashMethods: Record<string, () => Promise<string>> = {
    md5: async () => createHash('md5').update(password).digest('hex'),
    sha1: async () => createHash('sha1').update(password).digest('base64'),
    whirlpool: async () => {
      const hashHex = await whirlpool(password); // Gera hash em HEX
      return Buffer.from(hashHex, 'hex').toString('base64'); // Converte para Base64
    },
    'sha3-256': async () => createHash('sha3-256').update(password).digest('base64'),
  };

  if (!(encryptionMethod in hashMethods)) {
    throw new Error(`Unsupported encryption method: ${encryptionMethod}`);
  }

  return await hashMethods[encryptionMethod]();
};
