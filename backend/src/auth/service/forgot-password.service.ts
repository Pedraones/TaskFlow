import { getUserByEmail } from "../../helpers/functions.helper";

export const forgotPasswordService = async (email: string) => {
  email = email.toLowerCase();
  const user = await getUserByEmail(email);

  if (!user) {
    return null;
  }
  
  return user;
};
