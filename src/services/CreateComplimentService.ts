import { getCustomRepository } from 'typeorm';
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories';
import { UsersRepositories } from '../repositories/UserRepositories';

interface IComplimentRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService {

    async execute({ tag_id, user_sender, user_receiver, message } : IComplimentRequest) {
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
        const usersRepositories = getCustomRepository(UsersRepositories);

        const userReceiverExists = await usersRepositories.findOne(user_receiver);

        if(user_sender === user_receiver) {
            throw new Error('Incorrect user receiver');
        }

        if(!userReceiverExists) {
            throw new Error('User receiver not found!');
        }
    
        const compliment = complimentsRepositories.create({
            tag_id,
            user_sender,
            user_receiver,
            message
        });
        
        return compliment;
    }
}

export { CreateComplimentService };