import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { SignInService } from './signin/signin.service';
import { UpdateUserService } from './update-user/update-user-service.service';
import { CreateOrganizationService } from './organization/create-organization/create-organization.service';
import { Organization } from './organization/organization.entity';
import { CreateProjectService } from './organization/projects/create-project/create-project.service';
import { Project } from './organization/projects/project.entity';
import { GetProjectsService } from './organization/projects/get-projects/get-projects.service';
import { UpdateProjectService } from './organization/projects/update-project/update-project.service';
import { ProjectsModule } from './organization/projects/projects.module';


@Module({
  controllers: [UserController],
  providers: [SignInService, UpdateUserService, CreateOrganizationService, CreateProjectService, GetProjectsService, UpdateProjectService],
  imports: [TypeOrmModule.forFeature([User, Organization, Project])]
})
export class UsersModule { }
