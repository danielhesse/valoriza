import { getCustomRepository } from "typeorm";
import { ComplimentsRepository } from "../repositories/ComplimentsRepository";
import { UsersRepository } from "../repositories/UsersRepository";

interface IRequest {
  user_sender: string;
  user_receiver: string;
  tag_id: string;
  message: string;
}

export class CreateComplimentService {
  async execute({ user_sender, user_receiver, tag_id, message }: IRequest) {
    const complimentsRepository = getCustomRepository(ComplimentsRepository);
    const usersRepository = getCustomRepository(UsersRepository);

    if (user_sender === user_receiver) {
      throw new Error("Incorrect user receiver!");
    }

    const userReceiverExists = await usersRepository.findOne(user_receiver);

    if (!userReceiverExists) {
      throw new Error("User Receiver does not exists!");
    }

    const compliment = complimentsRepository.create({
      user_sender,
      user_receiver,
      tag_id,
      message,
    });

    await complimentsRepository.save(compliment);

    return compliment;
  }
}
