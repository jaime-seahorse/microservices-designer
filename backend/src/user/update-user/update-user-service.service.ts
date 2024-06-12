import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserResponse } from '../signin/signin-response.dto';
import { UserEntity } from '../user.entity';
import { Repository } from 'typeorm'
import { UpdateUserRequestDto } from './update-user-request.dto';


@Injectable()
export class UpdateUserService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) { }


    async update(id: number, createUserRequest: UpdateUserRequestDto): Promise<{ message: string }> {

        const userUpdated: UserEntity = new UserEntity();
        userUpdated.email = createUserRequest.email;
        userUpdated.name = createUserRequest.name;
        await this.userRepository.update(id, userUpdated);
        return {
            message: 'User updated successfully'
        }
    }
}
