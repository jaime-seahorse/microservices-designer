import { Body, Injectable, InternalServerErrorException } from '@nestjs/common';
import { GetProjectsResponse } from './get-projects-response.dto';
import { Repository } from 'typeorm';
import { Project } from '../project.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GetProjectsService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>
    ) { }

    async getProjects(organizationId: number): Promise<GetProjectsResponse[]> {
        try {
            const projectsByOrganization: Project[]
                = await this.projectRepository.find({ where: { organizationId: organizationId } });

            if (projectsByOrganization.length === 0) {
                return [];
            }
            console.log(projectsByOrganization);
            return this.prepareGetProjectsResponse(projectsByOrganization);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }


    private prepareGetProjectsResponse(projectsByOrganization: Project[]): GetProjectsResponse[] {
        return projectsByOrganization.map((project: Project) => ({
            projectId: project.id,
            projectName: project.name
        }));
    }
}
