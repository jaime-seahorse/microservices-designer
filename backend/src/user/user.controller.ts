import { Body, Controller, Get, HttpCode, HttpStatus, InternalServerErrorException, Param, Patch, Post} from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LogInResponse } from './login.response';
import { LoginService } from './login.service';
import { CreateProjectRequest } from './organization/projects/create-project-request.dto';
import { CreateProjectResponse } from './organization/projects/create-project-response.dto';
import { CreateProjectService } from './organization/projects/create-project.service';
import { PrintProjectsResponse } from './organization/projects/print-projects-response.dto';
import { PrintProjectsService } from './organization/projects/print-projects.service';
import { SignInRequest } from './signin-request.dto';
import { SignInResponse } from './signin-response.dto';
import { SignInService } from './signin.service';


@ApiTags("Users")
@ApiBearerAuth()
@Controller('/api/v1/users')
export class UserController {

  constructor(
    private readonly signInService: SignInService,
    private readonly logInService: LoginService,
    private readonly createProjectService: CreateProjectService,
    private readonly printProjectsService: PrintProjectsService
  ) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, description: 'User created.', type: SignInResponse })
  @ApiResponse({ status: 409, description: 'The user already exists.' })
  @ApiExtraModels(SignInResponse)
  async signIn(@Body() signInRequest: SignInRequest): Promise<SignInResponse> {
    try {
      return await this.signInService.signIn(signInRequest);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)
        throw new InternalServerErrorException(error.message);
      }
    }
  }


  @Patch()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 200, description: 'User logged.', type: SignInResponse })
  @ApiResponse({ status: 404, description: 'The user is not exist.' })
  @ApiExtraModels(SignInResponse)
  async logiIn(@Body() signInRequest: SignInRequest): Promise<LogInResponse> {
    try {
      return await this.logInService.logIn(signInRequest);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  
  @ApiOperation({ summary: 'Create a project' })
  @ApiResponse({
    status: HttpStatus.CREATED, description: 'The project has been created', type: CreateProjectResponse
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'The project could not be created'
  })
  @Post('organizations/:organizationId/projects')
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
    status: HttpStatus.OK, description: 'Projects founded', type: PrintProjectsResponse
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Projects could not be founded'
  })
  @Get('projects/:organizationId')
  async printProjects(@Param('organizationId') organizationId: number): Promise<PrintProjectsResponse[]> {
    return this.printProjectsService.printProjects(organizationId);
  }
}




// @ApiOperation({ summary: 'Update a project' })
  // @ApiResponse({
  //   status: HttpStatus.OK, description: 'Project has been updated', type: UpdateProjectResponse
  // })
  // @ApiResponse({
  //   status: HttpStatus.BAD_REQUEST
  // })
  // @ApiResponse({
  //   status: HttpStatus.NOT_FOUND, description: 'Project not founded'
  // })
  // @ApiResponse({
  //   status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'The project could not be updated'
  // })
  // @Patch('projects/:id')
  // async updateProject(@Param('id') id: number, @Body() updateProjectRequest: UpdateProjectRequest) {
  //   try {
  //     return this.updateProjectService.updateProject(id, updateProjectRequest);
  //   } catch (error) {
  //     if (error instanceof BadRequestException) {
  //       throw new BadRequestException(error.message);
  //     } else if (error instanceof NotFoundException) {
  //       throw new NotFoundException(error.message);
  //     }
  //   }
  // }