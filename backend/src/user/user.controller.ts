import { Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserResponse } from './create-user/create-user-response.dto';
import { CreateUserRequest } from './create-user/create-user-request.dto';
import { CreateUserService } from './create-user/create-user.service';


@ApiTags("Users")
@ApiBearerAuth()
@Controller('/api/v1/users')
export class UserController {

  constructor(private readonly createUserService: CreateUserService
  ) {
    
  }

  @Post()
  @ApiResponse({ status: 201, description: 'User created.', type: CreateUserResponse})
  @ApiResponse({ status: 409, description: 'The user already exists.'})
  @ApiExtraModels(CreateUserResponse)
  async create(createUserRequest: CreateUserRequest): Promise<CreateUserResponse> {
    let pepe: CreateUserResponse  = await this.createUserService.create(createUserRequest);
       return pepe;
    }
}