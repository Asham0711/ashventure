import {z} from 'zod';

export const profileSchema = z.object({
    firstName: z.string().min(2, "First name required"),
    lastName: z.string().min(2, "Last name required"),
    gender: z.enum(["Male", "Female", "Other"]).optional(),
    phone: z.string().transform(v => v?.trim() || undefined).optional()
})