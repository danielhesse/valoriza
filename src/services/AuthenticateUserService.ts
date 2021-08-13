import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

interface IRequest {
  email: string;
  password: string;
}

export class AuthenticateUserService {
  async execute({ email, password }: IRequest) {
    const usersRepository = getCustomRepository(UsersRepository);

    const userExists = await usersRepository.findOne({ email });

    if (!userExists) {
      throw new Error("Email/password is incorrect!");
    }

    const passwordMatched = await compare(password, userExists.password);

    if (!passwordMatched) {
      throw new Error("Email/password is incorrect!");
    }

    const token = sign({ email: userExists.email }, "7c481ef735bf588a75710ead1d5248ee", {
      subject: userExists.id,
      expiresIn: "1d",
    });

    return token;
  }
}
