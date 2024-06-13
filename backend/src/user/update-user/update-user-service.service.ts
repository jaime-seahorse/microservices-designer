import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInResponse } from '../signin/signin-response.dto';
import { User } from '../user.entity';
import { Repository } from 'typeorm'
import { UpdateUserRequestDto } from './update-user-request.dto';


@Injectable()
export class UpdateUserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }


    async update(id: number, createUserRequest: UpdateUserRequestDto): Promise<{ message: string }> {

        const userUpdated: User = new User();
        userUpdated.email = createUserRequest.email;
        userUpdated.name = createUserRequest.name;
        await this.userRepository.update(id, userUpdated);
        return {
            message: 'User updated successfully'
        }
    }
}
