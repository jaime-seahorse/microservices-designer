import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, InternalServerErrorException, NotFoundException, Param, Patch, Post, UseFilters } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInResponse } from './signin/signin-response.dto';
import { SignInRequest } from './signin/signin-request.dto';
import { SignInService } from './signin/signin.service';
import { UpdateUserRequestDto } from './update-user/update-user-request.dto';
import { UpdateUserService } from './update-user/update-user-service.service';
import { CreateProjectService } from './organization/projects/create-project/create-project.service';
import { CreateProjectRequest } from './organization/projects/create-project/create-project-request.dto';
import { CreateProjectResponse } from './organization/projects/create-project/create-project-response.dto';
import { GetProjectsResponse } from './organization/projects/get-projects/get-projects-response.dto';
import { GetProjectsService } from './organization/projects/get-projects/get-projects.service';
import { UpdateProjectResponse } from './organization/projects/update-project/update-project-response.dto';
import { UpdateProjectService } from './organization/projects/update-project/update-project.service';
import { UpdateProjectRequest } from './organization/projects/update-project/update-project-request.dto';

@ApiTags("Users")
@ApiBearerAuth()
@Controller('/api/v1/users')
export class UserController {

  constructor(
    private readonly signinUserService: SignInService,
    private readonly updateUserServe: UpdateUserService,
    private readonly createProjectService: CreateProjectService,
    private readonly getProjectsService: GetProjectsService,
    private readonly updateProjectService: UpdateProjectService
  ) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, description: 'User created.', type: SignInResponse })
  @ApiResponse({ status: 409, description: 'The user already exists.' })
  @ApiExtraModels(SignInResponse)
  async signIn(@Body() createUserRequest: SignInRequest): Promise<SignInResponse> {
    try {
      return await this.signinUserService.signIn(createUserRequest);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'User updated.' })
  async updateUser(@Param() id: number, updateUserRequest: UpdateUserRequestDto) {
    return await this.updateUserServe.update(id, updateUserRequest);
  }

  @ApiOperation({ summary: 'Create a project' })
  @ApiResponse({
    status: HttpStatus.CREATED, description: 'Project has been created', type: CreateProjectResponse
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'The project could not be created'
  })
  @Post('projects/:organizationId')
  async createProject(@Body() createProjectRequest: CreateProjectRequest, @Param('organizationId') organizationId: number): Promise<CreateProjectResponse> {
    try {
      return this.createProjectService.createProject(createProjectRequest, organizationId);
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @ApiOperation({ summary: 'Get all projects by organization' })
  @ApiResponse({
    status: HttpStatus.OK, description: 'Projects founded', type: GetProjectsResponse
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Projects could not be founded'
  })
  @Get('projects/:organizationId')
  async getProjects(@Param('organizationId') organizationId: number): Promise<GetProjectsResponse[]> {
    return this.getProjectsService.getProjects(organizationId);
  }

  @ApiOperation({ summary: 'Update a project' })
  @ApiResponse({
    status: HttpStatus.OK, description: 'Project has been updated', type: UpdateProjectResponse
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND, description: 'Project not founded'
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'The project could not be updated'
  })
  @Patch('projects/:id')
  async updateProject(@Param('id') id: number, @Body() updateProjectRequest: UpdateProjectRequest) {
    try {
      return this.updateProjectService.updateProject(id, updateProjectRequest);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      } else if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
    }
  }
}