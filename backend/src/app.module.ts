import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UsersModule } from './user/user.module';
import { Organization } from './user/organization/organization.entity';
import { ProjectsModule } from './user/organization/projects/projects.module';
import { Project } from './user/organization/projects/project.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "1234",
      database: "seahorse",
      entities: [User, Organization,Project],
      synchronize: true
    }),
    TypeOrmModule.forFeature([User, Organization, Project]),
    UsersModule,
    ProjectsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
