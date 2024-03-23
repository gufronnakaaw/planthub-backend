import { z } from 'zod';

export const loginAdminSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
});

export type LoginAdminDto = z.infer<typeof loginAdminSchema>;

export const registerAdminSchema = z.object({
  name: z.string().min(1).trim(),
  email: z.string().email().min(1),
  password: z.string().min(1),
});

export type RegisterAdminDto = z.infer<typeof registerAdminSchema>;
