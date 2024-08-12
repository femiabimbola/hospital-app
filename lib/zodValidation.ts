import { z } from "zod";

export const PatientFormSchema = z.object({
  name: z
    .string({ message: " Name can not be a digit" })
    .min(3, { message: "name must be 3 characters or more" })
    .max(50, "name must be at most 50 characters" ),
  email: z.string().email('Enter a vaild Email Address'),
  phone: z.string().refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});  