import { Body, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrintProjectsResponse } from './print-projects-response.dto';
import { Repository } from 'typeorm';
import { Project } from '../project.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PrintProjectsService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>
    ) { }

    async printProjects(organizationId: number): Promise<PrintProjectsResponse[]> {
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


    private prepareGetProjectsResponse(projectsByOrganization: Project[]): PrintProjectsResponse[] {
        return projectsByOrganization.map((project: Project) => ({
            projectId: project.id,
            projectName: project.name
        }));
    }
}
