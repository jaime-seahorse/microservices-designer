import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { CreateUserRequest } from '../dto/create-user-request.dto';
import { CreateUserResponse } from '../dto/create-user-response.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) { }


  async create(createUserRequest: CreateUserRequest): Promise<CreateUserResponse> {

    const createUserEntity: UserEntity = new UserEntity();
    
    createUserEntity.email = createUserRequest.email;
    createUserEntity.username = createUserRequest.name;
    createUserEntity.password = createUserRequest.password;

    const userEntityCreated: UserEntity = await this.userRepository.save(createUserEntity);

    const createUserResponse: CreateUserResponse = new CreateUserResponse();

    createUserResponse.email = userEntityCreated.email;
    createUserResponse.name = userEntityCreated.username;
    createUserResponse.password = userEntityCreated.password;
    createUserResponse.id = userEntityCreated.id;

    return createUserResponse;

  }

  
}
