import { Request, Response } from "express";
import { CreateComplimentService } from "../services/CreateComplimentService";

export class CreateComplimentController {
  async handle(request: Request, response: Response) {
    const user_sender = request.user_id;
    const { user_receiver, tag_id, message } = request.body;

    const createComplimentService = new CreateComplimentService();

    const compliment = await createComplimentService.execute({
      user_sender,
      user_receiver,
      tag_id,
      message,
    });

    return response.status(201).json(compliment);
  }
}
