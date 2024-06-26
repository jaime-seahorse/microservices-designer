import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProjectResponse } from './create-project-response.dto';
import { CreateProjectRequest } from './create-project-request.dto';
import { Project, ProjectDocument } from './project.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';


@Injectable()
export class CreateProjectService {
    constructor(
        @InjectModel(Project.name)
        private projectModel: Model<ProjectDocument>,
    ) { }

    async createProject(createProjectRequestDto: CreateProjectRequest, organizationId: mongoose.Types.ObjectId): Promise<CreateProjectResponse> {
        try {
            const projectDocument: ProjectDocument = this.setProjectDocument(createProjectRequestDto, organizationId);
            console.log(projectDocument);
            const projectCreated = await projectDocument.save();
            if (!projectCreated) {
                throw new Error('Project not been created');
            }
            return this.prepareCreateProjectResponse(projectCreated);
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException(error.message);
        }

    }

    private setProjectDocument(createProjectRequestDto: CreateProjectRequest, organizationId: mongoose.Types.ObjectId): ProjectDocument {
        const project: Project = new Project();
        project.name = createProjectRequestDto.name;
        project.organizationId = organizationId;
        return new this.projectModel(project);
    }

    private prepareCreateProjectResponse(projectCreated: ProjectDocument): CreateProjectResponse {
        const createProjectResponse: CreateProjectResponse = new CreateProjectResponse();
        createProjectResponse.projectId = projectCreated._id;
        createProjectResponse.name = projectCreated.name;
        return createProjectResponse;

    }
}
