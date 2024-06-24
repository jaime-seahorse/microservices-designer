import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { SignInService } from './signin.service';
import { Organization } from './organization/organization.entity';
import { Project } from './organization/projects/project.entity';
import { LoginService } from './login.service';
import { CreateProjectService } from './organization/projects/create-project.service';
import { PrintProjectsService } from './organization/projects/print-projects.service';


@Module({
  controllers: [UserController],
  providers: [SignInService, CreateProjectService, PrintProjectsService, LoginService],
  imports: [TypeOrmModule.forFeature([User, Organization, Project])]
})
export class UsersModule { }
