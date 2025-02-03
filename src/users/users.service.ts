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

    /**
     * 根据用户名查找一个用户
     * @param username 用户名
     * @returns 用户对象
     */
    async findOne(username: string): Promise<User | null> {
        return await this.usersRepository.findOne({ where: { username } });
    }

    /**
     * 创建用户
     * @param user 用户
     * @returns 用户对象
     */
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

    /**
     * 根据githubid查找一个用户
     * @param githubId githubid
     * @returns 用户对象 ｜ null
     */
    async findOneByGithubId(githubId: string): Promise<User | null> {
        const user = await this.usersRepository.findOne({ where: { githubId } });
        return user;
    }
}
