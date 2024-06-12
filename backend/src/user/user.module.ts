import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { SignInService } from './signin/signin.service';
import { UpdateUserService } from './update-user/update-user-service.service';


@Module({
  controllers: [UserController],
  providers: [SignInService, UpdateUserService],
  imports: [TypeOrmModule.forFeature([UserEntity])]
})
export class UsersModule { }
