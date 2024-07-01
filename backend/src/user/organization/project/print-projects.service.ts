import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrintProjectsResponse } from './print-projects-response.dto';

import { Project, ProjectDocument } from './project.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class PrintProjectsService {
    constructor(
        @InjectModel(Project.name)
        private readonly projectModel: Model<ProjectDocument>
    ) { }

    async printProjects(organizationId: mongoose.Types.ObjectId): Promise<PrintProjectsResponse[]> {
        try {
            const projectsByOrganization: ProjectDocument[]
                = await this.projectModel.find({ where: { organizationId: organizationId } });

            if (projectsByOrganization.length === 0) {
                return [];
            }
            
            console.log(projectsByOrganization);
            return this.setGetProjectsResponse(projectsByOrganization);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
    private setGetProjectsResponse(projectsByOrganization: ProjectDocument[]): PrintProjectsResponse[] {
        return projectsByOrganization.map((project: ProjectDocument) => ({
            projectId: project._id,
            projectName: project.name
        }));
    }
}
