import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UsersModule } from './user/user.module';
import { Organization } from './user/organization/organization.entity';
import { Project } from './user/organization/projects/project.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://root:seahorse@mongo:27017/'),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
