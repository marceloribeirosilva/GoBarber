import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

class AuthenticateUserService {
  public async execute({
    email,
    password,
  }: Request): Promise<{ user: User; token: string }> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw Error('Incorrect email or password');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw Error('Incorrect email or password');
    }

    const token = sign({}, 'bb96a4ab86f0f4c2cfd487afc0ea6e0e', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
