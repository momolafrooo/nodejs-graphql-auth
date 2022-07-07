import { gql } from "apollo-server";

export default gql`
  type LoginResponse {
    accessToken: String
    username: String
  }

  input RegisterInput {
    username: String
    password: String
    passwordConfirm: String
    email: String
  }

  type RegisterResponse {
    username: String
    email: String
    createdAt: String
  }

  type Mutation {
    login(username: String, password: String): LoginResponse
    register(input: RegisterInput): RegisterResponse
  }

  type Query {
    hello: String
  }
`;
