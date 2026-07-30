import z from "zod";

export const otpSchema = z.object({
   code-otp: z.number(),
   time-expiration: z.number()
});
