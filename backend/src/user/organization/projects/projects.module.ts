import { Module } from '@nestjs/common';

import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { CreateProjectService } from './create-project/create-project.service';


@Module({
    controllers: [ProjectsController],
    providers: [
        CreateProjectService
    ],
    imports: [
        TypeOrmModule.forFeature([
            Project,
        ]),
    ],
})
export class ProjectsModule { }
