import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { BoundedContextsService } from '../services/bounded-context.service';
import { CreateBoundedContextRequestDto } from '../dto/create-bounded-context-request.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBoundedContextResponseDto } from '../dto/create-bounded-context-response.dto';
import { GetBoundedContextByUserIdResponse } from '../dto/get-bounded-context-by-user-id-response.dto';

@ApiBearerAuth()
@ApiTags('Bounded Contexts')
@Controller('/api/v1/bounded-contexts')
export class BoundedContextsController {
  constructor(private readonly boundedContextsService: BoundedContextsService) { }


  @ApiOperation({ summary: 'Create a bounded context' })
  @ApiResponse({
    status: HttpStatus.CREATED, description: 'The bounded context has been created', type: CreateBoundedContextResponseDto
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'The bounded context could not be created'
  })
  @Post()
  async create(@Body() createProjectDto: CreateBoundedContextRequestDto): Promise<CreateBoundedContextResponseDto> {
    return new CreateBoundedContextResponseDto();
  }


  @ApiOperation({ summary: 'Get list of bounded context by projectId' })
  @ApiResponse({
    status: HttpStatus.OK, description: 'Bounded contexts by project id have been finded', type: [GetBoundedContextByUserIdResponse]
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND, description: 'Bounded contexts were not found'
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'The bounded contexts by project id could not be found'
  })
  @Get('/:projectId/')
  async getBoundedContextsByProjectId(@Param('projectId') projectId: number): Promise<GetBoundedContextByUserIdResponse[]> {
    
    const getBoundedContextByUserIdResponse: GetBoundedContextByUserIdResponse[] = await this.boundedContextsService.getBoundedContextsByProjectId(projectId)
    
    return getBoundedContextByUserIdResponse;
  }


    // @Post(':projectid')
  // async createBoundedContext(@Param('projectid') projectId: number, @Body() createBoundedContextDto: CreateBoundedContextRequestDto): Promise<GenericResponseBoundedContextDto> {
  //   return this.boundedContextsService.createBoundedContext(createBoundedContextDto, projectId);
  // }


  // @Get(':id')
  // async findBoundedContextById(@Param('id', ParseIntPipe) id: number): Promise<GenericResponseBoundedContextDto> {
  //   return this.boundedContextsService.findBoundedContextById(id);
  // }

  



  // @Patch(':id')
  // async updateBoundedContext(@Param('id', ParseIntPipe) id: number, @Body() updateBoundedContextDto: UpdateBoundedContextDto): Promise<GenericResponseBoundedContextDto> {
  //   return this.boundedContextsService.updateBoundedContext(id, updateBoundedContextDto);
  // }

  // @Delete(':id')
  // async deleteBoundedContext(@Param('id', ParseIntPipe) id: number): Promise<DeleteResponseBoundedContextDto> {
  //   return this.boundedContextsService.deleteBoundedContext(id);
  // }
}
