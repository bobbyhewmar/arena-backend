import { findAccountByUsername, findAccountByEmail, createAccount } from '../repositories/accountRepository';
import { hashPassword } from '../utils/hashUtils';

export const registerAccount = async (username: string, email: string, password: string) => {
  const existingLogin = await findAccountByUsername(username);
  if (existingLogin) {
    throw new Error('Email or Account is already registered.');
  }

  const existingEmail = await findAccountByEmail(email);
  if (existingEmail) {
    throw new Error('Email or Account is already registered.');
  }

  const hashedPassword = await hashPassword(password);
  return createAccount({ login: username, password: hashedPassword, l2email: email });
};
