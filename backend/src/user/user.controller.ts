import { Controller, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserResponse } from './signin/signin-response.dto';
import { CreateUserRequest } from './signin/signin-request.dto';
import { CreateUserService } from './signin/signin.service';
import { UpdateUserRequestDto } from './update-user/update-user-request.dto';
import { UpdateUserService } from './update-user/update-user-service.service';


@ApiTags("Users")
@ApiBearerAuth()
@Controller('/api/v1/users')
export class UserController {

  constructor(
    private readonly createUserService: CreateUserService,
    private readonly updateUserServe: UpdateUserService
  ) {

  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, description: 'User created.', type: CreateUserResponse })
  @ApiResponse({ status: 409, description: 'The user already exists.' })
  @ApiExtraModels(CreateUserResponse)
  async create(createUserRequest: CreateUserRequest): Promise<CreateUserResponse> {
    let pepe: CreateUserResponse = await this.createUserService.create(createUserRequest);
    return pepe;
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'User updated.' })
  async update(@Param() id: number, updateUserRequest: UpdateUserRequestDto) {
    return await this.updateUserServe.update(id, updateUserRequest);
  }
}