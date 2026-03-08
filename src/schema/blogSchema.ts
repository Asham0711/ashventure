import * as z from "zod";

export const BudgetEnum = z.enum(["Low", "Medium", "High"]);

export const TravelTypeEnum = z.enum([
  "Family",
  "Friends",
  "Couple",
  "Honeymoon",
]);

export const MonthEnum = z.enum([
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
]);

export const blogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),

  placeName: z.string().min(2, "Place name is required"),

  description: z
    .string()
    .min(50, "Description must be at least 50 characters"),

  rating: z
    .number()
    .min(1, "Please select a rating")
    .max(5),

  tripDuration: z.number().min(1, "Trip duration is required"),

  budgetRange: BudgetEnum,

  travelMonth: MonthEnum,

  travelType: TravelTypeEnum,

  images: z
    .any()
    .refine((files) => files && files.length > 0, {
      message: "At least 1 image is required",
    })
    .refine((files) => files && files.length <= 6, {
      message: "You can upload maximum 6 images",
    }),
});

export type BlogFormValues = z.infer<typeof blogSchema>;