import { Controller, Body, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ApiBearerAuth, ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserResponse } from '../dto/create-user-response.dto';
import { CreateUserRequest } from '../dto/create-user-request.dto';

@ApiTags("Users")
@ApiBearerAuth()
@Controller('/api/v1/users')
export class UsersController {

  constructor(private readonly usersService: UsersService
  ) { }

  

  @Post()
  @ApiResponse({ status: 201, description: 'User created.', type: CreateUserResponse})
  @ApiResponse({ status: 409, description: 'The user already exists.'})
  @ApiExtraModels(CreateUserResponse)
  create(@Body() createUserRequest: CreateUserRequest) {
    return this.usersService.create(createUserRequest);
  }

  
  
  
  // @ApiOperation({ summary: 'Get user' })
  // @ApiResponse({
  //   status: 201, description: 'The user has been created', type: GetUserResponseDto
  // })
  // @ApiResponse({
  //   status: 400, description: 'Invalid format of datas'
  // })
  // @ApiResponse({
  //   status: 409, description: 'The user already exist'
  // })
  // @ApiResponse({
  //   status: 500, description: 'The user could not be created'
  // })
  // @Get('/:userId')
  // async findOneUserById (@Param('userId') userId: string): Promise<GetUserResponseDto> {
  //   return this.usersService.findOneUserById(userId);
  // }

  
  // @ApiOperation({ summary: 'Update User Profile' })
  // @ApiResponse({
  //   status: 200, description: 'The user has been updated succesfully', 
  // })
  // @ApiResponse({
  //   status: 400, description: 'Invalid format of datas'
  // })
  // @Patch()
  // async updateUserProfile(@Body() updateRequestDto: UpdateUserRequestDto, @Req() request) {
  //   return this.usersService.updateUserProfile(request['payload'], updateRequestDto)
  // }

  // @RoleUser(UserRoles.Admin)
  // @Patch(':id')
  // async updateUserById(@Param('id') iduser, @Body() updateRequestDto: UpdateUserRequestDto) {

  // }

  // @RoleUser(UserRoles.Admin)
  // @Delete(':id')
  // async removeUserById(@Param('id') idUser: number) {
  //   return this.usersService.removeUserById(idUser)
  // }

  // @Get()
  // @ApiOperation({ summary: 'Sign In' })
  // @ApiResponse({
  //   status: 201, description: 'The user has been created', // type: SignUpResponseDto
  // })
  // @ApiResponse({
  //   status: 400, description: 'Invalid format of datas'
  // })
  // @ApiResponse({
  //   status: 409, description: 'The user already exist'
  // })
  // @ApiResponse({
  //   status: 500, description: 'The user could not be created'
  // })
  // async getUsers(): Promise<string> {
  //   return this.usersService.getUsers();
  // }
}
