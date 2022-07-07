import User, { IUser } from "../models/User";
import bcrypt from "bcryptjs";
import JwtConfig from "../configs/JwtConfig";
import { isValidEmail } from "../utils";

class AuthService {
  /**
   * Login user
   */
  public static async login(username: string, password: string) {
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error("User not found");
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error("Password is incorrect");
    }

    const accessToken = JwtConfig.generateToken(user as unknown as IUser);

    return {
      accessToken,
      username: user.username,
    };
  }

  /**
   * Register user
   */
  public static async register(data: RegisterRequest) {
    const { username, password, passwordConfirm, email } = data;

    if (password !== passwordConfirm) {
      throw new Error("Password and passwordConfirm must be same");
    }

    // check if email is valid
    if (!isValidEmail(email)) {
      throw new Error("Email is invalid");
    }

    // check if username is already taken
    const user = await User.findOne({ username });
    if (user) {
      throw new Error("Username is already taken");
    }

    // check if email is already taken
    const emailUser = await User.findOne({ email });
    if (emailUser) {
      throw new Error("Email is already taken");
    }

    const newUser = await User.create({
      username,
      password: await bcrypt.hash(password, 10),
      email,
    });

    return {
      username,
      email,
      createdAt: newUser?.createdAt?.toISOString(),
    };
  }
}

export default AuthService;

interface RegisterRequest {
  username: string;
  password: string;
  passwordConfirm: string;
  email: string;
}
