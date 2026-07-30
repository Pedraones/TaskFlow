import { RequestHandler } from "express";
import { AppError } from "../../middlewares/app.error";
import { forgotPasswordSchema } from "../schema/forgot-password.schema";
import { otpSchema } from "../schema/otp.schema";
import { forgotPasswordService } from "../service/forgot-password.service";
import NodemailerHelper from 'nodemailer-otp';
import bcrypt from "bcrypt-node";

export const forgotPasswordController: RequestHandler = async (req, res, next) => {
  try{
      const data = forgotPasswordSchema.parse(req.body);
      const result = forgotPasswordService(data.email);

      if(!result) return new AppError("email not exists", 404);

      const helper = new NodemailerHelper("exemple@gmail.com", "passemailexample");
      const otp = helper.generateOtp(6);  
      
      const object_otp = otpSchema.parse({
         otp: bcrypt.hashSync(otp),
         time_expire: 300000,
         moment_generate: Date.now()
      });
   
      //just while email for otp don't been configured!

      return res.status(200).json({
         error: null,
         data: object_otp
      });
  }
  catch(error){
      Hext(error);
  }
}
