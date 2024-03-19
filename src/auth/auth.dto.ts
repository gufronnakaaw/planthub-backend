import { z } from 'zod';

export const loginSchema = z
  .object({
    email: z.string().email().min(1).trim().optional(),
    password: z.string().min(1).optional(),
    provider: z.enum(['credential', 'google']),
    token: z.string().min(1).trim().optional(),
  })
  .strict();

export type LoginDto = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    fullname: z.string().min(1).trim(),
    email: z.string().email().min(1).trim(),
    provider: z.enum(['credential', 'google']),
    password: z.string().min(1),
  })
  .strict();

export type RegisterDto = z.infer<typeof registerSchema>;
