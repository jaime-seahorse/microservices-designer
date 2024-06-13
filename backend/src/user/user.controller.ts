import { Body, Controller, HttpCode, HttpStatus, InternalServerErrorException, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInResponse } from './signin/signin-response.dto';
import { SignInRequest } from './signin/signin-request.dto';
import { SignInService } from './signin/signin.service';
import { UpdateUserRequestDto } from './update-user/update-user-request.dto';
import { UpdateUserService } from './update-user/update-user-service.service';


@ApiTags("Users")
@ApiBearerAuth()
@Controller('/api/v1/users')
export class UserController {

  constructor(
    private readonly signinUserService: SignInService,
    private readonly updateUserServe: UpdateUserService
  ) {

  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, description: 'User created.', type: SignInResponse })
  @ApiResponse({ status: 409, description: 'The user already exists.' })
  @ApiExtraModels(SignInResponse)
  async create(@Body() createUserRequest: SignInRequest): Promise<SignInResponse> {
    try {
      return await this.signinUserService.signIn(createUserRequest);;
    } catch (error) {
      // Do a own exception
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }

    }
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'User updated.' })
  async update(@Param() id: number, updateUserRequest: UpdateUserRequestDto) {
    return await this.updateUserServe.update(id, updateUserRequest);
  }
}