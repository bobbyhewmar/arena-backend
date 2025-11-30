import { Request, Response } from 'express';
import { registerAccount } from '../services/accountService';
import { z } from 'zod';

// Definindo regex para username e password
const accountRegex = /^[A-Za-z0-9]{4,14}$/;
const passwordRegex = /^[A-Za-z0-9]{4,16}$/;

// Esquema de validação usando Zod
const createAccountSchema = z.object({
    username: z.string().min(4, "Username must be between 4 and 14 characters long").max(14),
    email: z.string().email("Invalid email address"),
    password: z.string().min(4, "Password must be between 4 and 16 characters long").max(16),
});

export const createAccount = async (req: Request, res: Response) => {
    // Validação do schema
    const result = createAccountSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ errors: result.error.errors });
    }

    const { username, email, password } = result.data;

    // Validação adicional de username e password
    if (!accountRegex.test(username)) {
        return res.status(400).json({ message: 'Username must be between 4 and 14 characters long, containing only letters and numbers.' });
    }

    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: 'Password must be between 4 and 16 characters long, containing only letters and numbers.' });
    }

    try {
        // Tentativa de registrar a conta
        const newAccount = await registerAccount(username, email, password);
        return res.json({ success: true, account: newAccount });
    } catch (error) {

        if (error instanceof Error) {
            console.error('Error during account creation:', error.message);
            return res.send({ message: error.message })
        } else {
            // Para erros desconhecidos
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};
