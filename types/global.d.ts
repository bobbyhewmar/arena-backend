import { PrismaClient } from '@prisma/client';

declare global {
  // Adicionando o tipo para a propriedade global `prismaGlobal`
  var prismaGlobal: PrismaClient | undefined;
}

export {};