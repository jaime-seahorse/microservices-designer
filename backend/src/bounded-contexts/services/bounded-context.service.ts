import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBoundedContextRequestDto } from '../dto/create-bounded-context-request.dto';

import { BoundedContextEntity } from '../entities/bounded-context.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from '../../projects/entities/project.entity';

import { DeleteResponseBoundedContextDto } from '../dto/delete-response-bounded-context.dto';
import { GetBoundedContextByUserIdResponse } from '../dto/get-bounded-context-by-user-id-response.dto';
import { CreateBoundedContextResponseDto } from '../dto/create-bounded-context-response.dto';


@Injectable()
export class BoundedContextsService {

  constructor(
    @InjectRepository(BoundedContextEntity)
    private boundedContextRepository: Repository<BoundedContextEntity>,
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>
  ) { }

  async findBoundedContextById(id: number): Promise<GetBoundedContextByUserIdResponse> {
    try {
      const boundedContext: BoundedContextEntity = await this.boundedContextRepository.findOne({ where: { id: id }, relations: { project: true } })
      if (!boundedContext) { throw new NotFoundException(`User with id: ${id} was not found`) }
      return new GetBoundedContextByUserIdResponse()
    } catch (exception) {
      throw new BadRequestException(exception)
    }
  }

  async getBoundedContextsByProjectId(projectId: number): Promise<GetBoundedContextByUserIdResponse[]> {
    try {
      console.log(projectId)
      const boundedContexts: BoundedContextEntity[] = await this.boundedContextRepository.find({
        where: { project: { id: projectId } },
        relations: { project: true }
      })

      if (boundedContexts.length === 0) { throw new NotFoundException(`Bounded contexts were not found in project with id: ${projectId}`) }
      //return { message: `Bounded Context found for projectId: ${projectId}`, boundedContext: boundedContexts }
      return [new GetBoundedContextByUserIdResponse()];
    } catch (exception) {
      throw new InternalServerErrorException(exception)
    }
  }

  async createBoundedContext(createBoundedContextDto: CreateBoundedContextRequestDto, projectId: number): Promise<CreateBoundedContextResponseDto> {
    try {
      const project: ProjectEntity = await this.projectRepository.findOne({ where: { id: projectId } })
      const savedBoundedContext: BoundedContextEntity = await this.boundedContextRepository.save(
        { ...createBoundedContextDto, project: project }
      )
      if (!savedBoundedContext) {
        throw new InternalServerErrorException('The Bounded Context could not be saved')
      }
      const returnedBoundedContext: BoundedContextEntity = await this.boundedContextRepository.findOne({
        where: { id: savedBoundedContext.id },
        relations: { project: true }
      })
      return new CreateBoundedContextResponseDto();
    } catch (exception) {
      throw new InternalServerErrorException(exception)
    }
  }

  // async updateBoundedContext(boundedContextId: number, updateBoundedContextDto: UpdateBoundedContextDto): Promise<GenericResponseBoundedContextDto> {
  //   try {
  //     const projectId: number = updateBoundedContextDto.projectId;
  //     const project = await this.projectRepository.findOneBy({ id: projectId })
  //     const existentBoundedContext = await this.boundedContextRepository.findOneBy({ id: boundedContextId });
  //     if (!project) { throw new NotFoundException(`Project with id: ${projectId} was not found`) }
  //     if (!existentBoundedContext) { throw new NotFoundException(`Bounded Context with id: ${boundedContextId} was not found`) }

  //     //This updates the BoundedContext
  //     await this.boundedContextRepository.update({ id: boundedContextId }, { name: updateBoundedContextDto.name, project: project })
  //     const modifiedBoundedContext: BoundedContextEntity = await this.boundedContextRepository.findOne({
  //       where: { id: boundedContextId }, relations: { project: true }
  //     })
  //     return new GenericResponseBoundedContextDto();
  //   } catch (exception) {
  //     throw new InternalServerErrorException(exception)
  //   }
  // }

  async deleteBoundedContext(id: number): Promise<DeleteResponseBoundedContextDto> {
    try {
      const foundBoundedContext: BoundedContextEntity = await this.boundedContextRepository.findOne({ where: { id: id }, relations: { project: true } })
      if (!foundBoundedContext) throw new NotFoundException(`Bounded context with ${id} not found`)

      await this.boundedContextRepository.delete({ id: id })
      return { message: `Bounded context with id: ${id} deleted correctly` }
    } catch (exception) {
      throw new InternalServerErrorException(exception)
    }
  }
}
