import { getCustomRepository } from "typeorm";
import { TagsRepository } from "../repositories/TagsRepository";

interface IRequest {
  name: string;
}

export class CreateTagService {
  async execute({ name }: IRequest) {
    const tagsRepository = getCustomRepository(TagsRepository);

    const tagAlreadyExists = await tagsRepository.findOne({ name });

    if (tagAlreadyExists) {
      throw new Error("Tag already exists!");
    }

    const tag = tagsRepository.create({ name });

    await tagsRepository.save(tag);

    return tag;
  }
}
