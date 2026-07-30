import z from "zod";

export const otpSchema = z.object({
   code_otp: z.string(),
   moment_generate: z.iso.datetime(),
   moment_expire: z.number()
});
