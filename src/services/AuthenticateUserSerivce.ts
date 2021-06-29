import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UserRepositories';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {

    async execute({ email, password } : IAuthenticateRequest) {
        const userRepositories = await getCustomRepository(UsersRepositories);

        const user = await userRepositories.findOne({ email });

        if(!user) {
            throw new Error('Email/Password incorrect');
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new Error('Email/Password incorrect');
        }

        const token = sign({
            email: user.email
        }, 'ae2774ab7bac678b3faa7381ce51238c', {
            subject: user.id,
            expiresIn: 86400
        });

        return token;
    }

}

export { AuthenticateUserService };