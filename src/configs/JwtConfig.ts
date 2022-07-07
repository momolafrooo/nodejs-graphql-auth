import jwt from "jsonwebtoken";
import { IUser } from "src/models/User";

class JwtConfig {
  public static generateToken(user: IUser) {
    return jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.SECRET_KEY || "",
      { expiresIn: "1h" }
    );
  }
}

export default JwtConfig;
