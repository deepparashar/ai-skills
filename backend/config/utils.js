import jwt from "jsonwebtoken";
import 'dotenv/config'
export const genToken = (userId) => {
//   console.log("token", process.env.SECRET_KEY)
  const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY)
  return token;
}