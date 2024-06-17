import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProjectResponse } from './create-project-response.dto';
import { CreateProjectRequest } from './create-project-request.dto';
import { Project } from '../project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'

@Injectable()
export class CreateProjectService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>
    ) { }

    async create(createProjectRequestDto: CreateProjectRequest, organizationId: number): Promise<CreateProjectResponse> {
        try {
            const projectEntityCreated = this.createProjectEntity(createProjectRequestDto);
            console.log(projectEntityCreated);
            const projectCreated = await this.projectRepository.save({ projectEntityCreated, organizationId: organizationId });
            if (!projectCreated) {
                throw new Error('Project not been created');
            }
            return this.prepareCreateProjectResponse(projectCreated);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
        return
    }
    
    private createProjectEntity(createProjectRequestDto: CreateProjectRequest) {
        const createProject: Project = new Project();
        createProject.name = createProjectRequestDto.name;
        return createProject;
        
    }

    private prepareCreateProjectResponse(projectCreated: Project) {
        const createProjectResponse: CreateProjectResponse = new CreateProjectResponse();
        createProjectResponse.projectId = projectCreated.id;
        createProjectResponse.name  = projectCreated.name;
        return createProjectResponse;

    }
}
