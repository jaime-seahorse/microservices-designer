import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { SignInRequest } from './signin-request.dto';
import { SignInResponse } from './signin-response.dto';

@Injectable()
export class SignInService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) { }


  async signIn(createUserRequest: SignInRequest): Promise<SignInResponse> {

    const createUserEntity: UserEntity = new UserEntity();
    
    createUserEntity.email = createUserRequest.email;
    createUserEntity.name = createUserRequest.name;
    createUserEntity.password = createUserRequest.password;

    const userEntityCreated: UserEntity = await this.userRepository.save(createUserEntity);

    const createUserResponse: SignInResponse = new SignInResponse();

    createUserResponse.email = userEntityCreated.email;
    createUserResponse.name = userEntityCreated.name;
    createUserResponse.password = userEntityCreated.password;
    createUserResponse.id = userEntityCreated.id;

    return createUserResponse;

  }

  
}
