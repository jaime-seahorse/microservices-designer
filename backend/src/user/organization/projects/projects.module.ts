import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { CreateProjectService } from './create-project/create-project.service';
import { PrintProjectsService } from './print-projects/print-projects.service';
import { UpdateProjectService } from './update-project/update-project.service';


@Module({
    providers: [
        CreateProjectService,
        PrintProjectsService,
        UpdateProjectService
    ],
    imports: [
        TypeOrmModule.forFeature([
            Project,
        ]),
    ],
})
export class ProjectsModule { }
