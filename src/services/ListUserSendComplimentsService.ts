import { getCustomRepository } from "typeorm";
import { ComplimentsRepository } from "../repositories/ComplimentsRepository";

interface IRequest {
  user_id: string;
}

export class ListUserSendComplimentsService {
  async execute({ user_id }: IRequest) {
    const complimentsRepository = getCustomRepository(ComplimentsRepository);

    const compliments = await complimentsRepository.find({
      where: {
        user_sender: user_id,
      },
      relations: ["userReceiver", "tag"],
    });

    return compliments;
  }
}
