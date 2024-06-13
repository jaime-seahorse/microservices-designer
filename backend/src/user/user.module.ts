import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { SignInService } from './signin/signin.service';
import { UpdateUserService } from './update-user/update-user-service.service';
import { CreateOrganizationService } from './organization/create-organization/create-organization.service';
import { Organization } from './organization/organization.entity';


@Module({
  controllers: [UserController],
  providers: [SignInService, UpdateUserService, CreateOrganizationService],
  imports: [TypeOrmModule.forFeature([User, Organization])]
})
export class UsersModule { }
