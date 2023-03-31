import { default as bcrypt } from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

export interface IToken {
  id: string;
  email: string;
  iat: number;
  exp: number;
}
type Payload = { email: string; id: string };

export function encryptPassword(password: string) {
  const saltRounds = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, saltRounds);
}

export function decryptPassword(inputPassword: string, userPassword: string) {
  return bcrypt.compareSync(inputPassword, userPassword);
}

export class AuthError extends Error {}

/**
 * Verifies the user's JWT token and returns its payload if it's valid.
 */
export async function verifyAuth(token: string) {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.SECRET)
    );
    return verified.payload as unknown as IToken;
  } catch (err) {
    throw new AuthError("Your token has expired.");
  }
}

export async function generateToken(payload: Payload): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime("1d")
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.SECRET));
}
