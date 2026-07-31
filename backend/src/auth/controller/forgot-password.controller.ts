import { RequestHandler } from "express";
import { AppError } from "../../middlewares/app.error";
import { forgotPasswordSchema } from "../schema/forgot-password.schema";
import { otpSchema } from "../schema/otp.schema";
import { forgotPasswordService } from "../service/forgot-password.service";
import NodemailerHelper from 'nodemailer-otp';
import bcrypt from "bcrypt";

export const forgotPasswordController: RequestHandler = async (req, res, next) => {
  try{
      const data = forgotPasswordSchema.parse(req.body);
      const result = await forgotPasswordService(data.email);

      if(!result) return new AppError("email not exists", 404);

      const helper = new NodemailerHelper("exemple@gmail.com", "passemailexample");
      const otp = helper.generateOtp(6);  
      const hashOtp = await bcrypt.hash(otp, 10);

      const object_otp = otpSchema.parse({
         code_otp: hashOtp,
         moment_generate: new Date().toISOString(),
         moment_expire: 300000
      });
   
      //just while email for otp don't been configured!

      return res.status(200).json({
         error: null,
         data: object_otp
      });
  }
  catch(error){
      return console.log(error);
  }
}
