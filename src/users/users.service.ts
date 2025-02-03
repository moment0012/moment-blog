import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) { }

    async findOne(username: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { username } })
    }

    async create(user: User): Promise<User> {
        const existingUser = await this.usersRepository.findOne({
            where: { username: user.username }
        });
        if (existingUser) {
            throw new Error('User already exists');
        }
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
        return this.usersRepository.save(user);
    }
}
