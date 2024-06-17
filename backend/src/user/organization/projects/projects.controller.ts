import { Controller, Get, Post, Body, Param, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProjectService } from './create-project/create-project.service';
import { CreateProjectRequest } from './create-project/create-project-request.dto';
import { CreateProjectResponse } from './create-project/create-project-response.dto';



@ApiTags('Projects')
@ApiBearerAuth()
@Controller('api/v1/projects')
export class ProjectsController {
  constructor(
    private readonly createProjectService: CreateProjectService,
  ) { }

  @ApiOperation({ summary: 'Create a project' })
  @ApiResponse({
    status: HttpStatus.CREATED, description: 'Project has been created', type: CreateProjectResponse
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'The project could not be created'
  })
  @Post('/:organizationId')
  async create(@Body() createProjectRequest: CreateProjectRequest, @Param('organizationId') organizationId: number): Promise<CreateProjectResponse> {
    return this.createProjectService.create(createProjectRequest, organizationId);
  }

}
