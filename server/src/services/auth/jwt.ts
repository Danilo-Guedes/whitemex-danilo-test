import jwt from "jsonwebtoken";
import { User } from "../../types/user.js";

export async function createUserApiJWT(user: User) {
  const { id, name, email } = user;

  const payload = {
    id,
    name,
    email,
  };

  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET || "AnRandomSaltText",
    {
      expiresIn: "7d",
    }
  );

  return token;
}

export async function decodeJWT(token : string) {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "AnRandomSaltText"
    );
    return decoded;
  } catch (error) {
    if ((error as any)?.name && (error as any).name === "TokenExpiredError") {
      // Handle token expiration error
      console.log("Token has expired");
    } else {
      // Handle other JWT verification errors
      console.log("Invalid token");
    }
    return null;
  }
}
