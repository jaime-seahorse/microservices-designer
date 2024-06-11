import { Controller, Get, Post, Body, Param, HttpStatus } from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { CreateProjectRequestDto } from '../dto/create-project-request.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ProjectsFindedByIdResponseDto } from '../dto/projects-id-finded-response.dto';
import { BoundedContextsService } from 'src/bounded-contexts/services/bounded-context.service';
import { CreateProjectResponseDto } from '../dto/create-project-response.dto';


@ApiTags('Projects')
@ApiBearerAuth()
@Controller('api/v1/projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private boundedContextsService: BoundedContextsService
  ) { }


  @ApiOperation({ summary: 'Create a project' })
  @ApiResponse({
    status: HttpStatus.CREATED, description: 'Project has been created', type: CreateProjectResponseDto
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'The project could not be created'
  })
  @Post()
  async create(@Body() createProjectDto: CreateProjectRequestDto): Promise<CreateProjectResponseDto> {
    return new CreateProjectResponseDto();
  }


  @ApiOperation({ summary: 'Get list of projects by userId' })
  @ApiResponse({
    status: HttpStatus.OK, description: 'The projects by userId have been found', type: [ProjectsFindedByIdResponseDto]
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND, description: 'The projects were not found'
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'The projects by userId could not be found'
  })
  @Get('/:userId/')
  async findAllProjectsByUserId(@Param('userId') userId: number): Promise<ProjectsFindedByIdResponseDto[]> {
     const projectsFindedByIdResponseDto : ProjectsFindedByIdResponseDto[] = await this.projectsService.findallProjectsByUserId(userId)

     return projectsFindedByIdResponseDto;
  }


  // @ApiResponse({
  //   status: HttpStatus.FOUND, description: 'All projects has been finded', type: ProjectsFindedResponseDto
  // })
  // @ApiResponse({
  //   status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'The projects could not be found'
  // })
  // @RoleUser(UserRoles.Admin)
  // @Get()
  // async findAllProjects(): Promise<ProjectsFindedResponseDto | {}> {
  //   return await this.projectsService.findAllProjects();
  // }

  // @ApiResponse({
  //   status: HttpStatus.OK, description: 'Projects has been finded', type: ProjectsFindedByIdResponseDto
  // })
  // @ApiResponse({
  //   status: HttpStatus.NOT_FOUND, description: 'Projects by id not been finded'
  // })
  // @ApiResponse({
  //   status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Projects by id could not be found'
  // })
  // @Get(':idProject')
  // async findOneProjectById(@Param('idProject') idProject: number) {
  //   return await this.projectsService.findOneProjectById(idProject,);
  // }

  // @ApiResponse({
  //   status: HttpStatus.OK, description: 'Project has been updated', type: UpdateProjectResponseDto
  // })
  // @ApiResponse({
  //   status: HttpStatus.NOT_FOUND, description: 'Project not found'
  // })
  // @ApiResponse({
  //   status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Project could not be updated'
  // })
  // @Patch(':idProject')
  // async updateOneProjectById(@Param('idProject') idProject: number, @Body() updateProjectDto: UpdateProjectRequestDto,) {
  //   return await this.projectsService.updateOneProjectById(idProject, updateProjectDto);
  // }

  // @ApiResponse({
  //   status: HttpStatus.OK, description: 'Project has been removed', type: UpdateProjectResponseDto
  // })
  // @ApiResponse({
  //   status: HttpStatus.NOT_FOUND, description: 'Project not found'
  // })
  // @ApiResponse({
  //   status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Project could not be removed'
  // })
  // @Delete(':idProject')
  // async removeOneProjectById(@Param('idProject') id: number, @Req() request) {
  //   return await this.projectsService.removeOneProjectById(id);
  // }

}
