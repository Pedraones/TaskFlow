import z from "zod";

export const otpSchema = z.object({
   code_otp: z.number(),
   moment_generate: z.iso.datetime(),
   time_expiration: z.number()
});
