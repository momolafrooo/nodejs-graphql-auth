import AuthService from "../../services/AuthService";

export default {
  login: (_: any, args: any) => {
    const { username, password } = args;
    return AuthService.login(username, password);
  },
  register: async (_: any, args: any) => {
    const { username, password, passwordConfirm, email } = args.input;
    return AuthService.register({ username, password, passwordConfirm, email });
  },
};
