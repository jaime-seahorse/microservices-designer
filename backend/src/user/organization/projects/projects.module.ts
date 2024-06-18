import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { CreateProjectService } from './create-project/create-project.service';
import { GetProjectsService } from './get-projects/get-projects.service';


@Module({
   
    providers: [
        CreateProjectService,
        GetProjectsService
    ],
    imports: [
        TypeOrmModule.forFeature([
            Project,
        ]),
    ],
})
export class ProjectsModule { }
