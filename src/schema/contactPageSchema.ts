import { z } from 'zod'

export const contactFormSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters.'),
    email: z.email('Enter a valid email address.'),
    phone: z
        .string()
        .regex(/^\d{10}$/, 'Phone number must be 10 digits.')
        .optional(),
    message: z.string().min(10, 'Message must be at least 10 characters.'),
});