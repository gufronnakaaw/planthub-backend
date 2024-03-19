import { z } from 'zod';

export const deleteBannerSchema = z.string().min(1);

export type DeleteBannerDto = z.infer<typeof deleteBannerSchema>;
