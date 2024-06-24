import { Injectable } from '@nestjs/common';
import { LogInRequest } from './login.request';
import { LogInResponse } from './login.response';

@Injectable()
export class LoginService {



    async logIn(signInRequest: LogInRequest): Promise<LogInResponse> {

        return new LogInResponse();
    
        // try {
          
          
        //   const user: User = this.setUserEntity(signInRequest, organizationCreated.id);
    
        //   if (await this.userRepository.findOneBy({ email: signInRequest.email })) {
        //     console.log('Email already exists')
        //     throw new Error('This email already exists')
        //   }
          
        //   const UserCreated: User = await this.userRepository.save(user);
    
        //   return this.setUserResponse(UserCreated, organizationCreated.name);
        // } catch (error) {
        //   throw new InternalServerErrorException(error);
        // }
      }
}
