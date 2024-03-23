import { z } from 'zod';

export const createCategoriesSchema = z.object({
  name: z.string().min(1).trim(),
});

export type CreateCategoriesDto = z.infer<typeof createCategoriesSchema>;

export const deleteCategoriesSchema = z.string().min(1);

export type DeleteCategoriesDto = z.infer<typeof deleteCategoriesSchema>;
