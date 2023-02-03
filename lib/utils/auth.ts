import { default as bcrypt } from "bcryptjs";
import { default as jwt } from "jsonwebtoken";

interface IToken {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

export function encryptPassword(password: string) {
  const saltRounds = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, saltRounds);
}

export function decryptPassword(inputPassword: string, userPassword: string) {
  return bcrypt.compareSync(inputPassword, userPassword);
}

export function generateToken(id: string, email: string) {
  const token = jwt.sign({ id, email }, process.env.SECRET as string, {
    expiresIn: "3d",
  });
  return token;
}

function verifyDecodedToken(data: unknown): asserts data is IToken {
  if (!(data instanceof Object))
    throw new Error("Decoded token error. Token must be an object");
  if (!("userId" in data))
    throw new Error('Decoded token error. Missing required field "userId"');
}

export function verifyToken(token: string) {
  const decodedToken = jwt.verify(
    token,
    process.env.SECRET as string
  ) as IToken;
  return decodedToken;
}
