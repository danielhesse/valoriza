import { getCustomRepository } from "typeorm";
import { ComplimentsRepository } from "../repositories/ComplimentsRepository";

interface IRequest {
  user_id: string;
}

export class ListUserReceiveComplimentsService {
  async execute({ user_id }: IRequest) {
    const complimentsRepository = getCustomRepository(ComplimentsRepository);

    const compliments = await complimentsRepository.find({
      where: {
        user_receiver: user_id,
      },
      relations: ["userSender", "tag"],
    });

    return compliments;
  }
}
