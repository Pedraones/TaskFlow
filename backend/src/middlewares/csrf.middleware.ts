import { RequestHandler } from "express";
import { doubleCsrf } from "csrf-csrf";
import "dotenv/config";

const { generateToken, validateRequest, doubleCsrfProtection } = doubleCsrf({
  getSecret: () => process.env.CSRF_SECRET!,
  cookieName: "csrf-token",
  cookieOptions: {
    sameSite: "lax",
    secure: false,
    httpOnly: false,
    path: "/",
  },
});

export const csrfProtection: RequestHandler = (req, res, next) => {
  const csrfHeader = req.headers["x-csrf-token"];
  if (csrfHeader) {
    req.headers["x-csrf-token"] = decodeURIComponent(csrfHeader as string);
  }

  const ignoredRoutes = ["/api/auth/login", "/api/auth/register", "/api/auth/forgot-password"];

  if (ignoredRoutes.includes(req.path)) {
    return next();
  }

  return doubleCsrfProtection(req, res, next);
};

export { generateToken, validateRequest };
