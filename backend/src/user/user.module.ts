import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { SignInService } from './signin/signin.service';
import { Organization } from './organization/organization.entity';
import { CreateProjectService } from './organization/projects/create-project/create-project.service';
import { Project } from './organization/projects/project.entity';
import { PrintProjectsService } from './organization/projects/print-projects/print-projects.service';
import { LoginService } from './login/login.service';




@Module({
  controllers: [UserController],
  providers: [SignInService, CreateProjectService, PrintProjectsService, LoginService],
  imports: [TypeOrmModule.forFeature([User, Organization, Project])]
})
export class UsersModule { }
