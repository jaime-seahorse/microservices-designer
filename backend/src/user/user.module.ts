import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { CreateUserService } from './create-user/create-user.service';


@Module({
  controllers: [UserController],
  providers: [CreateUserService],
  imports: [TypeOrmModule.forFeature([UserEntity])]
})
export class UsersModule { }
