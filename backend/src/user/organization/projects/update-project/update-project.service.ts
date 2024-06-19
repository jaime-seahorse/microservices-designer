import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UpdateProjectResponse } from './update-project-response.dto';
import { UpdateProjectRequest } from './update-project-request.dto';
import { Project } from '../project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateProjectService {
    constructor(

        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>
    ) { }

    async updateProject(id: number, updateProjectRequest: UpdateProjectRequest): Promise<UpdateProjectResponse> {
        try {
            const projectFounded: Project = await this.projectRepository.findOneBy({ id: id });
            console.log(projectFounded)
            if (!projectFounded) {
                throw new NotFoundException(`Project with id ${id} not found.`)
            }
            if (projectFounded.name === updateProjectRequest.name) {
                throw new BadRequestException('All data are the same');
            }
            console.log('here')
            await this.projectRepository.update({ id: id }, { name: updateProjectRequest.name });
            const projectUpdatedFounded: Project = await this.projectRepository.findOneBy({ id: id });
            return this.prepareUpdateProjectResponse(projectUpdatedFounded);

        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    private prepareUpdateProjectResponse(project: Project) {
        const updateProjectResponse: UpdateProjectResponse = new UpdateProjectResponse();
        updateProjectResponse.id = project.id;
        updateProjectResponse.name = project.name;
        return updateProjectResponse
    }
}
