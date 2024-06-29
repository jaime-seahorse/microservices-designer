import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.entity';
import { SignInService } from './user-signin-use-case/signin.service';
// import { LoginService } from './user-login-use-case/login.service';
import { PrintProjectsService } from './organization/project/print-projects.service';
import { CreateProjectService } from './organization/project/create-project.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Organization, OrganizationSchema } from './organization/organization.entity';
import { Project, ProjectSchema } from './organization/project/project.schema';

@Module({
  controllers: [UserController],
  providers: [SignInService, CreateProjectService, PrintProjectsService,],
  imports: [MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    { name: Organization.name, schema: OrganizationSchema },
    { name: Project.name, schema: ProjectSchema },

  ])]
})
export class UsersModule { }
