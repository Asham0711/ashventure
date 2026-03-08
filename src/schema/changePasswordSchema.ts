import { z } from "zod";

export const changePasswordSchema = z
    .object({
        currentPassword: z.string().min(1, "Current password required"),

        newPassword: z
            .string()
            .min(8, "Minimum 8 characters")
            .regex(/[A-Z]/, "Must contain uppercase letter")
            .regex(/[a-z]/, "Must contain lowercase letter")
            .regex(/[0-9]/, "Must contain number")
            .regex(/[^A-Za-z0-9]/, "Must contain special character"),

        confirmNewPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        path: ["confirmNewPassword"],
        message: "Passwords do not match",
    });
