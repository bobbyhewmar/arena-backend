import prisma from '../lib/prisma';

export const findAccountByUsername = async (username: string) => {
  return prisma.accounts.findUnique({
    where: { login: username },
  });
};

export const findAccountByEmail = async (email: string) => {
  return prisma.accounts.findFirst({
    where: { l2email: email },
  });
};

export const createAccount = async (data: { login: string, password: string, l2email: string }) => {
  return prisma.accounts.create({
    data: {
      login: data.login,
      password: data.password,
      l2email: data.l2email,
      accessLevel: 0,
      ban_expire: 0,
      allow_ip: '',
    },
  });
};
